import { useState } from "react";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { months } from "~/constants/months";
import dayjs from "~/lib/dayjs";

interface Props {
  className?: string;
  fromYear?: Date;
  toYear?: Date;
  value: Date;
  onChange: (date: Date | undefined) => void;
}

export default function DatePicker({
  className,
  fromYear,
  toYear,
  value,
  onChange,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const hasDropdown = fromYear && toYear;
  const diffYears = hasDropdown
    ? toYear.getFullYear() - fromYear.getFullYear() + 1
    : 0;

  const toBudishYear = (y: number) => y + 543;

  const handleMonthChange = (month: string) => {
    onChange(
      dayjs(value)
        .month(Number(months.indexOf(month)))
        .toDate(),
    );
  };

  const handleYearChange = (year: string) => {
    onChange(
      dayjs(value)
        .year(Number(year) - 543)
        .toDate(),
    );
  };

  const handleOnSelect = (day: Date | undefined) => {
    onChange(day);
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal flex",
            !value && "text-muted-foreground",
            className,
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? (
            dayjs(value).format("DD MMMM BBBB")
          ) : (
            <span>เลือกวันที่</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4">
        <div className="flex gap-2">
          <Select
            onValueChange={handleMonthChange}
            value={value !== undefined ? months[value.getMonth()] : "มกราคม"}
          >
            <SelectTrigger className="">
              <SelectValue placeholder="เดือน" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {months.map((month) => (
                  <SelectItem key={month} value={month}>
                    {month}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {hasDropdown && (
            <Select
              value={
                value !== undefined
                  ? toBudishYear(value.getFullYear()).toString()
                  : toBudishYear(toYear.getFullYear()).toString()
              }
              onValueChange={handleYearChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="ปี" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {Array.from({ length: diffYears }, (_, i) => (
                    <SelectItem
                      key={i}
                      value={toBudishYear(
                        fromYear.getFullYear() + i,
                      ).toString()}
                    >
                      {toBudishYear(fromYear.getFullYear() + i)}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        </div>
        <Calendar
          className="p-0 py-2"
          mode="single"
          fromYear={!!fromYear ? fromYear.getFullYear() : undefined}
          toYear={!!toYear ? toYear.getFullYear() : undefined}
          onSelect={(day) => handleOnSelect(day)}
          month={value}
          onMonthChange={(day) => onChange(day)}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
