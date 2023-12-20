"use client";

import { useEffect } from "react";

import { useSearchParams } from "next/navigation";

import axios from "axios";

export default function App() {
  // alert(process.env.NEXT_PUBLIC_API_ROOT)

  const params = useSearchParams();

  let data = {
    workStatus: Boolean(params.get("workStatus")),
    route: parseInt(params.get("route")),
    "on-station": parseInt(params.get("on-station")),
    "off-station": parseInt(params.get("off-station")),
  };

  let a = axios
    .post(`${process.env.NEXT_PUBLIC_API_ROOT}/requests`, data, {
      withCredentials: true,
    })
    .then((res) => {
      alert(JSON.stringify(res, null, 2));
    })
    .catch((err) => {
      alert(JSON.stringify(err.response, null, 2));
    });

  return <></>;
}
