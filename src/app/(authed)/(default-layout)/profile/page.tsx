"use client";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import EditUserInfo from "./_components/EditUserInfo";

function ProfilePage() {
  return (
    <div className="mt-24 flex flex-col items-center">
      <div className="w-[600px] my-4">
        <EditUserInfo />
        <div className="flex justify-between items-center mt-10">
          <h5 className="text-xl font-medium">
            ข้อมูลประวัติการศึกษา และทำงาน
          </h5>
          <button className="underline text-primary">ยกเลิก</button>
        </div>
        <div className="space-y-4 mt-4">
          <div className="">
            <h6>คณะ</h6>
            {/* <h6 className="font-medium">สังคมศาสตร์</h6> */}

            <Input
              value="สังคมศาสตร์"
              className="bg-gray-50 my-2 h-12 shadow-none"
            />
          </div>
          <div className="">
            <h6>สาขา</h6>
            {/* <h6 className="font-medium">ภูมิศาสตร์</h6> */}

            <Input
              value="ภูมิศาสตร์"
              className="bg-gray-50 my-2 h-12 shadow-none"
            />
          </div>
          <div className="">
            <h6>เกรดเฉลี่ย</h6>
            {/* <h6 className="font-medium">3.79</h6> */}
            <Input value="3.79" className="bg-gray-50 my-2 h-12 shadow-none" />
          </div>
          <div className="">
            <h6>ประวัติการทำงาน</h6>
            {/* <h6 className="font-medium"> */}
            {/*   อดีตประธานบริษัท Lego Thailand กว่า 250 ปี */}
            {/* </h6> */}
            <Input
              value="อดีตประธานบริษัท Lego Thailand กว่า 250 ปี"
              className="bg-gray-50 my-2 h-12 shadow-none"
            />
          </div>
          <Button className="w-full">บันทึก</Button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
