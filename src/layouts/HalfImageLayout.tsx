import Image from "next/image";
import { ReactNode } from "react";
import { KUView } from "~/configs/assets";

function HalfImageLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="w-1/2 px-8 md:px-20">
        {children}
      </div>
      <div className="fixed top-0 bottom-0 right-0 w-1/2">
        <div className="relative h-full">
          <div className="bg-black/20 backdrop-blur-sm absolute inset-0 z-10"></div>
          <Image src={KUView} fill className="object-cover" alt="" />
        </div>
      </div>
    </>
  );
}

export default HalfImageLayout;
