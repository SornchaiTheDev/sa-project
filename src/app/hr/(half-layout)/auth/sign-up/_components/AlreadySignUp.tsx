"use client";
import { motion } from "framer-motion";
import Link from "next/link";

function AlreadySignUp() {
  return (
    <motion.h6
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="text-sm text-zinc-700 mt-2"
    >
      ฉันมีบัญชีอยู่แล้ว{" "}
      <Link href="/hr/auth/sign-in" className="text-zinc-900 font-medium">
        เข้าสู่ระบบ
      </Link>
    </motion.h6>
  );
}

export default AlreadySignUp;
