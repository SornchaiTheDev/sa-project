"use client";
import UserInfoForm from "./_components/user-info-form";

function OnBoardingPage() {
  return (
    <div className="p-4 md:p-10 h-full">
      <h4 className="text-xl font-semibold">ลงทะเบียน</h4>
      <div className="mt-4">
        <h6 className="text-lg">ข้อมูลส่วนตัว</h6>
        <UserInfoForm />
      </div>
    </div>
  );
}

export default OnBoardingPage;
