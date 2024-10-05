import React from "react";
import { Button } from "~/components/ui/button";
import CompanyCard from "./_components/CompanyCard";

function KUSDPage() {
  return (
    <>
      <h3 className="text-xl">ดำเนินการอนุมัติ</h3>
      <div className="flex items-center gap-6 mt-2">
        <h5 className="text-lg">XXX บริษัท</h5>
        <div className="flex items-center gap-2">
          <Button variant="ghost" className="text-zinc-400">
            อนุมัติบริษัท
          </Button>
          <Button variant="ghost" className="text-primary">
            อนุมัติสมาชิกบริษัท
          </Button>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <CompanyCard />
        <CompanyCard />
        <CompanyCard />
        <CompanyCard />
      </div>
    </>
  );
}

export default KUSDPage;
