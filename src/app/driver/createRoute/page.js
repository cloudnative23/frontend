"use client";

import { useRef } from "react";
import Swal from "sweetalert2";

import HeaderBar from "../_components/HeaderComponent/HeaderComponnet";
import RadioComponent from "../_components/RadioComponent/RadioComponent";
import StationsComponent from "../_components/StationComponent/StationComponent";


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
  const dateRef = useRef(null);
  const workStatusRef = useRef("on");

  const brandRef = useRef(null);
  const colorRef = useRef(null);
  const capRef = useRef(null);
  const licNumRef = useRef(null);

  const stationRef = useRef(null);

  function handleSend() {
    let stations = stationRef.current.stations();

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

    let value_to_name = [
      [dateRef.current.value, "日期"],
      [brandRef.current.value, "車款"],
      [licNumRef.current.value, "車牌"],
      [colorRef.current.value, "外觀顏色"],
      [capRef.current.value, "共乘人數上限"],
    ];

    for (let [value, title] of value_to_name) {
      if (value == "") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${title}的欄位不可為空`,
        });
        return;
      }
    }

    let data = {
      date: dateRef.current.value,
      workStatus: workStatusRef == "on",
      stations: stations.map((station) => ({
        id: station.id,
        datetime: `${dateRef.current.value}T${station.time}`,
      })),
      carInfo: {
        brand: brandRef.current.value,
        color: colorRef.current.value,
        capacity: capRef.current.value,
        licensePlateNumber: licNumRef.current.value,
      },
    };

    alert(JSON.stringify(data));
  }

  return (
    <div className="text-sm">
      <HeaderBar text="新 增 行 程"></HeaderBar>

      <div className="mx-2 my-4 flex flex-row justify-between px-2 text-sm text-gray_dark">
        <label htmlFor="date">日期：</label>
        <input
          type="date"
          id="date"
          className="w-44 rounded-lg text-center"
          ref={dateRef}
        />
        <RadioComponent
          list={[
            { id: "on", text: "上班" },
            { id: "off", text: "下班" },
          ]}
          defaultValue={workStatusRef.current}
          onChange={(id) => (workStatusRef.current = id)}
          className="flex rounded-lg bg-white px-2 text-gray_dark peer-checked:bg-driver_dark peer-checked:text-white"
        />
      </div>

      <hr className="m-4"></hr>

      <StationsComponent
        initialStations={[]}
        passengers={[]}
        stataionList={stataionList}
        ref={stationRef}
      />

      <hr className="m-2"></hr>

      <div className="m-1 flex flex-row justify-between p-1">
        <div className="flex flex-row ">
          <label htmlFor="model" className="text-gray_dark">
            車款：
          </label>
          <input id="model" className="rounded-lg" size={14} ref={brandRef} />
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
            ref={licNumRef}
          />
        </div>
      </div>

      <div className="m-1 flex flex-row justify-between p-1">
        <div>
          <label htmlFor="color" className="text-gray_dark">
            外觀顏色：
          </label>
          <input id="color" className="rounded-lg" size={10} ref={colorRef} />
        </div>
        <div>
          <label htmlFor="max-passengers" className="w-fit text-gray_dark">
            共乘人數上限：
          </label>
          <input
            id="max-passengers"
            className="rounded-lg"
            size={3}
            ref={capRef}
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
