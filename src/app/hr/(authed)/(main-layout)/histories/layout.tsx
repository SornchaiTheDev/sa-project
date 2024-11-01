export default function MyAnnouncementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="rounded-lg bg-zinc-100 p-4 mt-0">{children}</div>
    </>
  );
}
