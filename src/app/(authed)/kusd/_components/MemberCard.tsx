"use client";
import { ChevronsDown } from "lucide-react";
import Image from "next/image";
import { Button } from "~/components/ui/button";
import { JobLogo } from "~/configs/assets";
import { Checkbox } from "~/components/ui/checkbox";
import { useState } from "react";
import { cn } from "~/lib";
import { AnimatePresence, motion } from "framer-motion";

function MemberCard() {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <motion.div animate={{height : isExpanded ? 200 : 100}} className="rounded-lg border-2 border-primary bg-zinc-200/40 p-2 relative">
      <div className="flex gap-2">
        <Image
          src={JobLogo}
          width={100}
          height={100}
          alt="Company Placeholder"
        />
        <div className="flex flex-1 flex-col">
          <div className="flex flex-1 justify-between">
            <div>
              <h5 className="text-lg">Company&apos;s name</h5>
              <p className="text-sm">เป็นบริษัทเกี่ยวกับการเทคโนโลยี</p>
            </div>
            <Button
              variant="ghost"
              className="w-8 h-8"
              size="icon"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <ChevronsDown
                size="1rem"
                className={cn("transition-all", isExpanded && "rotate-180")}
              />
            </Button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isExpanded && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h4 className="mt-2">รายชื่อสมาชิกรอดำเนินการอนุมัติ</h4>
            <div className="pl-4 space-y-1">
              {Array(3)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="space-x-2 flex items-center">
                    <Checkbox />
                    <label className="text-sm font-light">
                      นางสาววิมุดากร กิจเตชะพานิช ตำแหน่ง HR เบอร์ติดต่อ
                      xxx-xxx-xxxx
                    </label>
                  </div>
                ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="self-end space-x-2 absolute right-2 bottom-2">
        <Button
          variant="outline"
          size="sm"
          className="w-24 border-primary bg-zinc-100"
        >
          ลบ
        </Button>
        <Button className="w-24" size="sm">
          ยอมรับ
        </Button>
      </div>
    </motion.div>
  );
}

export default MemberCard;
