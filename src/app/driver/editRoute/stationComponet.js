'use client'

import { useRef, useState, forwardRef, useImperativeHandle, memo} from "react"
import { AiFillDelete } from "react-icons/ai";

function cmp(lhs, rhs) {
    return lhs.time > rhs.time ? 1 : -1
}

function Station({ station, onUpdate, onDelete, stataionList }) {

    return (<>
      {/* <p>{JSON.stringify(station)}</p> */}
      <div className="flex flex-row justify-between">
        
        <input type="time"
          id="time"
          defaultValue={station.time}
          disabled={station.hasPassenger}
          onChange={(event) => (onUpdate({ ...station, time: event.target.value }))} />
  
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
        hasPassenger: station.on.length + station.off.length > 0,
      }
    })
 
    const [stations, setStations] = useState(initialStations)
    const keyCount = useRef(initialStations.length)
  
    // stationRefCallback(stations)
  
    function handleCreate() {
      setStations((prevStations) => [...prevStations, {id: 0, key: keyCount.current, time: "12:00", hasPassenger: false}].sort(cmp))
      keyCount.current++
    }
  
    function handleUpdate(updatedStation) {
      setStations((prevStations) => prevStations.map((station) => (station.key === updatedStation.key ? updatedStation : station)).sort(cmp))
    }
  
    function handleDelete(deletedStation) {
      setStations((prevStations) => prevStations.filter((station) => (station.key === deletedStation.key ? false : true)).sort(cmp))
    }

    useImperativeHandle(ref, () => ({
        stations: () => stations
    }))

    return (
      <>
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