"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import { redirect } from "next/navigation";

import HeaderBar from "../components/HeaderComponent/HeaderComponnet";
import RadioComponent from "../components/RadioComponent/RadioComponent";
import { getTime, getDate } from "../components/utils";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import Swal from "sweetalert2";

function Route({ route, onDelete }) {
  let workStatus = route.workStatus;

  return (
    <>
      <div
        className={
          "m-2 h-fit rounded-lg p-3 text-xs " +
          (workStatus ? "bg-[#FAFFFB]" : "bg-[#FFFBFB]")
        }
      >
        <div className="flex justify-between">
          <div>{getDate(route.date)}</div>
          <div className="flex">
            {/* <div onClick={onDelete}>
              <DeleteIcon sx={{ fontSize: '1rem' }} />
            </div> */}
          </div>
        </div>
        <div className="justify-begin my-2 flex space-x-1">
          {workStatus ? (
            <div className="rounded-xl bg-go2work px-2 text-white">上班</div>
          ) : (
            <div className="rounded-xl bg-go2home px-2 text-white">下班</div>
          )}
          <div className="w-fit rounded-3xl bg-passenger_dark px-2 text-white">
            {route.passengers.length} / {route.carInfo.capacity}人
          </div>
        </div>
        <div className="grid grid-cols-[27%_73%]">
          {route.stations.map((station) => (
            <>
              <div>{getTime(station.datetime)}</div>
              <div>{station.name}</div>
            </>
          ))}
        </div>
      </div>
    </>
  );
}

export default function App() {
  const [filter, setFilter] = useState("all");
  const [allRoute, setAllRoute] = useState([]);

  function fetchAllRoute() {
    axios(`${process.env.NEXT_PUBLIC_API_ROOT}/routes?mode=passenger-future`, {
      method: "get",
      withCredentials: true,
    })
      .then((res) => {
        setAllRoute(res.data);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error.response.data.message}`,
        });
      });
  }

  function handleFilterChange(id) {
    switch (id) {
      case "all":
      case "to-work":
      case "to-home":
      case "pass-avalible":
        setFilter(id);
        break;
      default:
        alert("bug");
        break;
    }
  }

  useEffect(fetchAllRoute, []);

  function handleDelete(id) {
    axios(`${process.env.NEXT_PUBLIC_API_ROOT}/routes/${id}`, {
      method: "delete",
      withCredentials: true,
    })
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "刪除成功",
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error.response.data.message}`,
        });
      })
      .finally(fetchAllRoute);
  }

  return (
    <>
      <HeaderBar text={"所 有 行 程"} />
      <div className="m-2 flex flex-row space-x-1">
        <RadioComponent
          list={[
            { id: "all", text: "全部" },
            { id: "to-work", text: "上班" },
            { id: "to-home", text: "下班" },
          ]}
          defaultValue={"all"}
          onChange={(id) => handleFilterChange(id)}
          className="flex justify-between rounded-xl bg-white px-3 text-sm text-gray_dark peer-checked:bg-passenger_dark peer-checked:text-white"
        />
      </div>
      <div className="grid max-h-[85%] w-full grid-cols-2 overflow-y-auto">
        {allRoute
          .filter((route) => {
            switch (filter) {
              case "all":
                return true;
              case "to-work":
                return route.workStatus;
              case "to-home":
                return !route.workStatus;
            }
          })
          .map((route) => (
            <Link key={route.id} href={`/passenger/singleRide?id=${route.id}`}>
              <Route
                route={route}
                onDelete={() => handleDelete(route.id)}
              />
            </Link>
          ))}
      </div>
    </>
  );
}
