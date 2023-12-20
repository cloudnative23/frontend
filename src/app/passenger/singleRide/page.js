"use client";

import React, { useState, useEffect } from "react";

import Link from "next/link";

import EmailIcon from "@mui/icons-material/Email";
import SettingsIcon from "@mui/icons-material/Settings";
import axios from "axios";

export default function SingleRide(props) {
  const fake = [
    {
      id: 10,
      date: "2023-10-22",
      workStatus: false,
      status: "available",
      stations: [
        {
          id: 3,
          name: "台積電新竹3廠東側門",
          datetime: "2023-10-22T17:30",
          "on-passengers": [2, 4],
          "off-passengers": [],
        },
        {
          id: 1,
          name: "台北車站",
          datetime: "2023-10-22T17:50",
          "on-passengers": [],
          "off-passengers": [4],
        },
        {
          id: 2,
          name: "台大校門口",
          datetime: "2023-10-22T18:10",
          "on-passengers": [],
          "off-passengers": [4],
        },
      ],
      carInfo: {
        color: "紅色",
        capacity: 4,
        licensePlateNumber: "ABC-1234",
      },
      passengers: [
        {
          id: 2,
          name: "Bill Gates",
          phone: "0982104928",
        },
        {
          id: 4,
          name: "Paul",
          phone: "0954201859",
        },
      ],
      driver: {
        id: 3,
        name: "John James",
        avatar: "https://example.com/avatar.png",
        phone: "0928123456",
      },
    },
  ];

  const [id, setID] = useState(null);
  const [routeid, setrid] = useState(60);
  const [route, setRoute] = useState(fake[0]);

  useEffect(() => {
    const now = new Date();
    const currentDateTime = now.toLocaleString();
    //setDate(currentDateTime);
  }, []);

  useEffect(() => {
    axios(`${process.env.NEXT_PUBLIC_API_ROOT}/me`, {
      method: "get",
      withCredentials: true,
    }).then((response) => {
      setID(response.data.id);
    });
  }, []);

  useEffect(() => {
    //let data = {mode: 'search'}
    //axios(`${process.env.NEXT_PUBLIC_API_ROOT}/route?mode=passenger-future&n=1`, {method: 'get', withCredentials: true })
    axios(`${process.env.NEXT_PUBLIC_API_ROOT}/routes/${routeid}`, {
      method: "get",
      withCredentials: true,
    })
      .then((response) => {
        if (!response.ok) {
          //throw new Error('Network response was not ok');
        }
        return response.data;
      })
      .then((data) => {
        // Handle the successful login response
        console.log(data.stations[0]);
        //setId(data.id)
        setRoute(data);
        console.log(route.stations[0]);
      })
      .catch((error) => {
        // Handle errors
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);

  return (
    <div className="flex flex-col items-center items-stretch bg-[#F9F3EF] text-sm">
      <div className="w-11/12 self-center ">
        <div className="rounded-xl bg-white text-center">檢視行程</div>
      </div>

      <div className="flex justify-between">
        <div className="mb-0 ml-3 pt-6 text-center text-orange-600">
          {" "}
          {route.date}{" "}
        </div>
        <div className="mr-3 mt-0 pt-6 text-center text-orange-600"> 上班 </div>
      </div>

      <div className="mb-4 ml-3 mt-8 text-orange-600"> 路線資訊 </div>
      <div className="flex w-10/12 flex-col self-center rounded-xl bg-white ">
        {route.stations.map((station) => (
          <div className="my-2 grid grid-cols-12 px-1" key={station.id}>
            <div className="col-span-2">
              {/*station["on-passengers"]*/}
              {station["on-passengers"].includes(id) ? (
                <div className="m-auto w-9 bg-[#E4F8CC] text-center text-sm">
                  {" "}
                  上車{" "}
                </div>
              ) : (
                <div> </div>
              )}
              {station["off-passengers"].includes(id) ? (
                <div className="m-auto w-9 bg-[#FFE2E3] text-center text-sm">
                  {" "}
                  下車{" "}
                </div>
              ) : (
                <div> </div>
              )}
            </div>
            <div className="col-span-2 text-center">
              {" "}
              {station.datetime.substring(
                station.datetime.indexOf("T") + 1,
                station.datetime.length,
              )}{" "}
            </div>
            <div className="col-span-8 text-center"> {station.name} </div>
          </div>
        ))}
      </div>

      <div className="mb-4 ml-3 mt-8 text-orange-600"> 司機與車輛資訊 </div>
      <div className="flex w-10/12 flex-col self-center rounded-xl bg-white ">
        <div>
          <div className="my-2 flex justify-between px-1">
            <div> 司機 </div>
            <div> {route.driver.name} </div>
          </div>
        </div>
        <div>
          <div className="my-2 flex justify-between px-1">
            <div> 可共乘人數 </div>
            <div> {route.carInfo.capacity} </div>
          </div>
        </div>
        <div>
          <div className="my-2 flex justify-between px-1">
            <div> 車牌 </div>
            <div> {route.carInfo.licensePlateNumber} </div>
          </div>
        </div>
        <div>
          <div className="my-2 flex justify-between px-1">
            <div> 顏色 </div>
            <div> {route.carInfo.color} </div>
          </div>
        </div>
        <div>
          <div className="my-2 flex justify-between px-1">
            <div> 聯絡電話 </div>
            <div> {route.driver.phone} </div>
          </div>
        </div>
      </div>
    </div>
  );
}
