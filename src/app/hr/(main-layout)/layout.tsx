import React from "react";
import HRNavbar from "./_components/HRNavbar";

function HRMainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-20 px-4">
      <HRNavbar />
      {children}
    </div>
  );
}

export default HRMainLayout;
