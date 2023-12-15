"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

import { useSearchParams } from "next/navigation";

import HeaderBar from "../_components/HeaderComponent/HeaderComponnet";
import RadioComponent from "../_components/RadioComponent/RadioComponent";
import StationsComponent from "../_components/StationComponent/StationComponent";
import { getStationList, transformBackendRouteData, validateRouteStations } from "../_components/utils";

export default function App(props) {

  const searchParams = useSearchParams({});

  const [route, setRoute] = useState(null);
  const [stationList, setStationList] = useState([])
  const [isLoaded, setIsLoaded] = useState(false);

  const stationRef = useRef(null);

  let routeId = searchParams.get("id")

  useEffect(() => {
    if (routeId !== null) {
      let routePromise = axios(`${process.env.NEXT_PUBLIC_API_ROOT}/routes/${routeId}`, {
        method: 'get',
        withCredentials: true,
      }).then((res) => {
        setRoute(transformBackendRouteData(res.data))
      }).catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.response.data.message,
        });
      });
      let statPromise = getStationList().then((sl) => {
        setStationList([{ id: -1, name: "--- 請選擇 ---" }, ...sl])
      }).catch(err => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "無法取得站點名稱",
        });
      })
      Promise.all([routePromise, statPromise])
        .then(() => setIsLoaded(true))
    }
  }, []);

  function handleSend() {

    let stations = stationRef.current.stations();
    let prevStations = route.stations;

    let entry = [
      [stations, "路線", validateRouteStations],
    ];

    for (let [value, name, validateFn] of entry) {
      let res = validateFn(value)
      if (!res.validated) {
        Swal.fire({
          icon: "error",
          title: `${name}欄位有誤`,
          text: res.message,
        })
        return
      }
    }

    let intersec = stations.filter((station) => {
      let match_id = prevStations.findIndex((s) => s.id == station.id);
      let match_time = prevStations.findIndex(
        (s) => s.time == station.time,
      );
      return match_id >= 0 && match_id === match_time;
    });

    let added = stations.filter(
      (station) => intersec.findIndex((s) => s.id == station.id) == -1,
    );
    let deleted = prevStations.filter(
      (station) => intersec.findIndex((s) => s.id == station.id) == -1,
    );

    // alert(
    //   `Added: ${JSON.stringify(added)}\nDeleted: ${JSON.stringify(deleted)}\n`,
    // );

    Promise.all(
      deleted.map((station) =>
        axios(`${process.env.NEXT_PUBLIC_API_ROOT}/routes/${routeId}/stations/${station.id}`, {
          method: 'delete',
          withCredentials: true
        }))
    ).then(() => (
      Promise.all(
        added.map((station) =>
          axios(`${process.env.NEXT_PUBLIC_API_ROOT}/routes/${routeId}/stations/${station.id}`, {
            method: 'put',
            withCredentials: true,
            data: { datetime: `${route.date}T${station.time}` },
            headers: { 'content-type': 'application/json' }
          }))
      ).catch((err) => {
        Swal.fire({
          icon: "error",
          title: "新增站點時發生錯誤",
          text: err.response.data.message,
        })
      })).then(() => {
        Swal.fire({
          icon: "success",
          title: "路線修改成功",
        })
      })
    ).catch((err) => {
      Swal.fire({
        icon: "error",
        title: "刪除站點時發生錯誤",
        text: err.response.data.message,
      })
    }).finally(() => {
      axios(`${process.env.NEXT_PUBLIC_API_ROOT}/routes/${routeId}/stations`, {
        method: 'get',
        withCredentials: true,
      }).then((res) => {
        let newRoute = transformBackendRouteData({...route, stations: res.data })
        setRoute(newRoute)
        stationRef.current.setStations(newRoute.stations)
      }).catch((err) => {
        Swal.fire({
          icon: "error",
          title: "更新站點資訊時發生錯誤",
          text: err.response.data.message,
        })
      })
    })
  }

  return (
    <div className="text-sm">
      <HeaderBar text="編 輯 行 程"></HeaderBar>
      {isLoaded ? (
        <>
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
            initialStations={route.stations}
            stationList={stationList}
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
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
