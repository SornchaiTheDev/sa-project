import CreateAnnouncementForm from "./_components/CreateAnnouncementForm";

function MyAnnouncementsPage() {
  return (
    <div className="flex-1 h-full rounded-lg bg-zinc-100 p-4">
      <h5 className="text-2xl font-medium">ประกาศงาน</h5>
      <CreateAnnouncementForm />
    </div>
  );
}

export default MyAnnouncementsPage;
