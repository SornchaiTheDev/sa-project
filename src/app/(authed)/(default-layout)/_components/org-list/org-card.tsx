import { StaticImageData } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  name: string;
  href: string;
  description: string;
  image: string | StaticImageData;
  jobCount: number;
}

function JobCard({ name, description, image, jobCount, href }: Props) {
  return (
    <Link
      className="p-4 rounded-xl border border-primary col-span-6 md:col-span-4 space-y-2"
      {...{ href }}
    >
      <div className="relative rounded-xl">
        <Image src={image} className="object-cover" alt="job logo" />
      </div>
      <div>
        <h5 className="text-lg">{name}</h5>
        <p className="text-sm font-light text-ellipsis line-clamp-3">
          {description}
        </p>
      </div>
      <div className="rounded-lg bg-primary px-2 py-1 w-fit">
        <p className="text-sm text-white">{jobCount} ประกาศงาน</p>
      </div>
    </Link>
  );
}

export default JobCard;
