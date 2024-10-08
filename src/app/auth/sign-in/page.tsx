import Image from "next/image";
import { KULogo } from "~/configs/assets";

function NisitSignInPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-lg font-medium text-center">เข้าสู่ระบบ</h2>
      <a
        href="/api/auth/kusso/sign-in"
        className="flex justify-center items-center rounded-lg text-sm w-full max-w-[400px] py-1 gap-4 border hover:bg-zinc-100 mt-4"
      >
        <Image src={KULogo} width={36} height={36} alt="KU Logo" />
        เข้าสู่ระบบด้วย KU-All Login
      </a>
    </div>
  );
}

export default NisitSignInPage;
