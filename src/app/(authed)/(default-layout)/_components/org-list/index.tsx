import React from "react";
import OrgCard from "./org-card";
import { JobLogo } from "~/configs/assets";

function OrgList() {
  return (
    <div className="grid grid-cols-12 mt-4 gap-4">
      {Array.from({ length: 6 }, (_, i) => (
        <OrgCard
          key={i}
          name="Bangchak"
          description="Bangchak เป็นบริษัทเกี่ยวกับ อะไรก็ไม่รู้ กูอยากต่อยเจชิบหาย Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat."
          href="#"
          jobCount={7}
          image={JobLogo}
        />
      ))}
    </div>
  );
}

export default OrgList;
