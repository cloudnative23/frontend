"use client";

import {
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
  memo,
  useEffect,
} from "react";

import Outlined from "@mui/icons-material/Delete";

function Station({
  station,
  onUpdate,
  onDelete,
  stataionList,
  showPassengers,
}) {
  // stataionList = [{ id: -1, name: "--- 請選擇 ---" }, ...stataionList];

  let hasPassenger = station.passengers.length > 0;

  return (
    <>
      {/* <p>{station.key}</p> */}
      {/* <p>{JSON.stringify(station)}</p> */}
      <div className="flex flex-row justify-between">
        <input
          type="time"
          id="time"
          defaultValue={station.time}
          disabled={hasPassenger}
          onChange={(event) =>
            onUpdate({ ...station, time: event.target.value })
          }
          className="w-[6.5rem] text-center"
        />

        <select
          id="station_selector"
          className="w-40"
          defaultValue={station.id}
          disabled={hasPassenger}
          onChange={(event) =>
            onUpdate({ ...station, id: parseInt(event.target.value) })
          }
        >
          {stataionList.map((station) => (
            <option value={station.id} key={station.id}>
              {station.name}
            </option>
          ))}
        </select>

        {showPassengers ? (
          <div className={"flex w-9 flex-row items-center justify-between"}>
            {station.passengers.length > 0 && (
              <img
                src={station.passengers[0].avatar}
                className="h-4 w-4 rounded-full"
              ></img>
            )}
            {station.passengers.length > 1 && (
              <p className="w-4">+{station.passengers.length - 1}</p>
            )}
          </div>
        ) : (
          <></>
        )}

        <div className="w-6">
          {hasPassenger ? (
            <></>
          ) : (
            <button onClick={() => onDelete(station)} id="del">
              <Outlined />
            </button>
          )}
        </div>
      </div>
    </>
  );
}

const StationsComponent = forwardRef(
  ({ initialStations, stationList, showPassengers = false }, ref) => {
    // let showPassenger = passengers.length > 0
    // showPassenger = true

    const [stations, setStations] = useState([]);
    const keyCount = useRef(0);

    function initialize(stations) {
      let keyBase = keyCount.current;
      stations = stations.map((station, key) => ({
        key: key + keyBase,
        ...station,
      }));
      setStations(stations);
      keyCount.current += stations.length;
      // alert("In initialize: "+ keyCount.current)
    }

    useEffect(() => initialize(initialStations), []);

    function cmpStations(lhs, rhs) {
      if (lhs.hasOwnProperty("time")) {
        if (rhs.hasOwnProperty("time")) {
          return lhs.time > rhs.time ? 1 : -1;
        } else {
          return -1;
        }
      } else if (rhs.hasOwnProperty("time")) {
        return 1;
      } else {
        return lhs.key > rhs.key ? 1 : -1;
      }
    }

    function handleCreate() {
      let key = keyCount.current;
      setStations((prevStations) =>
        [...prevStations, { key: key, passengers: [] }].sort(cmpStations),
      );
      keyCount.current++;
    }

    function handleUpdate(updatedStation) {
      setStations((prevStations) =>
        prevStations
          .map((station) =>
            station.key === updatedStation.key ? updatedStation : station,
          )
          .sort(cmpStations),
      );
    }

    function handleDelete(deletedStation) {
      setStations((prevStations) =>
        prevStations
          .filter((station) =>
            station.key === deletedStation.key ? false : true,
          )
          .sort(cmpStations),
      );
    }

    useImperativeHandle(ref, () => ({
      stations: () => stations,
      setStations: (stations) => initialize(stations),
    }));

    return (
      <>
        <div className="m-2 flex flex-row justify-between text-gray_dark">
          <div className="w-[6.5rem] text-center">時間</div>
          <div className="w-40 text-center">停靠地點</div>
          {showPassengers ? <div className="w-9 text-center">乘客</div> : <></>}
          <div className="w-6"></div>
        </div>
        {stations.map((station) => (
          <div key={station.key} className="m-2 rounded-lg bg-white">
            <Station
              station={station}
              onDelete={(station) => handleDelete(station)}
              onUpdate={(station) => handleUpdate(station)}
              stataionList={stationList}
              showPassengers={showPassengers}
            />
          </div>
        ))}

        <div className="flex items-center justify-center">
          <button
            onClick={() => handleCreate()}
            className="m-2 rounded-lg bg-driver_dark px-2 py-1 text-white"
          >
            加入新路線
          </button>
        </div>
      </>
    );
  },
);

StationsComponent.displayName = "StationsComponent"

export default memo(StationsComponent);
