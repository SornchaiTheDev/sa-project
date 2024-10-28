"use client";
import { useAtom } from "jotai";
import React from "react";
import { categoryAtom, type FilterCategory } from "../store/stats-store";
import { cn } from "~/lib";

interface Category {
  name: string;
  value: FilterCategory;
}

function CategoryFilter() {
  const [selectedCategory, setCategory] = useAtom(categoryAtom);
  const categories: Category[] = [
    {
      name: "ภาพรวม",
      value: "overall",
    },
    {
      name: "งานประจำ",
      value: "full-time",
    },
    {
      name: "งานพิเศษ",
      value: "part-time",
    },
  ];

  return (
    <div className="p-1 rounded-lg border border-primary w-fit flex gap-2">
      {categories.map(({ name, value }) => (
        <button
          key={value}
          onClick={() => setCategory(value)}
          className={cn(
            "px-3 py-1 rounded-lg text-zinc-400 transition-colors",
            selectedCategory === value &&
              "bg-primary/50 text-black border border-primary font-semibold",
          )}
        >
          {name}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
