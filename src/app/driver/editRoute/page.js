"use client";

import { useRef } from "react";

import StationsComponent from "../_components/StationComponent/StationComponent";
import HeaderBar from "../_components/HeaderComponent/HeaderComponnet";
import RadioComponent from "../_components/RadioComponent/RadioComponent";
import Swal from "sweetalert2";

import routes from "./data";

const stataionList = [
  {
    id: 1,
    name: "台北車站",
  },
  {
    id: 2,
    name: "台大校門口",
  },
  {
    id: 3,
    name: "台積電新竹3廠東側門",
  },
  {
    id: 4,
    name: "台積電台南2廠西側門",
  },
];

export default function App(props) {
  const route = routes[0];

  const stationRef = useRef(null);

  let initialStations = route.stations.map((station) => ({
    id: station.id,
    time: station.datetime.substring(station.datetime.length - 5),
    passengers: [...station["on-passengers"], ...station["off-passengers"]].map(
      (passId) => route.passengers.find((pass) => pass.id == passId),
    ),
  }));

  function handleSend() {
    let stations = stationRef.current.stations();
    let initial_stations = initialStations;

    for (let station of stations) {
      if (!(station.hasOwnProperty("time") && station["time"] != "")) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "路線中有缺少時間的站點",
        });
        return;
      }
      if (!(station.hasOwnProperty("id") && station["id"] >= 0)) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "路線中有缺少停靠地點的站點",
        });
        return;
      }
    }
    if (
      new Set(stations.map((station) => station.time)).size != stations.length
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "路線中有重複的停靠時間",
      });
      return;
    }
    if (
      new Set(stations.map((station) => station.id)).size != stations.length
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "路線中有重複的停靠站點",
      });
      return;
    }

    let intersec = stations.filter((station) => {
      let match_id = initial_stations.findIndex((s) => s.id == station.id);
      let match_time = initial_stations.findIndex(
        (s) => s.time == station.time,
      );
      return match_id >= 0 && match_id === match_time;
    });

    let added = stations.filter(
      (station) => intersec.findIndex((s) => s.id == station.id) == -1,
    );
    let deleted = initial_stations.filter(
      (station) => intersec.findIndex((s) => s.id == station.id) == -1,
    );

    alert(
      `Added: ${JSON.stringify(added)}\nDeleted: ${JSON.stringify(deleted)}\n`,
    );
  }

  return (
    <div className="text-sm">
      <HeaderBar text="編 輯 行 程"></HeaderBar>

      <div className="mx-2 my-4 flex flex-row justify-between px-2 text-sm text-gray_dark">
        <label htmlFor="date">日期：</label>
        <input
          type="date"
          id="date"
          className="w-44 rounded-lg text-center"
          defaultValue={route.date}
          disabled={true}
        />
        <RadioComponent
          list={[
            { id: "on", text: "上班" },
            { id: "off", text: "下班" },
          ]}
          defaultValue={route.workStatus ? "on" : "off"}
          onChange={(id) => (workStatusRef.current = id)}
          className="flex rounded-lg bg-white px-2 text-gray_dark peer-checked:bg-driver_dark peer-checked:text-white"
          disabled={true}
        />
      </div>

      <hr className="m-4"></hr>

      <StationsComponent
        initialStations={initialStations}
        stataionList={stataionList}
        showPassengers={true}
        ref={stationRef}
      />

      <hr className="m-2"></hr>

      <div className="m-1 flex flex-row justify-between p-1">
        <div className="flex flex-row ">
          <label htmlFor="model" className="text-gray_dark">
            車款：
          </label>
          <input
            id="model"
            className="rounded-lg"
            size={14}
            disabled={true}
            defaultValue={route.carInfo.model}
          />
        </div>
        <div className="flex flex-row">
          <label
            htmlFor="license-plate-number"
            className="w-fit text-gray_dark"
          >
            車牌：
          </label>
          <input
            id="license-plate-number"
            className="rounded-lg"
            size={10}
            disabled={true}
            defaultValue={route.carInfo.licensePlateNumber}
          />
        </div>
      </div>

      <div className="m-1 flex flex-row justify-between p-1">
        <div>
          <label htmlFor="color" className="text-gray_dark">
            外觀顏色：
          </label>
          <input
            id="color"
            className="rounded-lg"
            size={10}
            disabled={true}
            defaultValue={route.carInfo.color}
          />
        </div>
        <div>
          <label htmlFor="max-passengers" className="w-fit text-gray_dark">
            共乘人數上限：
          </label>
          <input
            id="max-passengers"
            className="rounded-lg"
            size={3}
            disabled={true}
            defaultValue={route.carInfo.capacity}
          />
        </div>
      </div>

      <div className="flex justify-center">
        <button className="m-2 rounded-lg bg-white px-2 py-1 text-gray_dark">
          取消
        </button>
        <button
          className="m-2 rounded-lg bg-driver_dark px-2 py-1 text-white"
          onClick={handleSend}
        >
          確認
        </button>
      </div>
    </div>
  );
}
