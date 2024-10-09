import { getUserInfo } from "~/lib/getUserInfo";
import AllLoginSessionWrapper from "~/wrapper/AllLoginSessionWrapper";

export default async function NisitAuthedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userInfo = await getUserInfo();

  return (
    <AllLoginSessionWrapper {...{ userInfo }}>
      {children}
    </AllLoginSessionWrapper>
  );
}
