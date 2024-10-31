import Image from "next/image";
import EvaluateList from "./_components/EvaluateList";

function EvaluatePage() {
  return (
    <>
      <div className="flex flex-col mb-10 relative">
        {/* <h4 className="text-gray-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"> */}
        {/*   เลือกนิสิตเพื่อประเมิน */}
        {/* </h4> */}
        <div className="flex justify-between">
          <div className="">
            <h5 className="text-2xl font-medium">ประเมินการทำงาน</h5>
            <h6 className="text-sm mt-4">ชื่อ</h6>
            <h4 className="text-2xl font-medium">นางสาวภาดา แสงตะวัน</h4>
            <h6 className="text-sm">ตำแหน่ง</h6>
            <h4 className="text-2xl font-medium">Content Creator</h4>
          </div>
          <div className="w-32 aspect-[3/4] rounded-lg overflow-hidden relative">
            <Image
              src="http://localhost:9000/ku-job/nisit/profile/1730369718787_final.jpg"
              alt="Sam Altman picture"
              fill
              className="object-center object-cover"
            />
          </div>
        </div>
      </div>
      <EvaluateList />
    </>
  );
}

export default EvaluatePage;
