import { SearchIcon } from "lucide-react";
import { notFound } from "next/navigation";
import Navbar from "~/components/nav-bar";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { getUserInfo } from "~/lib/getUserInfo";

export default async function MyAnnouncementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userInfo = await getUserInfo();

  if (userInfo.typePerson !== "2") {
    notFound();
  }

  return (
    <>
      <div className="p-4 h-screen">
        <Navbar />
        <div className="pt-20 h-full">
          <div className="fixed top-24 h-full w-[300px]  rounded-lg bg-zinc-100 p-4">
            <h5 className="text-lg">นิสิตผ่านเข้าทำงาน</h5>
            <div className="flex rounded-lg overflow-hidden border border-primary mt-2">
              <Input className="rounded-none border-none" />
              <Button className="rounded-none w-10" size="icon">
                <SearchIcon />
              </Button>
            </div>
            <div className="mt-6 h-full overflow-hidden"></div>
          </div>

          <div className="rounded-lg bg-zinc-100 p-4 mt-0 ml-[308px] h-full">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
