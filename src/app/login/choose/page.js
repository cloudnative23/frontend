"use client";

import { useState, useEffect } from "react";

import Link from "next/link";

import AirlineSeatReclineNormalTwoToneIcon from "@mui/icons-material/AirlineSeatReclineNormalTwoTone";
import SettingsIcon from "@mui/icons-material/Settings";
import ToysTwoToneIcon from "@mui/icons-material/ToysTwoTone";
import axios from "axios";

export default function Choose() {
  const [name, setName] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_ROOT}/me`, { withCredentials: true })
      .then((response) => {
        if (!response.ok) {
          //throw new Error('Network response was not ok');
          //console.log(response);
        }
        return response.data;
      })
      .then((data) => {
        // Handle the successful login response
        console.log(data);
        //setId(data.id)
        setName(data.name);
      })
      .catch((error) => {
        // Handle errors
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);

  return (
    <div className="flex flex-col items-center items-stretch bg-[#F4F4F4]">
      <nav className="flex flex-row justify-between p-2">
        <div>TSMC COMMUTING</div>
        <SettingsIcon />
      </nav>
      <div className="mt-8 w-11/12 self-center">
        <div className="rounded-xl bg-white text-center">選擇身份</div>
      </div>

      <div className="mb-0 pt-20 text-center">
        歡迎 {name}, 您想當乘客還是司機呢？
      </div>

      <div className="mt-24 flex w-6/12 justify-between self-center text-white">
        <Link
          href="/passenger"
          className="basis-16 rounded-xl bg-[#DC8352] text-center text-xl"
        >
          <div>
            <AirlineSeatReclineNormalTwoToneIcon /> <br />{" "}
            <div className="inline-block text-base">乘客</div>
          </div>
        </Link>
        <Link
          href="/driver"
          className="basis-16 rounded-xl bg-[#5184CF] text-center text-xl"
        >
          <div>
            <ToysTwoToneIcon /> <br />{" "}
            <div className="inline-block text-base">司機</div>
          </div>
        </Link>
      </div>
    </div>
  );
}
