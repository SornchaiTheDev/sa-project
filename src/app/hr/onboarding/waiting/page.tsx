"use client";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";
import Link from "next/link";

function WaitingListPage() {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex flex-col justify-center items-center gap-4 container mx-auto"
      >
        <h5 className="text-xl font-medium">รอดำเนินการอนุมัติ</h5>
        <Loader size="3rem" className="animate-spin" />
        <p className="text-center">
          กรุณาเข้าสู่ระบบเพื่อตรวจสอบ <br /> สถานะการเข้่าใช้งานอีกครั้ง
        </p>
        <Link
          href="/hr/auth/sign-in"
          className="w-3/4 bg-primary rounded-lg flex justify-center items-center py-1 text-white mt-4"
        >
          กลับสู่หน้าเข้าสู่ระบบ
        </Link>
      </motion.div>
    </div>
  );
}

export default WaitingListPage;
