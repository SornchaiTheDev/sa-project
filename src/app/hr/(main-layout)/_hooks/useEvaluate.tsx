import { useCallback, useEffect, useState } from "react";

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

  const handleOnSubmit = () => {
    setIsSubmitted(true);

    const errs = validateFields();
    if (errs.length !== 0) return;

    setIsSubmitting(true);
    setTimeout(() => setIsSubmitting(false), 2000);
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
