"use client";
import ResultCard from "./result-card";
import { JobAnnouncement } from "~/types/DTO/jobAnnouncement";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

interface AnnouncementsQueryParams {
  position: string;
  province: string;
  amphur: string;
  tambon: string;
  category: string;
  jobType: string;
}

const getAnnouncements = async (params: AnnouncementsQueryParams) => {
  const { position, province, amphur, tambon, category, jobType } = params;

  const { data } = await axios.get<{
    announcements: JobAnnouncement[];
  }>(
    `http://localhost:3000/api/announcements?province=${province}&amphur=${amphur}&tambon=${tambon}&position=${position}&category=${category}&jobType=${jobType}`,
  );
  return data.announcements;
};

function ResultList() {
  const searchParams = useSearchParams();

  const province = searchParams.get("province") ?? "";
  const amphur = searchParams.get("amphur") ?? "";
  const tambon = searchParams.get("tambon") ?? "";
  const position = searchParams.get("search") ?? "";
  const category = searchParams.get("category") ?? "";
  const jobType = searchParams.get("jobType") ?? "";

  const params = {
    position,
    province,
    amphur,
    tambon,
    category,
    jobType,
  };

  const { data } = useQuery({
    queryKey: [
      "job-announcements",
      province,
      amphur,
      tambon,
      position,
      category,
      jobType,
    ],
    queryFn: () => getAnnouncements(params),
  });

  const resultsCount = data?.length ?? 0;

  const isNoPosition = position === "";

  return (
    <>
      <div className="mt-4">
        <h5>{resultsCount} งานสำหรับ</h5>
        <h6 className="text-sm">หางาน {isNoPosition ? "ทั้งหมด" : position}</h6>
      </div>
      {data?.map((announcement) => (
        <ResultCard key={announcement.id} {...announcement} />
      ))}
    </>
  );
}

export default ResultList;
