"use client";

import { useState, useEffect } from "react";

import { useSearchParams } from "next/navigation";

import { getTime } from "../_components/utils";
import axios from "axios";

export default function SingleRide(props) {
  const searchParams = useSearchParams();
  const rid = parseInt(searchParams.get("id"));

  const fake = [
    {
      id: 10,
      date: "",
      workStatus: false,
      status: "available",
      stations: [],
      carInfo: {
        color: "紅色",
        capacity: 4,
        licensePlateNumber: "ABC-1234",
      },
      passengers: [],
      driver: {
        id: 3,
        name: "John James",
        avatar: "https://example.com/avatar.png",
        phone: "0928123456",
      },
    },
  ];

  const [routeid, setrid] = useState(60);
  const [route, setRoute] = useState(fake[0]);

  useEffect(() => {
    const now = new Date();
    const currentDateTime = now.toLocaleString();
    //setDate(currentDateTime);
  }, []);

  useEffect(() => {
    axios(`${process.env.NEXT_PUBLIC_API_ROOT}/routes/${rid}`, {
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
        var curRoute = data;
        for (let i = 0; i < curRoute.passengers.length; i++) {
          for (let j = 0; j < curRoute.stations.length; j++) {
            if (
              curRoute.stations[j]["on-passengers"].includes(
                curRoute.passengers[i].id,
              )
            )
              curRoute.passengers[i].on = curRoute.stations[j].name;
            if (
              curRoute.stations[j]["off-passengers"].includes(
                curRoute.passengers[i].id,
              )
            )
              curRoute.passengers[i].off = curRoute.stations[j].name;
          }
        }
        console.log(curRoute);
        //setId(data.id)
        setRoute(curRoute);
      })
      .catch((error) => {
        // Handle errors
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error.response.data.message}`,
        });
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);

  return (
    <div className="flex h-full flex-col items-center items-stretch overflow-y-scroll bg-[#EFF6F9] text-sm">
      <div className="w-11/12 self-center">
        <div className="rounded-xl bg-white text-center">檢視行程</div>
      </div>

      <div className="flex justify-between">
        <div className="mb-0 ml-3 pt-6 text-center text-driver_dark">
          {" "}
          {route.date}{" "}
        </div>
        <div className="mr-3 mt-0 pt-6 text-center text-driver_dark">
          {" "}
          {route.workStatus ? "上班" : "下班"}{" "}
        </div>
      </div>

      <div className="mb-4 ml-3 mt-8 text-driver_dark"> 路線資訊 </div>
      <div className="flex w-10/12 flex-col self-center rounded-md bg-white ">
        {route.stations.map((station) => (
          <div className="my-2 grid grid-cols-12 px-1" key={station.id}>
            <div className="col-span-2">
              {/* {station.on.includes(id) ? <div className='bg-[#E4F8CC] text-sm m-auto w-9 text-center'> 上車 </div> : <div> </div>}
                    {station.off.includes(id) ? <div className='bg-[#FFE2E3] text-sm m-auto w-9 text-center'> 下車 </div>: <div> </div>} */}
            </div>
            <div className="col-span-2"> {getTime(station.datetime)} </div>
            <div className="col-span-8 text-center"> {station.name} </div>
          </div>
        ))}
      </div>

      <div className="mb-4 ml-3 mt-8 text-driver_dark"> 乘客資訊 </div>
      <div className="flex w-10/12 flex-col self-center ">
        {route.passengers.map((passenger) => (
          <div
            className="my-2 rounded-md bg-white px-2 py-2"
            key={passenger.id}
          >
            <div className="flex justify-between px-1 py-1">
              <div> 乘客姓名 </div>
              <div> {passenger.name} </div>
            </div>
            <div className="flex justify-between px-1 py-1">
              <div> 乘客電話 </div>
              <div> {passenger.phone} </div>
            </div>
            <div className="flex justify-between px-1 py-1">
              <div> 上車站點 </div>
              <div> {passenger.on} </div>
            </div>
            <div className="flex justify-between px-1 py-1">
              <div> 下車站點 </div>
              <div> {passenger.off} </div>
            </div>
          </div>
        ))}

        {/*           
            <div>
                <div className='flex justify-between px-1 my-2'> 
                  <div> 聯絡電話 </div>
                  <div> {fake[0].driver.name} </div>
                </div>
            </div> */}
      </div>
    </div>
  );
}
