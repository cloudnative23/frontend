"use client";

import { useEffect, useState, useRef } from "react";

import RadioComponent from "../components/RadioComponent/RadioComponent.js";
import Request from "../components/Request";
import axios from "axios";
import Swal from "sweetalert2";

export default function Passenger() {
  const [myRequest, setMyRequest] = useState([]);
  const [filter, setFilter] = useState("new");

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
      let req = [];

      for (let i = 0; i < data.length; i++) req.push(data[i]);

      setMyRequest(req);
      console.log(req);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMyRequest();
  }, []);

  function handleFilterChange(id) {
    switch (id) {
      case "new":
      case "accepted":
      case "denied":
      case "other":
        setFilter(id);
        break;
      default:
        alert("bug");
        break;
    }
  }

  const getLen = () => {
    let cnt = 0;
    for (let i = 0; i < myRequest.length; i++) {
      const e = myRequest[i];
      if (filter == "other") {
        if (
          e.status == "deleted" ||
          e.status == "canceled" ||
          e.status == "expired"
        )
          cnt++;
      } else if (e.status == filter) {
        cnt++;
      }
    }
    return cnt;
  };

  return (
    <div className="relative flex h-full flex-wrap justify-center space-y-0 bg-passenger">
      {/* <button className="bg-black text-white hover:bg-blue-200 hover:text-black mr-4 h-5" onClick={()=>{setRoutes((ele)=>{let a=[];a.push(...ele);a.push(example_route);return a;})}}> Add Route </button>
        <button className="bg-black text-white hover:bg-blue-200 hover:text-black mr-4 h-5" onClick={()=>{setRoutes((ele)=>{let a=[];a.push(...ele);a.push(example_route2);return a;})}}> Add Route2 </button>
        <button className="bg-black text-white hover:bg-blue-200 hover:text-black h-5" onClick={()=>{setRoutes((ele)=>{let a=[];a.push(...ele);a.pop();return a;})}}> Delete Route </button>  */}
      <div className="flex h-9 w-11/12 items-center justify-center rounded-xl bg-white font-bold text-dark_o">
        請 求 列 表
      </div>
      <div className="m-2 flex flex-row space-x-1">
        <RadioComponent
          list={[
            { id: "new", text: "等待回覆" },
            { id: "accepted", text: "被接受" },
            { id: "denied", text: "遭拒絕" },
            { id: "other", text: "其他" },
          ]}
          defaultValue={"new"}
          onChange={(id) => handleFilterChange(id)}
          className="flex justify-between rounded-xl bg-white px-3 text-sm text-gray_dark peer-checked:bg-passenger_dark peer-checked:text-white"
        />
      </div>
      <div className="flex h-5/6  w-full flex-wrap overflow-y-auto">
        {getLen() == 0 ? (
          <div className="flex h-full w-full items-center justify-center">
            <p className="w-full text-center font-bold">無任何請求</p>
          </div>
        ) : (
          myRequest.map((e, idx) => {
            if (filter == "other") {
              if (
                e.status == "deleted" ||
                e.status == "canceled" ||
                e.status == "expired"
              )
                return <Request key={e.id} props={e} />;
            } else if (e.status == filter) {
              return <Request key={e.id} props={e} />;
            }
          })
        )}
      </div>
    </div>
  );
}
