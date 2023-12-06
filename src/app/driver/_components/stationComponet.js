'use client'

import { useRef, useState, forwardRef, useImperativeHandle, memo } from "react"
import Outlined from '@mui/icons-material/Delete';

function Station({ station, onUpdate, onDelete, stataionList, showPassenger }) {

  stataionList = [{ 'id': "-1", name: "--- 請選擇 ---" }, ...stataionList]

  let hasPassenger = station.passengers.length > 0

  return (<>
    {/* <p>{JSON.stringify(station)}</p> */}
    <div className="flex flex-row justify-between">

      <input type="time"
        id="time"
        defaultValue={station.time}
        disabled={hasPassenger}
        onChange={(event) => (onUpdate({ ...station, time: event.target.value }))}
        className="w-28" />

      <select
        id="station_selector"
        className="w-44"
        defaultValue={station.id}
        disabled={hasPassenger}
        onChange={(event) => (onUpdate({ ...station, id: event.target.value }))} >
        {stataionList.map((station) => (
          <option value={station.id} key={station.id}>
            {station.name}
          </option>
        ))}
      </select>

      {/* <div className={showPassenger ? "w-2" : "w-0"}>
        {
          hasPassenger ? <img src={station.passengers[0].avatar}></img> : <></>
        }
        </div> */}

      <div className="w-6">
        {
          hasPassenger ? <></> : <button onClick={() => onDelete(station)}><Outlined /></button>
        }
      </div>

    </div>
  </>);
}

const StationsComponent = forwardRef(({ initialStations, stataionList }, ref) => {

  initialStations = initialStations.map((station, key) => ({ key: key, ...station }))

  const [stations, setStations] = useState(initialStations)
  const keyCount = useRef(initialStations.length)

  let hasPassenger = initialStations.map(station => station.passengers.length >= 0).reduce((a, b) => a | b)

  function cmpStations(lhs, rhs) {
    if (lhs.hasOwnProperty('time')) {
      if (rhs.hasOwnProperty('time')) {
        return lhs.time > rhs.time ? 1 : -1
      } else {
        return -1
      }
    } else if (rhs.hasOwnProperty('time')) {
      return 1
    } else {
      return lhs.key > rhs.key ? 1 : -1
    }
  }

  function handleCreate() {
    setStations((prevStations) => [...prevStations, { key: keyCount.current, passengers: [] }].sort(cmpStations))
    keyCount.current++
  }

  function handleUpdate(updatedStation) {
    setStations((prevStations) => prevStations.map((station) => (station.key === updatedStation.key ? updatedStation : station)).sort(cmpStations))
  }

  function handleDelete(deletedStation) {
    setStations((prevStations) => prevStations.filter((station) => (station.key === deletedStation.key ? false : true)).sort(cmpStations))
  }

  useImperativeHandle(ref, () => ({
    stations: () => stations
  }))

  return (
    <>
      <div className="flex flex-row justify-between m-2 text-gray_dark">
        <div className="w-28 text-center">時間</div>
        <div className="w-44 text-center">停靠地點</div>
        {/* <div className={hasPassenger ? "w-2" : "w-0"}></div> */}
        <div className="w-6"></div>
      </div>
      {stations.map((station) => (
        <div key={station.key} className="rounded-lg bg-white m-2">
          <Station
            station={station}
            onDelete={(station) => handleDelete(station)}
            onUpdate={(station) => handleUpdate(station)}
            stataionList={stataionList}
            showPassenger={hasPassenger}
          />
        </div>
      ))}

      <div className="flex justify-center items-center">
        <button onClick={() => (handleCreate())} className="bg-driver_dark text-white rounded-lg m-2 px-2 py-1">加入新路線</button>
      </div>
    </>
  )
})

export default memo(StationsComponent)