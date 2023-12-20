"use client";

import { useEffect, useState, useRef } from "react";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

import Route from "../components/Route";
import axios from "axios";
import Swal from "sweetalert2";

export default function RouteRequest() {
  const searchParams = useSearchParams();
  const props = JSON.parse(searchParams.get("info"));
  var date = new Date(props["route"].date);
  const weekMap = ["一", "二", "三", "四", "五", "六", "日"];

  var timestamp = new Date(props.timestamp);

  const [showStations, setShowStations] = useState(false);

  const statusMap = {
    new: "請求已送出，等待回覆",
    accepted: "請求已被接受",
    denied: "請求已被拒絕",
    expired: "請求已過期",
    deleted: "請求已刪除",
    canceled: "請求已取消",
  };

  const router = useRouter();
  const send_delete_request = async () => {
    const delete_request_op = {
      method: "DELETE",
      url: `${process.env.NEXT_PUBLIC_API_ROOT}/requests/${props.id}`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      withCredentials: true,
    };

    try {
      const { data } = await axios.request(delete_request_op);
      console.log(data);
      Swal.fire({
        icon: "success",
        title: "Done",
        text: "已成功刪除請求",
      });
      router.push("/passenger");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative flex h-full flex-wrap justify-center space-y-0 bg-passenger">
      <div className="flex h-9 w-11/12 items-center justify-center rounded-xl bg-white font-bold text-dark_o">
        請 求 確 認
      </div>
      <div className="relative h-full w-full rounded-xl border text-center text-black">
        <div className="flex h-14 items-center">
          <p className="ml-4 text-dark_o">
            {date.getFullYear()} / {date.getMonth() + 1} / {date.getDate()} (
            {weekMap[date.getDay()]})
          </p>
          <div className="ml-2  font-bold text-dark_o">
            {props.workStatus ? "上班" : "下班"}
          </div>
        </div>
        <div className="h-auto">
          <p className="ml-3.5 flex font-bold text-dark_o">路線資訊</p>
          {/* <div className={(showStations?"h-auto":"h-32") +  " bg-white mx-3.5 mt-2 rounded-xl"}> */}
          <div className={"mx-3.5 mt-2 h-auto rounded-xl bg-white pt-2"}>
            {showStations ? (
              <>
                <div className="flex h-24  flex-wrap overflow-y-auto">
                  {props["route"].stations.map((e, idx) => {
                    return (
                      <>
                        <div className="flex h-2/6 w-full items-center">
                          <p
                            className={
                              (e.id == props["on-station"].id
                                ? "bg-go2work_light"
                                : e.id == props["off-station"].id
                                  ? "bg-go2home_light"
                                  : "invisible") +
                              " ml-4 w-9 py-0.5 text-center text-sm text-black"
                            }
                          >
                            {e.id == props["on-station"].id ? "上車" : "下車"}
                          </p>
                          <p className="ml-2">{e.datetime.slice(-8, -3)}</p>
                          <p className="ml-2">{e.name}</p>
                        </div>
                      </>
                    );
                  })}
                </div>
                <p
                  className="mb-1 ml-4 mt-4 flex text-sm font-bold text-dark_o hover:cursor-pointer"
                  onClick={() => {
                    setShowStations(false);
                  }}
                >
                  顯示較少
                </p>
              </>
            ) : (
              <>
                <div className="flex">
                  <p className="ml-4 w-9 bg-go2work_light py-0.5 text-center text-sm text-black">
                    上車
                  </p>
                  <p className="ml-1 w-24">
                    {" "}
                    {props["on-station"].datetime.slice(-8, -3)}{" "}
                  </p>
                  <p className="ml-4 w-auto"> {props["on-station"].name} </p>
                </div>
                <div className="mt-2.5 flex">
                  <p className="ml-4 w-9 bg-go2home_light py-0.5 text-center text-sm text-black">
                    下車
                  </p>
                  <p className="ml-1 w-24">
                    {" "}
                    {props["off-station"].datetime.slice(-8, -3)}{" "}
                  </p>
                  <p className="ml-4 w-auto"> {props["off-station"].name}</p>
                </div>
                <p
                  className="mb-1 ml-4 mt-4 flex text-sm font-bold text-dark_o hover:cursor-pointer"
                  onClick={() => {
                    setShowStations(true);
                  }}
                >
                  展開所有停靠站
                </p>
              </>
            )}
          </div>
        </div>
        <div className="relative h-auto">
          <p className="ml-3.5 mt-4 flex font-bold text-dark_o">
            司機和車輛資訊
          </p>
          <div className="mx-3.5 mt-2 h-auto rounded-xl bg-white">
            <div className="flex">
              <p className="ml-4 flex w-28 text-black">司機</p>
              <div className="h-6 w-6 overflow-hidden rounded-full">
                <img
                  src={props["route"].driver.avatar}
                  className="h-full w-full"
                />
              </div>
              <p className="ml-2 text-black">{props["route"].driver.name}</p>
            </div>
            <div className="mt-2.5 flex">
              <p className="ml-4 flex w-28">可共乘人數</p>
              <p>{props["route"].carInfo.capacity}</p>
            </div>
            {/* <div className='flex mt-2.5'>
                            <p className='flex ml-4 w-28'>顏色</p>
                            <p>{props['route'].carInfo.color}</p>
                        </div> */}
            <div className="mt-2.5 flex">
              <p className="ml-4 flex w-28">車牌</p>
              <p>{props["route"].carInfo.licensePlateNumber}</p>
            </div>
          </div>
        </div>
        <div>
          <p className="ml-3.5 mt-4 flex font-bold text-dark_o">狀態</p>
          <div className="mx-3.5 mt-2 h-auto rounded-xl bg-white py-2">
            <p className="ml-4 text-left text-base font-bold text-slate-600">
              {statusMap[props.status]}
            </p>
            <p className="ml-4 text-left text-xs">
              發送時間: {timestamp.getFullYear()}/{timestamp.getMonth() + 1}/
              {timestamp.getDate()} {timestamp.getHours()}:
              {timestamp.getMinutes()}:{timestamp.getSeconds()}
            </p>
          </div>
        </div>
        {props.status == "new" ? (
          <button
            onClick={send_delete_request}
            className="mt-4 w-28 rounded-xl bg-rose-400 text-sm font-bold text-white"
          >
            取消共乘請求
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
