import React from "react";
import SearchSection from "../_components/search-section";
import ResultList from "./_components/result-list";
import { jobAnnouncements } from "~/__mocks__/job-announcements";
import { headers } from "next/headers";
import { query } from "~/lib/db";

const getJobAnnouncements = async (
  search: string,
  province: string,
  amphur: string,
  tambon: string,
  category: string,
) => {
  //   const queryString = `SELECT * FROM JOB_ANNOUNCEMENT
  // WHERE search`
  // query()
};

async function SearchResultPage() {
  const resultsCount = jobAnnouncements.length;
  const headersList = headers();
  const referer = headersList.get("referer");

  const url = new URL(referer ?? "");
  const searchParams = url.searchParams;

  const province = searchParams.get("province");
  const amphur = searchParams.get("amphur");
  const tambon = searchParams.get("tambon");
  const search = searchParams.get("search");
  const category = searchParams.get("category");

  return (
    <div className="container mx-auto max-w-5xl mt-10 px-4 mb-10 pt-32">
      <SearchSection />
      <div className="mt-4">
        <h5>{resultsCount} งานสำหรับ</h5>
        <h6 className="text-sm">หางาน Software Developer, การจ้างงานประจำ</h6>
      </div>
      <ResultList {...{ jobAnnouncements }} />
    </div>
  );
}

export default SearchResultPage;
