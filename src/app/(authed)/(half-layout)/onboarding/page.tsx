"use client";
import { motion } from "framer-motion";
import UserInfoForm from "./_components/user-info-form";

function OnBoardingPage() {
  return (
    <div className="mt-20">
      <motion.h4
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-xl font-semibold"
      >
        ลงทะเบียน
      </motion.h4>
      <div className="mt-4 w-full">
        <motion.h6
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-lg"
        >
          ข้อมูลส่วนตัว
        </motion.h6>
        <UserInfoForm />
      </div>
    </div>
  );
}

export default OnBoardingPage;
