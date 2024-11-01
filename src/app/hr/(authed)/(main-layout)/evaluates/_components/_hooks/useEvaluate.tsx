import { useAtom, useAtomValue } from "jotai";
import { useCallback, useEffect, useState } from "react";
import { employeeAtom } from "../../store/employeeStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { evaluateFn } from "../../mutateFns/evaluateFn";
import { toast } from "sonner";

interface EvaluateType {
  name: string;
  value: string;
}

export default function useEvaluate() {
  const [fields, setFields] = useState<EvaluateType[]>([
    {
      name: "ความตรงต่อเวลา",
      value: "",
    },
    {
      name: "ประสิทธิภาพของงาน",
      value: "",
    },
    {
      name: "การทำงานร่วมกัน",
      value: "",
    },
    {
      name: "ความคิดริเริ่มสร้างสรรค์",
      value: "",
    },
    {
      name: "ความสามารถในการแก้ไขปัญหา",
      value: "",
    },
  ]);
  const [errorFields, setErrorFields] = useState<string[]>([]);

  const handleOnChangePoint = (name: string, point: string) => {
    const otherTypes = fields.filter((type) => type.name !== name);
    const indexOfType = fields.findIndex((type) => type.name === name);
    otherTypes.splice(indexOfType, 0, { name, value: point });
    setFields(otherTypes);
  };

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateFields = useCallback(() => {
    const errors = fields
      .map((type) => {
        if (type.value === "") {
          return type.name;
        }
        return null;
      })
      .filter((error) => error !== null);

    return errors;
  }, [fields]);

  useEffect(() => {
    if (isSubmitted) {
      setErrorFields(validateFields());
    }
  }, [isSubmitted, validateFields]);

  const [comment, setComment] = useState("");

  const [{ username, positionID }, setSelectedEmployee] = useAtom(employeeAtom);
  const queryClient = useQueryClient();
  const evaluate = useMutation({
    mutationFn: (payload: Record<string, number>) =>
      evaluateFn(username, positionID, payload),
    mutationKey: ["evaluate"],
    onSuccess: () => {
      toast.success("ประเมินสำเร็จ");
      setSelectedEmployee({
        username: "",
        positionID: "",
        firstName: "",
        positionName: "",
        profileImage: "",
        lastName: "",
      });
      queryClient.invalidateQueries({ queryKey: ["employee-history"] });
    },
    onError: () => {
      toast.error("เกิดข้อผิดพลาด");
    },
  });

  const handleOnSubmit = async () => {
    setIsSubmitted(true);

    const errs = validateFields();
    if (errs.length !== 0) return;

    setIsSubmitting(true);
    const payload = fields.reduce(
      (acc, type) => {
        acc[type.name] = parseInt(type.value);
        return acc;
      },
      {} as Record<string, number>,
    );
    await evaluate.mutateAsync(payload);

    setIsSubmitting(false);
  };

  const onChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  return {
    fields,
    errorFields,
    comment,
    onChangeComment,
    isSubmitting,
    handleOnChangePoint,
    handleOnSubmit,
  };
}
