'use client'

import { useRef, useState, forwardRef, useImperativeHandle, memo } from "react"
import Outlined from '@mui/icons-material/Delete';

function Station({ station, passengers, onUpdate, onDelete, stataionList, showPassenger }) {

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
        className="w-[6.5rem] text-center" />

      <select
        id="station_selector"
        className="w-40"
        defaultValue={station.id}
        disabled={hasPassenger}
        onChange={(event) => (onUpdate({ ...station, id: event.target.value }))} >
        {stataionList.map((station) => (
          <option value={station.id} key={station.id}>
            {station.name}
          </option>
        ))}
      </select>

      <div className={"flex flex-row justify-between items-center " + (showPassenger ? "w-9" : "w-0")}>
        {
          station.passengers.length > 0 && <img src={passengers[passengers.findIndex(pass => pass.id == station.passengers[0])].avatar} className="w-4 h-4 rounded-full"></img>
        }
        {
          station.passengers.length > 1 && <p className="w-4">+{passengers.length-1}</p>
        }
      </div>

      <div className="w-6">
        {
          hasPassenger ? <></> : <button onClick={() => onDelete(station)}><Outlined /></button>
        }
      </div>

    </div>
  </>);
}

const StationsComponent = forwardRef(({ initialStations, stataionList, passengers }, ref) => {

  let showPassenger = passengers.length > 0

  initialStations = initialStations.map((station, key) => ({ key: key, ...station }))

  const [stations, setStations] = useState(initialStations)
  const keyCount = useRef(initialStations.length)

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
        <div className="w-[6.5rem] text-center">時間</div>
        <div className="w-40 text-center">停靠地點</div>
        {showPassenger ? <div className="w-9 text-center">乘客</div> : <></>}
        <div className="w-6"></div>
      </div>
      {stations.map((station) => (
        <div key={station.key} className="rounded-lg bg-white m-2">
          <Station
            station={station}
            passengers={passengers}
            onDelete={(station) => handleDelete(station)}
            onUpdate={(station) => handleUpdate(station)}
            stataionList={stataionList}
            showPassenger={showPassenger}
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