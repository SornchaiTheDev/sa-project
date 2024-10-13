"use client";
import { useAtom } from "jotai";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib";
import { tabStore } from "../store/kusdStore";

interface Tab {
  name: string;
  tab: "companies" | "members";
}

const tabs: Tab[] = [
  {
    name: "อนุมัติหน่วยงาน",
    tab: "companies",
  },
  {
    name: "อนุมัติผู้ใช้งาน",
    tab: "members",
  },
];

function Topbar() {
  const [activeTab, setActiveTab] = useAtom(tabStore);

  return (
    <div className="flex items-center gap-6 mt-2">
      {/* <h5 className="text-lg">XXX บริษัท</h5> */}
      <div className="flex items-center gap-2">
        {tabs.map(({ name, tab }) => (
          <Button
            key={tab}
            onClick={() => setActiveTab(tab)}
            variant="ghost"
            className={cn("text-zinc-400", tab === activeTab && "text-primary")}
          >
            {name}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default Topbar;
