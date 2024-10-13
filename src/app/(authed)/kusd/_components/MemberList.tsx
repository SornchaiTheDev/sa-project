import React from "react";
import { useQuery } from "@tanstack/react-query";
import MemberCard from "./MemberCard";
import { getAllCompaniesFn } from "../queryFns/getAllCompaniesFn";

function MemberList() {
  const { data } = useQuery({
    queryKey: ["companies"],
    queryFn: getAllCompaniesFn,
  });

  return data?.companies.map((company) => (
    <MemberCard key={company.id} {...company} />
  ));
}

export default MemberList;
