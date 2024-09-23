import { type ReactNode } from "react";
import Navbar from "~/components/nav-bar";

function AuthedLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

export default AuthedLayout;
