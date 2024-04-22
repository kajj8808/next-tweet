"use client";

import useSWR from "swr";

export default function SWRTester() {
  const { data, isLoading } = useSWR("/api/user/me");
  console.log(data, isLoading);
  return <div></div>;
}
