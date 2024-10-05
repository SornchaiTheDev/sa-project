"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { KULogo } from "~/configs/assets";
import { cn } from "~/lib";

interface Menu {
  label: string;
  href: string;
}

const menus: Menu[] = [
  { label: "ประกาศงานของฉัน", href: "my-announcements" },
  { label: "ประเมินนิสิต", href: "evaluates" },
  { label: "สถิติ", href: "statistics" },
  { label: "ประวิติการรับสมัครงาน", href: "histories" },
];
function HRNavbar() {
  const pathname = usePathname();

  return (
    <div className="fixed top-0 left-0 right-0 bg-white px-4 py-2 flex justify-between items-center border-b border-zinc-200 z-40">
      <Link href="/">
        <Image src={KULogo} alt="KU Logo" width={48} height={48} />
      </Link>
      <div className="flex gap-12">
        {menus.map(({ href, label }) => (
          <Link
            key={href}
            href={`/hr/${href}`}
            className={cn(
              "hover:text-zinc-800",
              pathname?.includes(href) && "text-primary font-medium",
            )}
          >
            {label}
          </Link>
        ))}
      </div>
      <div className="w-10 h-10 rounded-full border-2"></div>
    </div>
  );
}

export default HRNavbar;
