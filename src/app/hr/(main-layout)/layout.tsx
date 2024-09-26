import React from "react";
import HRNavbar from "./_components/HRNavbar";

function HRMainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen">
      <HRNavbar />
      {children}
    </div>
  );
}

export default HRMainLayout;