"use client";

import { useEffect, useRef, useState } from "react";

import HeaderBar from "../_components/HeaderComponent/HeaderComponnet";
import RadioComponent from "../_components/RadioComponent/RadioComponent";
import StationsComponent from "../_components/StationComponent/StationComponent";
import {
  getStationList,
  validateRouteStations,
  validateNotNull,
  validateIsNumber,
} from "../_components/utils";
import axios from "axios";
import Swal from "sweetalert2";

export default function App(props) {
  const dateRef = useRef(null);
  const workStatusRef = useRef("on");

  const brandRef = useRef(null);
  const colorRef = useRef(null);
  const capRef = useRef(null);
  const licNumRef = useRef(null);

  const stationRef = useRef(null);

  const [stationList, setStationList] = useState([]);
  // stataionList = [{ id: -1, name: "--- 請選擇 ---" }, ...stataionList];

  useEffect(() => {
    getStationList()
      .then((sl) => {
        setStationList([{ id: -1, name: "--- 請選擇 ---" }, ...sl]);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "無法取得站點名稱",
        });
      });
  }, []);

  function handleSend() {
    let stations = stationRef.current.stations();

    let entry = [
      [stations, "路線", validateRouteStations],
      [dateRef.current.value, "日期", validateNotNull],
      [brandRef.current.value, "車款", validateNotNull],
      [licNumRef.current.value, "車牌", validateNotNull],
      [colorRef.current.value, "外觀顏色", validateNotNull],
      [capRef.current.value, "共乘人數上限", validateIsNumber],
    ];

    for (let [value, name, validateFn] of entry) {
      let res = validateFn(value);
      if (!res.validated) {
        Swal.fire({
          icon: "error",
          title: `${name}欄位有誤`,
          text: res.message,
        });
        return;
      }
    }

    let data = {
      date: dateRef.current.value,
      workStatus: workStatusRef.current == "on",
      stations: stations.map((station) => ({
        id: station.id,
        datetime: `${dateRef.current.value}T${station.time}`,
      })),
      carInfo: {
        model: brandRef.current.value,
        color: colorRef.current.value,
        capacity: parseInt(capRef.current.value),
        licensePlateNumber: licNumRef.current.value,
      },
    };

    // data = {
    //   "date": "2023-12-22",
    //   "workStatus": false,
    //   "stations": [
    //     {
    //       "id": 3,
    //       "datetime": "2023-12-22T12:34"
    //     },
    //     {
    //       "id": 1,
    //       "datetime": "2023-12-22T13:04"
    //     },
    //     {
    //       "id": 2,
    //       "datetime": "2023-12-22T13:34"
    //     }
    //   ],
    //   "carInfo": {
    //     "model": brandRef.current.value,
    //     "color": "紅色",
    //     "capacity": 4,
    //     "licensePlateNumber": "ABC-1234"
    //   }
    // }

    // alert(JSON.stringify(data, null, 2));

    axios(`${process.env.NEXT_PUBLIC_API_ROOT}/routes`, {
      method: "post",
      withCredentials: true,
      data: data,
      "content-type": "application/json",
    })
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "上傳成功",
        });
        // redirect('driver')
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "上傳失敗",
          text: err.response.data.message,
        });
      });

    // alert(JSON.stringify(data));
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
        stationList={stationList}
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
