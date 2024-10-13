"use client";

import Topbar from "./_components/Topbar";
import CompanyList from "./_components/CompanyList";
import { useAtomValue } from "jotai";
import { tabStore } from "./store/kusdStore";
import MemberList from "./_components/MemberList";

function KUSDPage() {
  const activeTab = useAtomValue(tabStore);
  return (
    <div className="mt-4 space-y-2">
      <Topbar />
      {activeTab === "companies" && <CompanyList />}
      {activeTab === "members" && <MemberList />}
    </div>
  );
}

export default KUSDPage;
