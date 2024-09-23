import React from "react";
import SearchSection from "../../_components/search-section";
import ResultList from "./_components/result-list";
import { jobAnnouncements } from "~/__mocks__/job-announcements";

function SearchResultPage({ params }: { params: { jobName: string } }) {
  const resultsCount = jobAnnouncements.length;
  return (
    <div className="container mx-auto max-w-5xl mt-10 px-4 mb-10">
      <SearchSection initialSearch={params.jobName} />
      <div className="mt-4">
        <h5>{resultsCount} งานสำหรับ</h5>
        <h6 className="text-sm">หางาน Software Developer, การจ้างงานประจำ</h6>
      </div>
      <ResultList {...{ jobAnnouncements }} />
    </div>
  );
}

export default SearchResultPage;
