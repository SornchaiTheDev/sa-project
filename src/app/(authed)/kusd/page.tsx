"use client";

import { useQuery } from "@tanstack/react-query";
import CompanyCard from "./_components/CompanyCard";
import Topbar from "./_components/Topbar";
import { getUnverifiedFn } from "./queryFns/getUnverifiedFn";

function KUSDPage() {
  const { data } = useQuery({
    queryKey: ["companies"],
    queryFn: getUnverifiedFn,
  });

  return (
    <div className="mt-4 space-y-2">
      <Topbar />
      {data?.companies.map((company) => (
        <CompanyCard key={company.id} {...company} />
      ))}
    </div>
  );
}

export default KUSDPage;
