"use client";
import { useQuery } from "@tanstack/react-query";
import SearchSection from "./_components/search-section";
import ResultCard from "./search/_components/result-list/result-card";
import { getRecentAnnouncements } from "./_queryFn/getRecentAnnouncements";
import { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data } = useQuery({
    queryKey: ["recent-job-announcements"],
    queryFn: getRecentAnnouncements,
  });

  const router = useRouter();

  useEffect(() => {
    const checkHasRemainingConfirmJob = async () => {
      const { data } = await axios.get<{ hasRemainingJob: boolean }>(
        `/api/nisit/hasRemainingJob`,
      );
      if (data.hasRemainingJob) {
        router.push("/confirm");
      }
    };
    checkHasRemainingConfirmJob();
  }, [router]);

  return (
    <div className="container mx-auto max-w-5xl my-10 px-4 pt-32">
      <h4 className="text-lg">ค้นหางาน</h4>
      <SearchSection />
      <h4 className="text-lg font-medium mt-8">ประกาศงานล่าสุด</h4>
      {data?.map((announcement) => (
        <ResultCard key={announcement.id} {...announcement} />
      ))}
    </div>
  );
}
