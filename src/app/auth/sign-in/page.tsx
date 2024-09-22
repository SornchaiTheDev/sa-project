import Image from "next/image";
import KULogo from "~/assets/ku-logo.png";
import KUView from "~/assets/ku-view.jpeg";

function NisitSignInPage() {
  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <div className="flex-1 flex flex-col justify-center items-center gap-4 px-4 lg:px-0">
        <h2 className="text-lg font-medium text-center">เข้าสู่ระบบ</h2>
        <button className="flex justify-center items-center rounded-lg text-sm w-full max-w-[400px] py-1 gap-4 border hover:bg-zinc-100">
          <Image src={KULogo} width={36} height={36} alt="KU Logo" />
          เข้าสู่ระบบด้วย KU-All Login
        </button>
      </div>
      <div className="flex-1 relative">
        <div className="bg-black/20 backdrop-blur-sm absolute inset-0 z-10"></div>
        <Image src={KUView} fill className="object-cover" alt="" />
      </div>
    </div>
  );
}

export default NisitSignInPage;
