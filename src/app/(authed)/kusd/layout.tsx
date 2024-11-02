import { notFound } from "next/navigation";
import { getUserInfo } from "~/lib/getUserInfo";
import Navbar from "./_components/Navbar";

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
        <div className="pt-20 flex flex-col h-full">
          <div className="rounded-lg bg-zinc-100 p-4 flex-1">
            <h3 className="text-xl">ดำเนินการอนุมัติ</h3>
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
