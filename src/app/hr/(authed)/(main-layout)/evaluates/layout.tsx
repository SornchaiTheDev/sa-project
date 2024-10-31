import { SearchIcon } from "lucide-react";
import React from "react";
import { Button } from "~/components/ui/button";
import Image from "next/image";
import { cn } from "~/lib";
import Link from "next/link";
import { Input } from "~/components/ui/input";

export default function EvaluateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="fixed top-20 bottom-2 w-[384px] rounded-lg bg-zinc-100 flex flex-col">
        <div className="p-4">
          <h5 className="text-lg">นิสิตผ่านเข้าทำงาน</h5>
        </div>
        <div className="overflow-y-auto mb-4">
          {Array.from({ length: 1 }, (_, i) => (
            <Link
              key={i}
              href="#"
              className={cn(
                "flex gap-4 items-center p-2 px-4 mx-2",
                // i === 0 && "bg-primary rounded-md text-white",
              )}
            >
              <div className="w-16 aspect-square rounded-lg overflow-hidden relative">
                <Image
                  src="http://localhost:9000/ku-job/nisit/profile/1730369718787_final.jpg"
                  alt="Sam Altman picture"
                  fill
                  className="object-center object-cover"
                />
              </div>
              <div>
                <h5 className="font-medium">นางสาวภาดา แสงตะวัน</h5>
                <h6 className="text-sm">Content Creator</h6>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="rounded-lg bg-zinc-100 p-4 mt-0 ml-[400px] mb-2">
        {children}
      </div>
    </>
  );
}
