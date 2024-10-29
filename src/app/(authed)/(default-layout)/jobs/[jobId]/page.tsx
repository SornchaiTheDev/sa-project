"use client";
import { useQuery } from "@tanstack/react-query";
import { MapPin } from "lucide-react";
import Image from "next/image";
import dayjs from "~/lib/dayjs";
import { getJobAnnouncementFn } from "./queryFns/getJobAnnouncementFn";
import { Skeleton } from "~/components/ui/skeleton";
import PositionComponent from "./_components/Position";
import EnrollSection from "./_components/EnrollSection";
import { ConfirmDialog } from "./_components/ConfirmDialog";

function JobDetailPage({ params }: { params: { jobId: string } }) {
  const { jobId } = params;
  const { data, isLoading } = useQuery({
    queryKey: ["job-announcement", jobId],
    queryFn: () => getJobAnnouncementFn(jobId),
  });

  const jobCreatedAt = dayjs(data?.createdAt).fromNow();

  return (
    <>
      <ConfirmDialog jobAnnounceId={jobId} />
      <div className="container mx-auto max-w-5xl px-4 space-y-4 pb-36 pt-32">
        <div className="relative rounded-xl w-32 h-32">
          {!isLoading && data !== undefined && (
            <Image
              src={data?.companyImage}
              fill
              className="object-contain"
              alt="job logo"
            />
          )}
        </div>
        <div>
          {isLoading ? (
            <>
              <Skeleton className="w-1/2 h-8" />
              <Skeleton className="w-32 h-4 mt-4" />
            </>
          ) : (
            <>
              <h5 className="text-2xl">{data?.title}</h5>
              <h6 className="font-light">{data?.companyName}</h6>
            </>
          )}
        </div>
        <div className="flex gap-2 items-center">
          <MapPin size="1rem" />
          {isLoading ? (
            <Skeleton className="w-32 h-4" />
          ) : (
            <h6 className="text-sm">{data?.companyAddress.province}</h6>
          )}
        </div>
        {isLoading ? (
          <Skeleton className="w-48 h-4" />
        ) : (
          <h6 className="text-sm">โพสต์เมื่อ {jobCreatedAt}</h6>
        )}
        {data?.positions.map((position, i) => (
          <PositionComponent order={i + 1} key={position.id} {...position} />
        ))}
      </div>
      <EnrollSection />
    </>
  );
}

export default JobDetailPage;
