import Image from "next/image";
import { ReactNode } from "react";
import { KUView } from "~/configs/assets";

function HalfImageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <div className="flex-1 flex flex-col justify-center items-center h-full px-8 md:px-20">
        {children}
      </div>
      <div className="flex-1 relative">
        <div className="bg-black/20 backdrop-blur-sm absolute inset-0 z-10"></div>
        <Image src={KUView} fill className="object-cover" alt="" />
      </div>
    </div>
  );
}

export default HalfImageLayout;
