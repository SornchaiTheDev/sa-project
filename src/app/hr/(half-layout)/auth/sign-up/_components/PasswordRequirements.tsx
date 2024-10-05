import { Check, X } from "lucide-react";
import React from "react";
import { cn } from "~/lib";

interface Props {
  password: string;
}

interface Requirement {
  description: string;
  isValid: (val: string) => boolean;
}

const requirements: Requirement[] = [
  {
    description: "รหัสประกอบไปด้วยตัวอักษรตัวเล็กและตัวใหญ่",
    isValid: (val: string) => /(?=.*[a-z]+)(?=.*[A-Z]+)/.test(val),
  },
  {
    description: "รหัสประกอบไปด้วยตัวเลขและอักขระพิเศษ",
    isValid: (val: string) => /(?=.*[0-9]+)(?=.*[^A-Za-z0-9]+)/.test(val),
  },
];

export default function PasswordRequirements({ password }: Props) {
  return (
    <div className="space-y-1">
      {requirements.map(({ description, isValid }) => (
        <div
          key={description}
          className={cn(
            "flex items-center gap-2",
            isValid(password) ? "text-green-600" : "text-red-600",
          )}
        >
          {isValid(password) ? <Check size="1rem" /> : <X size="1rem" />}
          <p className="text-sm">{description}</p>
        </div>
      ))}
    </div>
  );
}
