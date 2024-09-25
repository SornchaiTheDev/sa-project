import OrgList from "./_components/org-list";
import SearchSection from "./_components/search-section";

export default function Home() {
  return (
    <div className="container mx-auto max-w-5xl my-10 px-4 pt-32">
      <h4 className="text-lg">ค้นหางาน</h4>
      <SearchSection />
      <h4 className="text-lg font-medium mt-8">
        ค้นหาผู้ประกอบการที่เหมาะกับคุณ
      </h4>
      <OrgList />
    </div>
  );
}
