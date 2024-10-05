import React from "react";
import HRInfoForm from "./_components/HRInfoForm";

function UserInfoPage() {
  return (
    <>
      <h4 className="text-2xl font-medium mb-10">ลงทะเบียนผู้ใช้</h4>
      <div>
        <p className="text-sm text-zinc-400">ขั้นตอนที่ 1 / 2</p>
        <h5 className="text-xl font-medium mb-4">ข้อมูลผู้ใช้</h5>
      </div>
      <HRInfoForm />
    </>
  );
}

export default UserInfoPage;
