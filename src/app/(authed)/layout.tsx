import { type ReactNode } from "react";
import Navbar from "~/components/nav-bar";

function AuthedLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="mt-24">{children}</div>
    </>
  );
}

export default AuthedLayout;
