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
  var date = new Date(props.on.datetime.slice(0, 10));
  const weekMap = ["一", "二", "三", "四", "五", "六", "日"];

  const [workStatus, setWorkStatus] = useState(null);

  const [showStations, setShowStations] = useState(false);

  // var crossDay = false
  // if(props.on.datetime.slice(8,10) != props.off.datetime.slice(8,10))
  //     crossDay = true

  var onDate = props.stations[0].datetime.slice(8, 10);
  // var change_idx = -1
  // for(var i = 1;i < props.stations.length;i++){
  //     if(props.stations[i].datetime.slice(8,10) != onDate){
  //         change_idx = i;
  //         break;
  //     }
  // }
  const router = useRouter();
  const send_request = async () => {
    if (workStatus == null) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "尚未選定上班或下班",
      });
      return;
    }

    const request_op = {
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_API_ROOT}/requests`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: {
        workStatus: workStatus,
        route: props.id,
        "on-station": props.on.id,
        "off-station": props.off.id,
      },
      withCredentials: true,
    };

    try {
      const { data } = await axios.request(request_op);
      console.log(data);
      Swal.fire({
        icon: "success",
        title: "Done",
        text: "請求已成功送出",
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
          <button
            className={
              (workStatus == true ? "bg-dark_o text-white" : "bg-white") +
              " ml-auto w-12 rounded-xl hover:bg-dark_o hover:text-white"
            }
            onClick={() => {
              setWorkStatus(true);
            }}
          >
            上班
          </button>
          <button
            className={
              (workStatus == false ? "bg-dark_o text-white" : "bg-white") +
              " ml-2 mr-4 w-12 rounded-xl hover:bg-dark_o hover:text-white"
            }
            onClick={() => {
              setWorkStatus(false);
            }}
          >
            下班
          </button>
        </div>
        <div className="h-auto">
          {/* <div className={(showStations?'':'hidden ') + ' z-10 fixed h-2/6 w-mobile'}>
                        <div className='mx-10 h-full bg-white border border-black'>
                            <div className="flex flex-wrap  mt-6 h-4/6 overflow-y-auto">
                                {props.stations.map((e,idx)=>{return (
                                <>
                                {(idx == 0)?<p className='flex w-full items-center justify-center text-dark_o font-bold'>____{e.datetime.slice(0,10)}____</p>:null}
                                {(idx == change_idx)?<p className='flex w-full items-center justify-center text-dark_o font-bold'>____{e.datetime.slice(0,10)}____</p>:null}
                                <div className='flex w-full h-2/6 items-center'>
                                    <p className={((e.id == props.on.id)?"bg-lime-400":(e.id == props.off.id)?"bg-red-400":"invisible") + " text-black w-9 ml-4"}>{(e.id == props.on.id)?"上車":"下車"}</p>
                                    <p className='ml-2'>{e.datetime.slice(-5)}</p>
                                    <p className='ml-2'>{e.name}</p>
                                </div>
                                </>)})}
                            </div>
                            <button className="mt-4 bg-dark_o text-white rounded-xl w-16" onClick={()=>{setShowStations(false)}}>關閉</button>
                        </div>
                    </div> */}
          <p className="ml-3.5 flex font-bold text-dark_o">路線資訊</p>
          {/* <div className={(showStations?"h-auto":"h-32") +  " bg-white mx-3.5 mt-2 rounded-xl"}> */}
          <div className={"mx-3.5 mt-2 h-auto rounded-xl bg-white"}>
            {showStations ? (
              <>
                <div className="flex h-28 flex-wrap overflow-y-auto">
                  {props.stations.map((e, idx) => {
                    return (
                      <>
                        <div className="flex h-2/6 w-full items-center">
                          <p
                            className={
                              (e.id == props.on.id
                                ? "bg-go2work_light"
                                : e.id == props.off.id
                                  ? "bg-go2home_light"
                                  : "invisible") +
                              " ml-4 w-9 py-0.5 text-center text-sm text-black"
                            }
                          >
                            {e.id == props.on.id ? "上車" : "下車"}
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
                <div className="invisible"> invisible block </div>
                <div className="flex">
                  <p className="ml-4 w-9 bg-go2work_light py-0.5 text-center text-sm text-black">
                    上車
                  </p>
                  <p className="ml-1 w-24">
                    {" "}
                    {props.on.datetime.slice(-8, -3)}{" "}
                  </p>
                  <p className="ml-4 w-auto"> {props.on.name} </p>
                </div>
                <div className="mt-2.5 flex">
                  <p className="ml-4 w-9 bg-go2home_light py-0.5 text-center text-sm text-black">
                    下車
                  </p>
                  <p className="ml-1 w-24">
                    {" "}
                    {props.off.datetime.slice(-8, -3)}{" "}
                  </p>
                  <p className="ml-4 w-auto"> {props.off.name}</p>
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
                <img src={props.driver.avatar} className="h-full w-full" />
              </div>
              <p className="ml-2 text-black">{props.driver.name}</p>
            </div>
            <div className="mt-2.5 flex">
              <p className="ml-4 flex w-28">可共乘人數</p>
              <p>{props.carInfo.capacity}</p>
            </div>
            {/* <div className='flex mt-2.5'>
                            <p className='flex ml-4 w-28'>顏色</p>
                            <p>{props.carInfo.color}</p>
                        </div> */}
            <div className="mt-2.5 flex">
              <p className="ml-4 flex w-28">車牌</p>
              <p>{props.carInfo.licensePlateNumber}</p>
            </div>
          </div>
        </div>
        <div className="mt-10 flex justify-center">
          <button
            className="float-right h-8 w-28 rounded-2xl bg-dark_o text-sm text-white"
            onClick={send_request}
          >
            發送共乘請求
          </button>
        </div>
      </div>
    </div>
  );
}
