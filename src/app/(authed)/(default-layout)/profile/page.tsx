"use client"

import EditUserInfo from "./_components/EditUserInfo";
import EditEducationAndWork from "./_components/EditEducationAndWork";

function ProfilePage() {
  return (
    <div className="mt-24 flex flex-col items-center">
      <div className="w-[600px] my-4">
        <EditUserInfo />
        <EditEducationAndWork />
      </div>
    </div>
  );
}

export default ProfilePage;
