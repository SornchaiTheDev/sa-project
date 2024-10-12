import { TriangleAlert } from "lucide-react";

export default function SuspensedAlert() {
  return (
    <div className="absolute inset-0 backdrop-blur z-20 rounded-lg flex justify-center items-center">
      <div className="p-8 rounded-lg  border-2 border-amber-400 bg-amber-100 space-y-2 flex flex-col items-center gap-2">
        <TriangleAlert size="3rem" className="text-amber-500" />
        <div>
          <h4 className="text-center text-amber-600">
            คุณถูกระงับการสร้างประกาศงาน
          </h4>
          <p className="text-center text-amber-600">
            โปรดแจ้งผลการคัดเลือกให้ครบถ้วนให้เรียบร้อยก่อน
          </p>
        </div>
      </div>
    </div>
  );
}
