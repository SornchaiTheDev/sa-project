"use client";

import { Textarea } from "~/components/ui/textarea";
import EvaluateItem from "./EvaluateItem";
import { Button } from "~/components/ui/button";
import useEvaluate from "../../_hooks/useEvaluate";

function EvaluateList() {
  const {
    fields,
    errorFields,
    comment,
    onChangeComment,
    handleOnSubmit,
    handleOnChangePoint,
    isSubmitting,
  } = useEvaluate();
  return (
    <div className="flex flex-col items-center gap-4">
      {fields.map(({ name, value }) => (
        <EvaluateItem
          isError={errorFields.includes(name)}
          key={name}
          name={name}
          value={value}
          onChange={(val) => handleOnChangePoint(name, val)}
        />
      ))}
      <h5 className="text-xl text-center">ความคิดเห็นเพิ่มเติม</h5>
      <Textarea
        value={comment}
        onChange={onChangeComment}
        className="w-[600px] border-primary"
        rows={6}
        placeholder="ความคิดเห็นเพิ่มเติม"
      />
      <Button
        onClick={handleOnSubmit}
        size="lg"
        className="px-10 mb-4"
        isLoading={isSubmitting}
      >
        ประเมิน
      </Button>
    </div>
  );
}

export default EvaluateList;
