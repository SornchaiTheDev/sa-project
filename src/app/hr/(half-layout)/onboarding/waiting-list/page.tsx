import { Hourglass } from "lucide-react";
import React from "react";

function WaitingListPage() {
  return (
    <div className="flex flex-col items-center gap-4">
      <h5 className="text-xl font-medium">รอดำเนินการอนุมัติ</h5>
      <Hourglass size="3rem" className="animate-spin" />
      <p className="text-center">
        ระบบจะแจ้งเตือนไปยัง <br /> อีเมลล์ของคุณเมื่อคุณได้รับอนุมัติ
      </p>
    </div>
  );
}

export default WaitingListPage;
