"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Path, useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { cn } from "~/lib/utils";

interface Props<T extends z.ZodObject<z.ZodRawShape, "strip", z.ZodTypeAny>> {
  schema: T;
  labels: Record<Path<z.infer<T>>, string>;
  className?: string;
}

function FormGenerate<
  T extends z.ZodObject<z.ZodRawShape, "strip", z.ZodTypeAny>,
>({ schema, labels, className }: Props<T>) {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const fields = Object.keys(schema.shape) as Array<
    Path<z.infer<typeof schema>>
  >;

  return (
    <div className={cn(className, "flex flex-col")}>
      <Form {...form}>
        {fields.map((name) => (
          <FormField
            key={name}
            control={form.control}
            name={name}
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="font-normal">{labels[name]}</FormLabel>
                <Input className="h-12" {...field} placeholder={labels[name]} />
              </FormItem>
            )}
          />
        ))}
        <Button
          variant="ghost"
          className="flex-col items-end py-6 self-end"
        >
          <h6 className="text-sm font-normal">ถัดไป</h6>
          <h5 className="text-lg">ประวัติการศึกษา</h5>
        </Button>
      </Form>
    </div>
  );
}

export default FormGenerate;
