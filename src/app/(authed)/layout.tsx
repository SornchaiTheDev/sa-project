import { getUserInfo } from "~/lib/getUserInfo";
import SessionWrapper from "~/wrapper/SessionWrapper";

export default async function NisitAuthedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userInfo = await getUserInfo();

  return <SessionWrapper {...{ userInfo }}>{children}</SessionWrapper>;
}
