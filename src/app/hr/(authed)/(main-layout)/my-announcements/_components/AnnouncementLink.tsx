"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "~/lib";

interface Props {
  href: string;
}

function AnnouncementLink({ href }: Props) {
  const pathname = usePathname();
  const isActive = pathname?.includes(href);

  return (
    <Link
      {...{ href }}
      className={cn("text-sm p-1 block truncate", isActive && "bg-primary rounded-md")}
      passHref
    >
      Software Development, Web development
    </Link>
  );
}

export default AnnouncementLink;
