import { type ReactNode } from "react";
import Navbar from "~/components/nav-bar";
import JobAlert from "./_components/JobAlert";

function AuthedLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JobAlert />
      <Navbar />
      {children}
    </>
  );
}

export default AuthedLayout;
