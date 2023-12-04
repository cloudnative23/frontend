'use client'

import { useRef, useState, forwardRef, useImperativeHandle, memo} from "react"
import { AiFillDelete } from "react-icons/ai";

function Station({ station, onUpdate, onDelete, stataionList }) {

    stataionList = [ {'id': "-1", name: "--- 請選擇 ---"}, ...stataionList ]

    return (<>
      {/* <p>{JSON.stringify(station)}</p> */}
      <div className="flex flex-row justify-between">
        
        <input type="time"
          id="time"
          defaultValue={station.time}
          disabled={station.hasPassenger}
          onChange={(event) => (onUpdate({ ...station, time: event.target.value }))} 
          className="w-32"/>
  
        <select 
          id="station_selector"
          defaultValue={station.id}
          disabled={station.hasPassenger}
          onChange={(event) => (onUpdate({ ...station, id: event.target.value }))} >
          {stataionList.map((station) => (
            <option value={station.id} key={station.id}>
              {station.name}
            </option>
          ))}
        </select>

        <div className="w-6">
          {
            station.hasPassenger ? <></> : <button onClick={() => onDelete(station)}><AiFillDelete /></button>
          }
        </div>
  
      </div>
    </>);
}  

const StationsComponent = forwardRef(({ initialStations, stataionList }, ref) => {

    initialStations = initialStations.map((station, key) => {
      return {
        id: station.id,
        key: key,
        time: station.datetime.substring(station.datetime.length - 5),
        hasPassenger: station["on-passengers"].length + station["off-passengers"].length > 0,
      }
    })
 
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
      setStations((prevStations) => [...prevStations, {key: keyCount.current} ].sort(cmpStations))
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
        <div className="flex flex-row justify-between m-2">
          <div className="w-32 text-center text-gray-500">時間</div>
          <div className="text-gray-500">停靠地點</div>
          <div className="w-6"></div>
        </div>
        {stations.map((station) => (
          <div key={station.key} className="rounded-lg bg-white m-2">
            <Station 
              station={station} 
              onDelete={(station) => handleDelete(station)}
              onUpdate={(station) => handleUpdate(station)}
              stataionList={stataionList}
            />
          </div>
        ))}
  
        <div className="flex justify-center items-center">
          <button onClick={() => (handleCreate())} className="bg-[#5284CF] text-white rounded-lg m-2 px-2 py-1">加入新路線</button>
        </div>
      </>
    )
})

export default memo(StationsComponent)