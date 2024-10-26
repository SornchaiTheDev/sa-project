import React from "react";
import ResultCard from "./result-card";
import { JobAnnouncement } from "~/types/DTO/jobAnnouncement";

interface Props {
  jobAnnouncements: JobAnnouncement[];
}

function ResultList({ jobAnnouncements }: Props) {
  return jobAnnouncements.map((announcement) => (
    <ResultCard key={announcement.id} {...announcement} />
  ));
}

export default ResultList;
