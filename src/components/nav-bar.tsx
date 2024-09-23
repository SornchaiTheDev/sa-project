import Image from "next/image";
import Link from "next/link";
import { KULogo } from "~/configs/assets";

function Navbar() {
  return (
    <div className="fixed left-0 right-0 top-0 z-30 bg-white p-4 flex justify-between items-center border-b border-zinc-200">
      <Link href="/">
        <Image src={KULogo} alt="KU Logo" width={48} height={48} />
      </Link>
      <div className="w-10 h-10 rounded-full border-2"></div>
    </div>
  );
}

export default Navbar;
