"use client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { getStudent } from "./queryFn/getStudent";
import { useAllLoginSession } from "~/wrapper/AllLoginSessionWrapper";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import DatePicker from "~/components/ui/date-picker";
import { Pencil } from "lucide-react";

function ProfilePage() {
  const { uid } = useAllLoginSession();
  const { data } = useQuery({
    queryKey: ["student", uid],
    queryFn: () => getStudent(uid),
  });

  console.log(data);
  if (data === undefined) return null;
  return (
    <div className="mt-24 flex flex-col items-center">
      <div className="rounded-full overflow-hidden w-32 h-32 relative">
        {/* <div className="absolute w-32 h-32 bg-black/30 z-50 flex justify-center items-center"> */}
        {/*   <Pencil className="text-white"/> */}
        {/* </div> */}
        <Image
          src={data.profileImage}
          alt="profile image"
          fill
          className="object-cover object-center"
        />
      </div>
      <div className="w-[600px] my-4">
        <div className="flex justify-between items-center">
          <h5 className="text-xl font-medium">ข้อมูลส่วนตัว</h5>
          <button className="underline text-primary">แก้ไข</button>
        </div>
        <div className="space-y-4 mt-4">
          <div className="">
            <h6>ชื่อ</h6>
            {/* <Input */}
            {/*   value="ภาดา แสงตะวัน" */}
            {/*   className="bg-gray-50 my-2 h-12 shadow-none" */}
            {/* /> */}
            <h6 className="font-medium">ภาดา แสงตะวัน</h6>
          </div>
          <div className="">
            <h6>วัน เดือน ปีเกิด</h6>

            {/* <DatePicker */}
            {/*   value={new Date("2024-10-01")} */}
            {/*   onChange={() => {}} */}
            {/*   className="h-12 bg-zinc-100 my-2" */}
            {/* /> */}
            <h6 className="font-medium">01 ตุลาคม 2546</h6>
          </div>
          <div className="">
            <h6>อีเมล</h6>

            {/* <Input */}
            {/*   value="pada.snisit@ku.th" */}
            {/*   className="bg-gray-50 my-2 h-12 shadow-none" */}
            {/* /> */}
            <h6 className="font-medium">pada.snisit@ku.th</h6>
          </div>
          <div className="">
            <h6>เบอร์ติดต่อ</h6>
            {/* <Input */}
            {/*   value="0987654321" */}
            {/*   className="bg-gray-50 my-2 h-12 shadow-none" */}
            {/* /> */}
            <h6 className="font-medium">0987654321</h6>
          </div>
        </div>
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
