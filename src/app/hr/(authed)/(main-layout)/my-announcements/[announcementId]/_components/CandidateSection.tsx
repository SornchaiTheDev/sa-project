"use client";

import { useAtomValue } from "jotai";
import CandidateCard from "~/app/hr/(authed)/(main-layout)/my-announcements/[announcementId]/_components/CandidateCard";
import FilterSection from "~/app/hr/(authed)/(main-layout)/my-announcements/[announcementId]/_components/FilterSection";
import { candidateAtom } from "../store/candidate-store";

interface Props {
  announcementId: string;
}

function CandidateSection({ announcementId }: Props) {
  const candidates = useAtomValue(candidateAtom);

  return (
    <>
      <FilterSection {...{ announcementId }} />
      <div className="mt-6 space-y-4">
        {candidates?.map(
          (
            {
              firstName,
              lastName,
              description,
              faculty,
              major,
              profileImage,
              gpax,
            },
            index,
          ) => (
            <CandidateCard
              key={index}
              image={profileImage}
              name={firstName + " " + lastName}
              {...{ description, faculty, major, gpax }}
              status="interview-phrase"
            />
          ),
        )}
      </div>
    </>
  );
}

export default CandidateSection;
