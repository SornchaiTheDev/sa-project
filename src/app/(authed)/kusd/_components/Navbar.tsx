"use client";
import { LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { KULogo } from "~/configs/assets";

function Navbar() {
  const router = useRouter();

  return (
    <div className="fixed left-0 right-0 top-0 z-30 bg-white p-4 flex justify-between items-center border-b border-zinc-200">
      <Link href="/">
        <Image src={KULogo} alt="KU Logo" width={48} height={48} />
      </Link>
      <button
        onClick={() => router.push("/api/logout")}
        className="text-red-500"
      >
        <LogOut />
      </button>
    </div>
  );
}

export default Navbar;
