"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { KULogo } from "~/configs/assets";

function NisitSignInPage() {
  const router = useRouter();
  const handleSignIn = () => {
    router.push("/auth/onboarding");
  };
  return (
    <div className="flex flex-col justify-center items-center gap-4 px-4 lg:px-0 h-full">
      <h2 className="text-lg font-medium text-center">เข้าสู่ระบบ</h2>
      <button
        onClick={handleSignIn}
        className="flex justify-center items-center rounded-lg text-sm w-full max-w-[400px] py-1 gap-4 border hover:bg-zinc-100"
      >
        <Image src={KULogo} width={36} height={36} alt="KU Logo" />
        เข้าสู่ระบบด้วย KU-All Login
      </button>
    </div>
  );
}

export default NisitSignInPage;
