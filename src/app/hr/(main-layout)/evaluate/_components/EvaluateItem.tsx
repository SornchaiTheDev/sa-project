"use client";
import { RadioGroup, RadioGroupItem } from "~/components/ui/evaluate-radio";
import { cn } from "~/lib";

interface Props {
  name: string;
  value: string;
  onChange: (value: string) => void;
  isError: boolean;
}
function EvaluateItem({ name, value, onChange, isError }: Props) {
  return (
    <>
      <h5 className={cn("text-xl", isError && "text-red-500")}>{name}</h5>
      <RadioGroup
        value={value}
        onValueChange={onChange}
        className="flex items-center gap-8 mt-4"
      >
        {Array(5)
          .fill({})
          .map((_, i) => (
            <RadioGroupItem
              key={i}
              value={String(i + 1)}
              className={cn(
                `w-${6 + i * 2} h-${6 + i * 2}`,
                isError && "border-red-500",
              )}
            />
          ))}
      </RadioGroup>
    </>
  );
}

export default EvaluateItem;
