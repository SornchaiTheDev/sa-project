"use client";

import { useAtomValue } from "jotai";
import { candidateAtom } from "../store/candidate-store";
import FilterSection from "./FilterSection";
import CandidateCard, { type CandidateStatus } from "./CandidateCard";

interface Props {
  announcementId: string;
}

const mapStatus = (isStdConfirm: -1 | 0 | 1 | null): CandidateStatus => {
  switch (isStdConfirm) {
    case 0:
      return "job-rejected";
    case 1:
      return "job-accepted";
    case null:
      return "job-waiting";
    default:
      return "qualify-phrase";
  }
};
function CandidateSection({ announcementId }: Props) {
  const candidates = useAtomValue(candidateAtom);

  return (
    <>
      <FilterSection {...{ announcementId }} />
      <div className="mt-6 space-y-4">
        {candidates?.map(
          (
            {
              id,
              positionID,
              positionName,
              firstName,
              lastName,
              description,
              faculty,
              major,
              profileImage,
              gpax,
              isStdConfirm,
              phoneNumber,
              activityHours,
            },
            index,
          ) => {
            return (
              <CandidateCard
                key={index}
                image={profileImage}
                name={firstName + " " + lastName}
                stdId={id}
                {...{
                  description,
                  faculty,
                  major,
                  gpax,
                  announcementId,
                  positionID,
                  positionName,
                  activityHours,
                  phoneNumber,
                }}
                status={mapStatus(isStdConfirm)}
              />
            );
          },
        )}
      </div>
    </>
  );
}

export default CandidateSection;
