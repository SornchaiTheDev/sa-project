import { Loader } from "lucide-react";
import Link from "next/link";

function WaitingListPage() {
  return (
    <div className="flex flex-col justify-center items-center gap-4 h-screen container mx-auto">
      <h5 className="text-xl font-medium">รอดำเนินการอนุมัติ</h5>
      <Loader size="3rem" className="animate-spin" />
      <p className="text-center">
        ระบบจะแจ้งเตือนไปยัง <br /> อีเมลล์ของคุณเมื่อคุณได้รับอนุมัติ
      </p>
      <Link
        href="/hr/auth/sign-in"
        className="w-3/4 bg-primary rounded-lg flex justify-center items-center py-1 text-white mt-4"
      >
        กลับสู่หน้าแรก
      </Link>
    </div>
  );
}

export default WaitingListPage;
