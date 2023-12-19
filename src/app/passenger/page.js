"use client";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import IndexButton from "@/components/IndexButton";
import ShowWaiting from "@/components/ShowWaiting";

import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

export default function Passenger() {

  // some data
  const [hasSchedule, setHasSchedule] = useState(false);
  const [route, setRoute] = useState([]);

  const tempDate = new Date();
  const go2work = false;
  const fakedata = [
    {
      "id": 10,
      "date": "2023-10-22",
      "workStatus": true,
      "n-passengers": 2,
      "status": "available",
      "on-station": {
        "id": 3,
        "name": "台積電新竹3廠東側門",
        "datetime": "2023-10-22T17:30"
      },
      "off-station": {
        "id": 2,
        "name": "台大校門口",
        "datetime": "2023-10-22T18:10"
      },
      "stations": [
        {
          "id": 3,
          "name": "台積電新竹3廠東側門",
          "datetime": "2023-10-22T17:30"
        },
        {
          "id": 1,
          "name": "台北車站",
          "datetime": "2023-10-22T17:50"
        },
        {
          "id": 2,
          "name": "台大校門口",
          "datetime": "2023-10-22T18:10"
        }
      ],
      "carInfo": {
        "model": "Tesla Model 3",
        "color": "紅色",
        "capacity": 4
      },
      "driver": {
        "id": 3,
        "name": "John James",
        "avatar": "https://example.com/avatar.png",
        "phone": "0928123456"
      }
    }
  ];

  // use fake data
  if (route.length === 0) {
    setHasSchedule(true);
    setRoute(fakedata);
  }

  // API

  function fetchRoute() {
    axios(`${process.env.NEXT_PUBLIC_API_ROOT}/routes?mode=passenger-future&n=1`, {
      method: 'get',
      withCredentials: true,
    }).then((res) => {
      setHasSchedule(true);
      setRoute(res.data);
    }).catch((error) => {
      setHasSchedule(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.response.data.message}`,
      });
    })
  }

  // useEffect(fetchRoute, []);

  // function
  function getDateInChinese (date) {
    date = new Date(date);
    // const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekdaysInChinese = ["日", "一", "二", "三", "四", "五", "六"];
    const weekday = weekdaysInChinese[date.getDay()];
    return `${month} 月 ${day} 日 (${weekday})`;
  }

  function getTime (datetime) {
    const date = new Date(datetime);
    const hour = date.getHours();
    const minute = date.getMinutes();
    const formattedMinute = minute < 10 ? `0${minute}` : minute;
    return `${hour} : ${formattedMinute}`;
  }

  return (
    <>
      <div className="flex justify-center">
        <div className="bg-white w-11/12 rounded-xl">
          <div className="flex justify-center space-x-2 my-2">
            <IndexButton mode="passenger" name="尋找行程" icon="Search" />
            <IndexButton mode="passenger" name="查看請求" icon="CheckMail" />
            <IndexButton mode="passenger" name="查看行程" icon="CheckSchedule" />
            <IndexButton mode="passenger" name="共乘紀錄" icon="AllSchedule" />
          </div>
        </div>
      </div>

      {/* <div className="flex justify-center space-x-2 my-4">
        <ShowWaiting whoWait="passenger" waitFor="passenger"/>
        <ShowWaiting whoWait="driver" waitFor="passenger" />
      </div> */}

      <div className="my-4" />

      <div className="ml-6 mb-4">
        <p className="text-sm text-passenger_dark">最近的行程</p>
      </div>

      <div className="flex justify-center">
        <div className="bg-white w-11/12 rounded-xl pb-2">

          {/* No schedule */}
          {!hasSchedule &&
          <div className="flex justify-center items-center my-4">
            <ErrorOutlineIcon className="text-xl mx-4" />
            <p className="text-base">尚未規畫任何未來行程</p>
          </div>
          }

          {/* Has schedule */}
          {hasSchedule &&
          <Link href={`/passenger/singleRide?id=${route[0].id}`}>
            <div className="mx-2 my-4">
              <div className="flex justify-between items-center">
                {/* first row */}
                <p className="ml-2">{getDateInChinese(route[0].date)}</p>
                {route[0].workStatus &&
                <div className="flex justify-center items-center rounded-xl bg-go2work h-6 w-12 ml-4">
                  <p className="font-bold text-white text-md">上班</p>
                </div>
                }
                {!route[0].workStatus &&
                <div className="flex justify-center items-center rounded-xl bg-go2home h-6 w-12 ml-4">
                  <p className="font-bold text-white text-md">下班</p>
                </div>
                }
                <Box sx={{ flexGrow: 1 }} />
                {/* <IconButton size="small">
                  <MoreVertIcon />
                </IconButton> */}
              </div>
              
              <div>
                <div className="flex items-center my-4">
                  <div className="flex justify-center items-center bg-go2work_light h-6 w-10 ml-4">
                    <p>上車</p>
                  </div>
                  <div className="ml-4">
                    <p>{getTime(route[0]["on-station"].datetime)}</p>
                  </div>
                  <div className="ml-4">
                    <p>{route[0]["on-station"].name}</p>
                  </div>
                </div>
                <div className="flex items-center my-4">
                  <div className="flex justify-center items-center bg-go2home_light h-6 w-10 ml-4">
                    <p>下車</p>
                  </div>
                  <div className="ml-4">
                    <p>{getTime(route[0]["off-station"].datetime)}</p>
                  </div>
                  <div className="ml-4">
                    <p>{route[0]["off-station"].name}</p>
                  </div>
                </div>
                <div className="flex items-center my-4">
                  <p className="text-passenger_dark ml-4">司機</p>
                  <img src={route[0]["driver"].avatar} alt="" className="max-h-4 max-w-4 rounded-full mr-2" />
                  <p className="mr-4">{route[0]["driver"].name}</p>
                </div>
                <div className="flex items-center my-4">
                  <p className="text-passenger_dark ml-4">車型</p>
                  <p className="ml-2 mr-4">{route[0]["carInfo"].model}</p>
                  <p className="text-passenger_dark ml-4">車色</p>
                  <p className="ml-2 mr-4">{route[0]["carInfo"].color}</p>
                </div>

                {/* {route[0].stations.map((station) => (
                  <div key={station.id}>
                    {singleStationInfo(station)}
                  </div>
                ))} */}
              </div>

            </div>
          </Link>
          }

        </div>
      </div>
    </>
  );
}