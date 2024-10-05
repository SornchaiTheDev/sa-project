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
      <CompanyInfoForm />
    </>
  );
}

export default CreateCompany;
