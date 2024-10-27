"use client";
import { useQuery } from "@tanstack/react-query";
import { Search, Settings2 } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { Tag, TagInput } from "emblor";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { getCategoryFn } from "./queryFns/getCategoryFn";
import { getProvinces } from "~/globalQueryFns/getProvinces";
import { getAmphures } from "~/globalQueryFns/getAmphures";
import { getTambons } from "~/globalQueryFns/getTambons";

export default function SearchSection() {
  const [searches, setSearches] = useState<Tag[]>([]);
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);
  const [province, setProvince] = useState("all");
  const [amphur, setAmphur] = useState("all");
  const [tambon, setTambon] = useState("all");
  const [category, setCategory] = useState("all");
  const [jobType, setJobType] = useState("all");

  const router = useRouter();

  const searchParams = useSearchParams();

  useEffect(() => {
    const search = searchParams.get("search");
    if (search) {
      const searches = search.split(",").map((text) => ({ id: text, text }));
      setSearches(searches);
    }

    const province = searchParams.get("province");
    if (province) {
      setProvince(province);
    }

    const amphur = searchParams.get("amphur");
    if (amphur) {
      setAmphur(amphur);
    }

    const tambon = searchParams.get("tambon");
    if (tambon) {
      setTambon(tambon);
    }

    const category = searchParams.get("category");
    if (category) {
      setCategory(category);
    }

    const jobType = searchParams.get("jobType");
    if (jobType) {
      setJobType(jobType);
    }
  }, [searchParams]);

  const categories = useQuery({
    queryKey: ["job-category"],
    queryFn: getCategoryFn,
  });

  const provinces = useQuery({
    queryKey: ["provinces"],
    queryFn: getProvinces,
  });

  const amphures = useQuery({
    queryKey: ["amphures"],
    queryFn: () => getAmphures(province),
    enabled: province !== "all",
  });

  const tambons = useQuery({
    queryKey: ["tambons"],
    queryFn: () => getTambons(amphur),
    enabled: amphur !== "all",
  });

  useEffect(() => {
    if (province !== "all") {
      amphures.refetch();
    }

    if (amphur !== "all") {
      tambons.refetch();
    }
  }, [amphures, tambons, province, amphur]);

  useEffect(() => {
    setAmphur("all");
    setTambon("all");
  }, [province]);

  useEffect(() => {
    setTambon("all");
  }, [amphur]);

  const pathname = usePathname();

  useEffect(() => {
    const searchParams = searches.map(({ text }) => text).join(",");

    router.push(
      `/search?search=${searchParams}&province=${province}&amphur=${amphur}&tambon=${tambon}&category=${category}&jobType=${jobType}`,
    );
  }, [province, router, searches, amphur, tambon, category, pathname, jobType]);

  return (
    <>
      <div className="relative mt-2">
        <Search
          className="absolute top-1/2 -translate-y-1/2 left-2"
          size="1rem"
        />
        <TagInput
          placeholder="ค้นหาตำแหน่งงาน"
          tags={searches}
          setTags={(newSearches) => {
            setSearches(newSearches);
            console.log(newSearches);
            const searches = newSearches as Tag[];
            const searchParams = searches.map(({ text }) => text).join(",");
            router.push(
              `/search/?search=${searchParams}&province=${province}&amphur=${amphur}&tambon=${tambon}&category=${category}`,
            );
          }}
          styleClasses={{
            input: "shadow-all",
            inlineTagsContainer: "border-primary border pl-8 h-12",
            tag: {
              body: "bg-primary/50 hover:bg-primary/60 border border-primary",
            },
          }}
          activeTagIndex={activeTagIndex}
          setActiveTagIndex={setActiveTagIndex}
        />
      </div>
      <div className="flex gap-2 mt-2 flex-wrap">
        <Select onValueChange={setProvince} value={province}>
          <SelectTrigger className="border-primary w-fit">
            {provinces.isLoading ? (
              "กำลังโหลด..."
            ) : (
              <SelectValue placeholder="จังหวัด" />
            )}
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">เลือกจังหวัด</SelectItem>
              {provinces.data?.map(({ id, name }) => (
                <SelectItem key={id} value={name}>
                  {name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select onValueChange={setAmphur} value={amphur}>
          <SelectTrigger className="border-primary w-fit">
            {amphures.isLoading ? (
              "กำลังโหลด..."
            ) : (
              <SelectValue placeholder="อำเภอ" />
            )}
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">เลือกอำเภอ</SelectItem>
              {amphures.data?.map(({ id, name }) => (
                <SelectItem key={id} value={name}>
                  {name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select onValueChange={setTambon} value={tambon}>
          <SelectTrigger className="border-primary w-fit">
            {tambons.isLoading ? (
              "กำลังโหลด..."
            ) : (
              <SelectValue placeholder="ตำบล" />
            )}
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">เลือกตำบล</SelectItem>
              {tambons.data?.map(({ id, name }) => (
                <SelectItem key={id} value={name}>
                  {name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="border-primary w-fit">
            <SelectValue placeholder="หมวดหมู่" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">เลือกหมวดหมู่</SelectItem>
            {categories.data?.map((category) => (
              <SelectItem value={category} key={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={jobType} onValueChange={setJobType}>
          <SelectTrigger className="border-primary w-fit">
            <SelectValue placeholder="ประเภทการจ้างงาน" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">เลือกประเภทการจ้างงาน</SelectItem>
            <SelectItem value="0">Full-Time</SelectItem>
            <SelectItem value="1">Part-Time</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
}
