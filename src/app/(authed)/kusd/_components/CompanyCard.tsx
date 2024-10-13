import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { Button } from "~/components/ui/button";
import { JobLogo } from "~/configs/assets";
import { mapCategory } from "~/lib/mapCategory";
import { ApprovedCompany } from "~/types/approvedCompany";

function CompanyCard({ id, name, taxId, category }: ApprovedCompany) {
  const queryClient = useQueryClient();

  const approve = useMutation({
    mutationFn: async () => {
      return await axios.post(`/api/kusd/approve/company/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["companies"],
      });
    },
  });

  const reject = useMutation({
    mutationFn: async () => {
      return await axios.post(`/api/kusd/reject/company/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["companies"],
      });
    },
  });

  return (
    <div className="rounded-lg border-2 border-primary bg-zinc-200/40 p-2 relative">
      <div className="flex gap-2">
        <Image
          src={JobLogo}
          width={120}
          height={100}
          alt="Company Placeholder"
        />
        <div className="flex flex-1 flex-col">
          <div className="flex flex-1 justify-between">
            <div>
              <h5 className="text-lg font-medium">{name}</h5>
              {/* <h6 className="text-sm">ประเภทหน่วยงาน : {type}</h6> */}
              <h6 className="text-sm">เลขประจำตัวผู้เสียภาษี : {taxId}</h6>
              <h6 className="text-sm">
                หมวดหมู่หน่วยงาน : {mapCategory(category)}
              </h6>
            </div>
          </div>
        </div>
      </div>
      <div className="self-end space-x-2 absolute right-2 bottom-2">
        <Button onClick={() => approve.mutate()} className="w-24" size="sm">
          ยอมรับ
        </Button>
        <Button
          onClick={() => reject.mutate()}
          variant="outline"
          size="sm"
          className="w-24 border-primary bg-zinc-100"
        >
          ปฏิเสธ
        </Button>
      </div>
    </div>
  );
}

export default CompanyCard;
