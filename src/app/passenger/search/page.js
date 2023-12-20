"use client";

import { useEffect, useState, useRef } from "react";

import Route from "../components/Route";
import axios from "axios";
import Swal from "sweetalert2";

export default function Passenger() {
  const [routes, setRoutes] = useState([]);

  const example_route = {
    id: 0,
    workStatus: true,
    status: "available",
    date: "2023-10-20",
    stations: [
      {
        id: 0,
        name: "台北車站",
        datetime: "2023-10-22T22:30",
        on: [],
        off: [],
      },
      {
        id: 1,
        name: "台北地下鐵",
        datetime: "2023-10-22T23:40",
        on: [],
        off: [],
      },
      {
        id: 2,
        name: "捷運公館站",
        datetime: "2023-10-23T01:40",
        on: [],
        off: [],
      },
      { id: 3, name: "龜山", datetime: "2023-10-23T02:15", on: [], off: [] },
      {
        id: 4,
        name: "台積電本部",
        datetime: "2023-10-23T03:40",
        on: [],
        off: [],
      },
    ],
    passengers: [],
    driver: {
      id: 10,
      name: "John James",
      avatar: "https://i.ibb.co/r49x9Kb/kirbohappy.png",
      phone: 912123456,
    },
    carInfo: { color: "紅色", capacity: 3, licensePlateNumber: "ABC-0123" },
  };
  const example_route2 = {
    id: 1,
    workStatus: true,
    status: "available",
    date: "2023-10-20",
    stations: [
      {
        id: 0,
        name: "台北車站",
        datetime: "2023-10-22T11:30",
        on: [],
        off: [],
      },
      {
        id: 1,
        name: "台北地下鐵",
        datetime: "2023-10-22T12:40",
        on: [],
        off: [],
      },
      {
        id: 2,
        name: "捷運公館站",
        datetime: "2023-10-22T13:40",
        on: [],
        off: [],
      },
      { id: 3, name: "龜山", datetime: "2023-10-22T14:15", on: [], off: [] },
      {
        id: 4,
        name: "台積電本部",
        datetime: "2023-10-22T15:40",
        on: [],
        off: [],
      },
    ],
    passengers: [],
    driver: {
      id: 10,
      name: "提達斯",
      avatar: "https://i.ibb.co/94Qs1WR/FCVWD5-XMAYa46b.jpg",
      phone: 912123456,
    },
    carInfo: { color: "白色", capacity: 2, licensePlateNumber: "ABC-0123" },
  };
  // const stations = ["台北車站","台北地下鐵","捷運公館站","龜山","台積電本部"]

  const [stations, setStations] = useState([]);
  const [message, setMessage] = useState("");

  const DateInputRef = useRef(null);
  const StartStationRef = useRef(null);
  const EndStationRef = useRef(null);
  const StartTimeRef = useRef(null);
  const EndTimeRef = useRef(null);

  const [onStation, setOnStation] = useState(null);
  const [offStation, setOffStation] = useState(null);

  const [myRequest, setMyRequest] = useState([]);

  const getStations = async () => {
    const stations_op = {
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_API_ROOT}/stations`,
      headers: {
        Accept: "application/json",
      },
      withCredentials: true, // 確保包含 Cookies
    };
    try {
      const { data } = await axios.request(stations_op);
      setStations(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  const getMyRequest = async () => {
    const options = {
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_API_ROOT}/requests`,
      params: { mode: "me", n: "3", "order-mode": "asc" },
      headers: { Accept: "application/json" },
      withCredentials: true,
    };

    try {
      const { data } = await axios.request(options);
      let req_id = [];
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        req_id.push(data[i]["route"]["id"]);
      }
      setMyRequest(req_id);
    } catch (error) {
      console.error(error);
    }
  };

  const search = async () => {
    // if(date && startStation && endStation && startTime && endTime){

    if (
      DateInputRef.current.value &&
      StartStationRef.current.value &&
      EndStationRef.current.value &&
      StartTimeRef.current.value &&
      EndTimeRef.current.value
    ) {
      const SearchDate = new Date(DateInputRef.current.value);
      const year = SearchDate.getFullYear();
      const month = (SearchDate.getMonth() + 1).toString().padStart(2, "0");
      const day = SearchDate.getDate().toString().padStart(2, "0");
      const hours = SearchDate.getHours().toString().padStart(2, "0");
      const minutes = SearchDate.getMinutes().toString().padStart(2, "0");

      const startDateTime =
        `${year}-${month}-${day}T` + StartTimeRef.current.value;
      const endDateTime = `${year}-${month}-${day}T` + EndTimeRef.current.value;

      const search_op = {
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_API_ROOT}/routes`,
        params: {
          mode: "search",
          n: "20",
          "on-station": parseInt(StartStationRef.current.value),
          "off-station": parseInt(EndStationRef.current.value),
          "on-datetime": startDateTime,
          "off-datetime": endDateTime,
        },
        headers: { Accept: "application/json" },
        withCredentials: true,
      };
      try {
        const { data } = await axios.request(search_op);
        setRoutes(data);
        console.log(data);
        if (data.length == 0) setMessage("查無搜尋結果");
        else setMessage("");
        setOnStation(parseInt(StartStationRef.current.value));
        setOffStation(parseInt(EndStationRef.current.value));
      } catch (error) {
        console.error(error);
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "搜尋條件尚未齊全",
      });
    }
  };

  useEffect(() => {
    getStations();
    getMyRequest();
  }, []);

  const testing = async () => {
    const options1 = {
      method: "POST",
      url: "https://api-dev.cloudnative23.com/routes",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: {
        date: "2023-12-22",
        stations: [
          { id: 1, datetime: "2023-12-22T17:30" },
          { id: 2, datetime: "2023-12-22T18:50" },
          { id: 3, datetime: "2023-12-22T19:50" },
          { id: 4, datetime: "2023-12-22T20:14" },
        ],
        workStatus: new Boolean(false),
        carInfo: {
          model: "豐田",
          color: "藍色",
          capacity: 3,
          licensePlateNumber: "ABC-1234",
        },
      },
      withCredentials: true,
    };
    try {
      const { data } = await axios.request(options1);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative flex h-full flex-wrap justify-center space-y-0 bg-passenger">
      {/* <button className="bg-black text-white hover:bg-blue-200 hover:text-black mr-4 h-5" onClick={()=>{setRoutes((ele)=>{let a=[];a.push(...ele);a.push(example_route);return a;})}}> Add Route </button>
        <button className="bg-black text-white hover:bg-blue-200 hover:text-black mr-4 h-5" onClick={()=>{setRoutes((ele)=>{let a=[];a.push(...ele);a.push(example_route2);return a;})}}> Add Route2 </button>
        <button className="bg-black text-white hover:bg-blue-200 hover:text-black h-5" onClick={()=>{setRoutes((ele)=>{let a=[];a.push(...ele);a.pop();return a;})}}> Delete Route </button>  */}
      <div className="flex h-9 w-11/12 items-center justify-center rounded-xl bg-white font-bold text-dark_o">
        尋 找 行 程
      </div>

      {/* <button onClick={testing}> testing</button> */}

      <div className="relative flex h-5/6 w-full flex-col rounded-xl text-center text-black">
        <div className="flex h-9 w-full items-center ">
          <p className=" ml-3.5 mr-2.5">日期</p>
          <input
            type="date"
            ref={DateInputRef}
            className="mr-4 w-36 rounded-xl bg-white text-center text-black"
          />
          {/* <button className={(crossDay?'bg-white':'bg-dark_o text-white')+" w-16 rounded-xl mr-2 hover:bg-dark_o hover:text-white"} onClick={()=>{setCrossDay(false)}}>未跨日</button>
          <button className={(crossDay?'bg-dark_o text-white':'bg-white')+" w-16 rounded-xl hover:bg-dark_o hover:text-white"} onClick={()=>{setCrossDay(true)}}>跨日</button> */}
          <button
            className="ml-5 w-28 rounded-xl bg-dark_o text-white hover:bg-dark_o hover:text-white"
            onClick={() => {
              search();
            }}
          >
            搜尋
          </button>
        </div>
        <div className="mt-1.5 flex h-9 w-full items-center">
          <p className="ml-3.5 mr-2.5">出發</p>
          <select
            ref={StartStationRef}
            className=" mr-2 w-44 rounded-xl text-center"
          >
            <option selected disabled hidden value={null}>
              請選擇起點
            </option>
            {stations.map((e, idx) => {
              return <option key={e.id} value={e.id}>{e.name}</option>;
            })}
          </select>
          <input ref={StartTimeRef} type="time" className="rounded-xl" />
        </div>
        <div className="mt-1 flex h-9 w-full items-center">
          <p className="ml-3.5 mr-2.5">抵達</p>
          <select
            ref={EndStationRef}
            className=" mr-2 w-44 rounded-xl text-center"
          >
            <option selected disabled hidden value={null}>
              請選擇終點
            </option>
            {stations.map((e, idx) => {
              return <option key={e.id} value={e.id}>{e.name}</option>;
            })}
          </select>
          <input ref={EndTimeRef} type="time" className="rounded-xl" />
        </div>
        <div className="ml-4 mt-2 block flex font-bold text-dark_o">
          現有行程搜尋結果
        </div>
        <div className="flex h-full max-h-route_board flex-wrap overflow-y-auto">
          {routes.length == 0 ? (
            <div className="flex h-full w-full items-center justify-center">
              <p className="w-full text-center font-bold">{message}</p>
            </div>
          ) : (
            routes.map((e, idx) => {
              return (
                <Route
                  key={e.id}
                  props={e}
                  startStation={onStation}
                  endStation={offStation}
                  myRequest={myRequest}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
