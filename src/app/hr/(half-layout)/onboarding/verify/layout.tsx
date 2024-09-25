import React from "react";

function VerifyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col justify-center items-center gap-4 h-screen">
      {children}
    </div>
  );
}

export default VerifyLayout;
