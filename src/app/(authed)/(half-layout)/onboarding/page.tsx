"use client";
import UserInfoForm from "./_components/user-info-form";

function OnBoardingPage() {
  return (
    <div className="mt-20">
      <h4 className="text-xl font-semibold">ลงทะเบียน</h4>
      <div className="mt-4 w-full">
        <h6 className="text-lg">ข้อมูลส่วนตัว</h6>
        <UserInfoForm />
      </div>
    </div>
  );
}

export default OnBoardingPage;
