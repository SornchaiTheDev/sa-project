"use client";
import { ChevronsDown } from "lucide-react";
import Image from "next/image";
import { Button } from "~/components/ui/button";
import { JobLogo } from "~/configs/assets";
import { Checkbox } from "~/components/ui/checkbox";
import { useState } from "react";
import { cn } from "~/lib";
import { AnimatePresence, motion } from "framer-motion";
import { mapCategory } from "~/lib/mapCategory";
import { ApprovedCompany } from "~/types/approvedCompany";
import { getUnverifiedMembersFn } from "../queryFns/getUnverifiedMembersFn";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { acceptMembersFn } from "../mutationFns/acceptMembersFn";
import { rejectMembersFn } from "../mutationFns/rejectMembersFn";

type SelectedMember = Record<string, boolean>;

function MemberCard({ name, taxId, category, id }: ApprovedCompany) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState<SelectedMember>({});

  const selectedMembersArray = Object.keys(selectedMembers).filter(
    (member) => selectedMembers[member],
  );

  const { data } = useQuery({
    queryKey: ["members", id],
    queryFn: () => getUnverifiedMembersFn(id),
  });

  const queryClient = useQueryClient();
  const accept = useMutation({
    mutationFn: () => acceptMembersFn(selectedMembersArray),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["members"],
      });
    },
  });

  const reject = useMutation({
    mutationFn: () => rejectMembersFn(selectedMembersArray),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["members"],
      });
    },
  });

  const handleOnCheck = (username: string) => {
    setSelectedMembers((prev) => ({
      ...prev,
      [username]: prev[username] === undefined ? true : !prev[username],
    }));
  };

  return (
    <motion.div
      animate={{ height: isExpanded ? "100%" : 97.45 }}
      className="rounded-lg border-2 border-primary bg-zinc-200/40 p-2 relative"
    >
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
              <h5 className="text-lg font-medium">{name}</h5>
              <h6 className="text-sm">เลขประจำตัวผู้เสียภาษี : {taxId}</h6>
              <h6 className="text-sm">
                หมวดหมู่หน่วยงาน : {mapCategory(category)}
              </h6>
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
            <div className="mt-2 flex gap-2 items-baseline">
              <h4>รายชื่อสมาชิกรอดำเนินการอนุมัติ</h4>
            </div>
            <div className="pl-4 space-y-1">
              {data?.members.map(({ username, name, email, phone }) => (
                <div key={email} className="space-x-2 flex items-center">
                  <Checkbox
                    checked={selectedMembers[username]}
                    onCheckedChange={() => handleOnCheck(username)}
                  />
                  <label className="text-sm font-light">
                    {name} ตำแหน่ง HR เบอร์ติดต่อ {phone} อีเมล {email}
                  </label>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="self-end space-x-2 absolute right-2 bottom-2">
        <Button className="w-24" size="sm" onClick={() => accept.mutate()}>
          ยอมรับ
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="w-24 border-primary bg-zinc-100"
          onClick={() => reject.mutate()}
        >
          ปฏิเสธ
        </Button>
      </div>
    </motion.div>
  );
}

export default MemberCard;
