"use client";
import { useQuery } from "@tanstack/react-query";
import { LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { KULogo } from "~/configs/assets";
import { getStudent } from "~/globalQueryFns/getStudent";

function Navbar() {
  const { data, isLoading } = useQuery({
    queryKey: ["student"],
    queryFn: getStudent,
  });

  const router = useRouter();
  const handleOnClickProfile = () => router.push("/profile");

  return (
    <div className="fixed left-0 right-0 top-0 z-30 bg-white p-4 flex justify-between items-center border-b border-zinc-200">
      <Link href="/">
        <Image src={KULogo} alt="KU Logo" width={48} height={48} />
      </Link>
      <div className="flex gap-4">
        {!isLoading && (
          <button
            onClick={handleOnClickProfile}
            className="w-10 h-10 rounded-full border-2 relative overflow-hidden"
          >
            <Image
              src={data!.profileImage}
              alt="user profile"
              className="object-center object-cover"
              fill
            />
          </button>
        )}
        <button
          onClick={() => router.push("/api/logout")}
          className="text-red-500"
        >
          <LogOut />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
