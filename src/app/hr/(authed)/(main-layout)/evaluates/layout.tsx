import EmployeeList from "./_components/EmployeeList";

export default function EvaluateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="fixed top-20 bottom-2 w-[384px] rounded-lg bg-zinc-100 flex flex-col">
        <div className="p-4">
          <h5 className="text-lg">นิสิตผ่านเข้าทำงาน</h5>
        </div>
        <EmployeeList />
      </div>

      <div className="rounded-lg bg-zinc-100 p-4 mt-0 ml-[400px] mb-2">
        {children}
      </div>
    </>
  );
}
