import Link from "next/link";
import CompanyInfoForm from "./_components/CompanyInfoForm";
import { ChevronLeft } from "lucide-react";

function CreateCompany() {
  return (
    <>
      <Link
        href="../company"
        className="flex gap-2 items-center hover:text-zinc-500 top-4 left-4 fixed"
      >
        <ChevronLeft size="1rem" />
        <span>กลับ</span>
      </Link>
      <div className="w-full">
        <h4 className="text-2xl font-medium mb-10">ลงทะเบียนบริษัท</h4>
        <h5 className="text-xl font-medium mb-4">เกี่ยวกับบริษัท</h5>

        <h6 className="mt-4">บริษัทของคุณลงทะเบียนในระบบอยู่แล้วหรือไม่</h6>
        <CompanyInfoForm />
      </div>
    </>
  );
}

export default CreateCompany;
