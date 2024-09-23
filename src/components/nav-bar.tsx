import Image from "next/image";
import { KULogo } from "~/configs/assets";

function Navbar() {
  return (
    <div className="p-4 flex justify-between items-center border-b border-zinc-200">
      <Image src={KULogo} alt="KU Logo" width={48} height={48} />
      <div className="w-10 h-10 rounded-full border-2"></div>
    </div>
  );
}

export default Navbar;
