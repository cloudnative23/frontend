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
import Badge from '@mui/material/Badge';

export default function Driver() {

  // some data
  const [hasSchedule, setHasSchedule] = useState(false);
  const [route, setRoute] = useState([]);
  const [allRequest, setAllReqeust] = useState([]);

  const tempDate = new Date();
  const go2work = false;
  const fakeRoutes = [
    {
      "id": 10,
      "date": "2023-10-22",
      "workStatus": false,
      "n-passengers": 2,
      "status": "available",
      "stations": [
        {
          "id": 3,
          "name": "台積電新竹3廠東側門",
          "datetime": "2023-10-22T17:30",
          "on-passengers": [
            2,
            4
          ],
          "off-passengers": []
        },
        {
          "id": 1,
          "name": "台北車站",
          "datetime": "2023-10-22T17:50",
          "on-passengers": [],
          "off-passengers": [
            4
          ]
        },
        {
          "id": 2,
          "name": "台大校門口",
          "datetime": "2023-10-22T18:10",
          "on-passengers": [],
          "off-passengers": [
            4
          ]
        }
      ],
      "carInfo": {
        "model": "Tesla Model 3",
        "color": "紅色",
        "capacity": 4,
        "licensePlateNumber": "ABC-1234"
      },
      "passengers": [
        {
          "id": 2,
          "name": "Bill Gates",
          "phone": "0982104928",
          "avatar": "https://example.com/avatar.png"
        },
        {
          "id": 4,
          "name": "Paul",
          "phone": "0954201859",
          "avatar": "https://example.com/avatar.png"
        }
      ],
      "driver": {
        "id": 3,
        "name": "John James",
        "avatar": "https://example.com/avatar.png",
        "phone": "0928123456"
      }
    }
  ];
  const fakeRequests = [
    {
      "id": 3,
      "timestamp": "2023-10-22T18:10:20",
      "read": true,
      "valid": true,
      "for": "passenger",
      "category": "request",
      "route": {
        "id": 10,
        "date": "2023-10-22",
        "workStatus": false,
        "status": "available",
        "stations": [
          {
            "id": 3,
            "name": "台積電新竹3廠東側門",
            "datetime": "2023-10-22T17:30",
            "on-passengers": [
              2,
              4
            ],
            "off-passengers": []
          },
          {
            "id": 1,
            "name": "台北車站",
            "datetime": "2023-10-22T17:50",
            "on-passengers": [],
            "off-passengers": [
              4
            ]
          },
          {
            "id": 2,
            "name": "台大校門口",
            "datetime": "2023-10-22T18:10",
            "on-passengers": [],
            "off-passengers": [
              4
            ]
          }
        ],
        "carInfo": {
          "model": "Tesla Model 3",
          "color": "紅色",
          "capacity": 4,
          "licensePlateNumber": "ABC-1234"
        },
        "passengers": [
          {
            "id": 2,
            "name": "Bill Gates",
            "phone": "0982104928",
            "avatar": "https://example.com/avatar.png"
          },
          {
            "id": 4,
            "name": "Paul",
            "phone": "0954201859",
            "avatar": "https://example.com/avatar.png"
          }
        ],
        "driver": {
          "id": 3,
          "name": "John James",
          "avatar": "https://example.com/avatar.png",
          "phone": "0928123456"
        }
      },
      "request": {
        "id": 11,
        "status": "new",
        "date": "2023-10-20",
        "timestamp": "2023-10-15T20:23:20",
        "workStatus": true,
        "passenger": {
          "id": 10,
          "name": "John James",
          "avatar": "https://example.com/avatar.png"
        },
        "on-station": {
          "id": 3,
          "name": "台積電新竹3廠東側門",
          "datetime": "2023-10-15T15:00"
        },
        "off-station": {
          "id": 2,
          "name": "台大校門口",
          "datetime": "2023-10-15T17:00"
        },
        "route": {
          "id": 10,
          "date": "2023-10-22",
          "status": "available",
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
            "color": "紅色",
            "capacity": 4,
            "licensePlateNumber": "ABC-1234"
          },
          "driver": {
            "id": 3,
            "name": "John James",
            "avatar": "https://example.com/avatar.png",
            "phone": "0928123456"
          }
        }
      }
    }
  ];

  // use fake data
  // if (route.length === 0) {
  //   setHasSchedule(true);
  //   setRoute(fakeRoutes);
  //   setAllReqeust(fakeRequests);
  // }
  
  // API

  function fetchRoute() {
    axios(`${process.env.NEXT_PUBLIC_API_ROOT}/routes?mode=driver-future&n=1`, {
      method: 'get',
      withCredentials: true,
    }).then((res) => {
      if (res.data.length > 0) {
        setHasSchedule(true);
        setRoute(res.data);
      }
    }).catch((error) => {
      setHasSchedule(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.response.data.message}`,
      });
    })
  }

  function fetchAllRequest() {
    axios(`${process.env.NEXT_PUBLIC_API_ROOT}/requests?mode=available`, {
      method: 'get',
      withCredentials: true,
    }).then((res) => {
      setAllReqeust(res.data.filter(req => req.status == 'new'));
    }).catch((err) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${err.response.data.message}`,
      });
    })
  }

  useEffect(fetchRoute, []);
  useEffect(fetchAllRequest, []);

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

  function singleStationInfo (station) {
    // console.log(station);

    function getTime (datetime) {
      const date = new Date(datetime);
      const hour = date.getHours();
      const minute = date.getMinutes();
      const formattedMinute = minute < 10 ? `0${minute}` : minute;
      return `${hour} : ${formattedMinute}`;
    }
    function makeOnAvatar (passengerID) {
      const passengerInfo = route[0].passengers.find((passenger) => passenger.id === passengerID);
      return (
        <div className="flex justify-center items-center rounded-full bg-go2work_light h-6 p-2 border border-[#D3D3D3]">
          <img src={passengerInfo.avatar} alt="" className="max-h-4 max-w-4 rounded-full mr-2" />
          <p className="text-xs mr-2">{passengerInfo.name}</p>
        </div>
      )
    }
    function makeOffAvatar (passengerID) {
      const passengerInfo = route[0].passengers.find((passenger) => passenger.id === passengerID);
      return (
        <div className="flex justify-center items-center rounded-full bg-go2home_light h-6 p-2 border border-[#D3D3D3]">
          <img src={passengerInfo.avatar} alt="" className="max-h-4 max-w-4 rounded-full mr-2" />
          <p className="text-xs mr-2">{passengerInfo.name}</p>
        </div>
      )
    }

    return (
      <>
        <div className="flex justify-between items-center my-1">
          <p className="ml-16">{getTime(station.datetime)}</p>
          <p className="ml-4">{station.name}</p>
          <Box sx={{ flexGrow: 1 }} />
        </div>

        {station['on-passengers'].length > 0 &&
        <div className="flex ml-28 mb-2">
          {station['on-passengers'].map((passenger) => (
            <div key={passenger} className="ml-2">
              {makeOnAvatar(passenger)}
            </div>
          ))}
        </div>
        }
        {station['off-passengers'].length > 0 &&
        <div className="flex ml-28 mb-2">
          {station['off-passengers'].map((passenger) => (
            <div key={passenger} className="ml-2">
              {makeOffAvatar(passenger)}
            </div>
          ))}
        </div> 
        }
      </>
    )
  }

  return (
    <>
      <div className="flex justify-center">
        <div className="bg-white w-11/12 rounded-xl">
          <div className="flex justify-center space-x-2 my-2">
            <Link href={"driver/createRoute"}>
              <IndexButton mode="driver" name="新增行程" icon="AddSchedule" />
            </Link>
            <Link href={"driver/allRequest"}>
              <IndexButton mode="driver" name="查看請求" icon="CheckMail" alertNum={allRequest.length}/>
            </Link>
            <Link href={"driver/futureRoute"}>
              <IndexButton mode="driver" name="查看行程" icon="CheckSchedule" />
            </Link>
            <Link href={"driver/pastRoute"}>
              <IndexButton mode="driver" name="共乘紀錄" icon="AllSchedule" />
            </Link>
          </div>
        </div>
      </div>

      {/* <div className="flex justify-center space-x-2 my-4">
        <Link href={"driver/allRequest"}>
          <ShowWaiting whoWait="driver" waitFor="driver"/>
        </Link>
        <ShowWaiting whoWait="driver" waitFor="passenger" />
      </div> */}

      <div className="my-4" />

      <div className="ml-6 mb-4">
        <p className="text-sm text-driver_dark">最近的行程</p>
      </div>

      <div className="flex justify-center">
        <div className="bg-white w-11/12 rounded-xl pb-2">

          {/* No schedule */}
          {!hasSchedule &&
          <div className="flex justify-center items-center my-4">
            <ErrorOutlineIcon className="text-xl mx-2 my-4" />
            <p className="text-base">尚未規畫任何未來行程</p>
          </div>
          }

          {/* Has schedule */}
          {hasSchedule &&
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
              {/* routes info */}
              {route[0].stations.map((station) => (
                <div key={station.id}>
                  {singleStationInfo(station)}
                </div>
              ))}
            </div>
          </div>
          }

        </div>
      </div>
    </>
  );
}
