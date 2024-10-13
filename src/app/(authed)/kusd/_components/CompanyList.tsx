import React from "react";
import CompanyCard from "./CompanyCard";
import { useQuery } from "@tanstack/react-query";
import { getUnverifiedFn } from "../queryFns/getUnverifiedFn";

function CompanyList() {
  const { data } = useQuery({
    queryKey: ["companies"],
    queryFn: getUnverifiedFn,
  });

  return data?.companies.map((company) => (
    <CompanyCard key={company.id} {...company} />
  ));
}

export default CompanyList;
