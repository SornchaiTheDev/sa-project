import React from "react";
import HRNavbar from "./_components/HRNavbar";

function HRMainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-4 h-screen">
      <HRNavbar />
      <div className="pt-16 h-full">{children}</div>
    </div>
  );
}

export default HRMainLayout;
