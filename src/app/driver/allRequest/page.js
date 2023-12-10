"use client";

import { getDate, getTime, dateToString } from "../_components/date";
import HeaderBar from "../_components/HeaderComponent/HeaderComponnet";

import requests from "./data";

function RequestComponent({ request, onAccept, onDeny }) {
  return (
    <>
      {/* <p>{JSON.stringify(request)}</p> */}
      <div className="m-2 rounded-lg bg-white p-2">
        <div className="justify-begin flex w-full items-center space-x-2 text-gray_dark">
          <div>{getDate(request.route.date)}</div>
          {request.route.workStatus ? (
            <div className="m-1 w-fit rounded-3xl bg-go2work p-0.5 text-sm text-white">
              上班
            </div>
          ) : (
            <div className="w-fit rounded-xl bg-go2home px-3 py-0.5 text-sm text-white">
              下班
            </div>
          )}
        </div>

        <div className="flex flex-col space-y-2 py-2 pl-3 text-sm text-gray_dark">
          <div className="flex flex-row items-center space-x-3">
            <div className="w-fit rounded-sm bg-go2work_light px-2 py-0.5 text-center">
              上車
            </div>
            <div>
              {getTime(
                request.route.stations.find(
                  (station) => station.id == request.route["on-station"].id,
                ).datetime,
              )}
            </div>
            <div>
              {
                request.route.stations.find(
                  (station) => station.id == request.route["on-station"].id,
                ).name
              }
            </div>
          </div>
          <div className="flex flex-row items-center space-x-3">
            <div className="w-fit rounded-sm bg-go2home_light px-2 py-0.5 text-center">
              下車
            </div>
            <div>
              {getTime(
                request.route.stations.find(
                  (station) => station.id == request.route["off-station"].id,
                ).datetime,
              )}
            </div>
            <div>
              {
                request.route.stations.find(
                  (station) => station.id == request.route["off-station"].id,
                ).name
              }
            </div>
          </div>

          <div className="flex flex-row">
            <div className="flex flex-row items-center space-x-2">
              <div className="text-driver_dark">乘客</div>
              <img
                className="rounded-full"
                src={request.route.driver.avatar}
                width={20}
                height={20}
              />
              <div>{request.route.driver.name}</div>
            </div>
          </div>

          <div className="flex flex-row items-end justify-between">
            <div className="text-[10px]/[10px]">
              發送時間：{dateToString(request.timestamp)}
            </div>
            <div className="flex flex-row space-x-1">
              <button
                className="rounded-xl bg-gray_dark px-4 text-white"
                onClick={onDeny}
              >
                婉拒
              </button>
              <button
                className="rounded-xl bg-driver_dark px-4 text-white"
                onClick={onAccept}
              >
                確認
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function App(props) {
  return (
    <>
      <HeaderBar text={"乘 客 請 求 確 認"} />
      {requests.map((request, key) => (
        <RequestComponent
          key={key}
          request={request}
          onDeny={() => null}
          onAccept={() => null}
        />
      ))}
    </>
  );
}
