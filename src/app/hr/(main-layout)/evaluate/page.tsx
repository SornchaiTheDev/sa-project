import Image from "next/image";
import EvaluateList from "./_components/EvaluateList";

function EvaluatePage() {
  return (
    <>
      <div className="flex justify-between mb-10">
        <div>
          <h5 className="text-2xl font-medium">ประเมินการทำงาน</h5>
          <h6 className="text-sm mt-4">ชื่อ</h6>
          <h4 className="text-2xl font-medium">นางสาววิมุดากร กิจเตชะพานิช</h4>
          <h6 className="text-sm">ตำแหน่ง</h6>
          <h4 className="text-2xl font-medium">Software Developer</h4>
        </div>
        <div className="w-32 aspect-[3/4] rounded-lg overflow-hidden relative">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Sam_Altman_CropEdit_James_Tamim.jpg/1200px-Sam_Altman_CropEdit_James_Tamim.jpg"
            alt="Sam Altman picture"
            fill
            className="object-center object-cover"
          />
        </div>
      </div>
      <EvaluateList />
    </>
  );
}

export default EvaluatePage;
