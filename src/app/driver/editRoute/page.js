"use client";

import { useRef } from "react";

import routes from './data'
import StationsComponent from "../_components/stationComponet";
import RadioComponent from "../_components/radioComponents";

const stataionList = [
  {
    "id": 1,
    "name": "台北車站"
  },
  {
    "id": 2,
    "name": "台大校門口"
  },
  {
    "id": 3,
    "name": "台積電新竹3廠東側門"
  },
  {
    "id": 4,
    "name": "台積電台南2廠西側門"
  }
]

export default function App(props) {

  const route = routes[0]

  const dateRef = useRef(null)
  const workStatusRef = useRef(route.workStatus ? 'on' : 'off')

  const brandRef = useRef(null)
  const colorRef = useRef(null)
  const capRef = useRef(null)
  const licNumRef = useRef(null)

  const isPublicRef = useRef(null)

  const stationRef = useRef(null)

  let initialStations = route.stations.map((station) => ({
    id: station.id,
    time: station.datetime.substring(station.datetime.length - 5),
    passengers: [...station["on-passengers"], ...station["off-passengers"]]
  }))

  function handleSend() {

    alert(

      JSON.stringify(dateRef.current.value) + "\n" +
      JSON.stringify(workStatusRef.current) + "\n" +

      JSON.stringify(brandRef.current.value) + "\n" +
      JSON.stringify(colorRef.current.value) + "\n" +
      JSON.stringify(capRef.current.value) + "\n" +
      JSON.stringify(licNumRef.current.value) + "\n" +

      JSON.stringify(isPublicRef.current.value) + "\n" +
      JSON.stringify(stationRef.current.stations())
    )

    let updated = stationRef.current.stations()
    let initial = initialStations

    for (let station of updated) {
      if (!(station.hasOwnProperty("time") && station["time"] != "" &&
        station.hasOwnProperty("id") && station["id"] >= 0)) {
        alert('There are some imcomplete station')
        return
      }
    }
    if (new Set(updated.map(station => station.time)).size != updated.length) {
      alert('Duplicate time !!!')
      return
    }
    if (new Set(updated.map(station => station.id)).size != updated.length) {
      alert("Duplicate station !!!")
      return
    }

    let intersec = updated.filter(station => {
      let match_id = initial.findIndex(s => s.id == station.id)
      let match_time = initial.findIndex(s => s.time == station.time)
      return ((match_id >= 0) && (match_id === match_time))
    })

    let added = updated.filter(station => (intersec.findIndex(s => (s.id == station.id)) == -1))
    let deleted = initial.filter(station => (intersec.findIndex(s => (s.id == station.id)) == -1))

    alert("Initial route: \n" +
      JSON.stringify(initial) + "\n" +
      "Intersec: \n" +
      JSON.stringify(intersec) + "\n" +
      "Added: \n" +
      JSON.stringify(added) + "\n" +
      "Deleted: \n" +
      JSON.stringify(deleted))

    // alert(JSON.stringify(stationRef.current.stations()))
    // alert(JSON.stringify(workStatusRef.current.value.current))
    // alert(JSON.stringify(stationRef.current.stations()))
    // alert(JSON.stringify(workStatusRef.current.value.current))
  }

  return (<div className="text-sm">

    <div className="text-center bg-white rounded-lg m-2 py-1 text-sm text-driver_dark">新 增 行 程</div>

    <div className="flex flex-row justify-between px-2 mx-2 my-4 text-gray_dark text-sm">
        <label htmlFor="date">日期：</label>
        <input type="date" id="date" className="rounded-lg w-44" defaultValue={route.date} ref={dateRef} />
        <RadioComponent
          list={[
            { id: 'on', text: "上班" },
            { id: 'off', text: "下班" }
          ]}
          defaultValue={route.workStatus ? 'on' : 'off'}
          onChange={(id) => (workStatusRef.current = id)}
          className="flex px-2 text-gray_dark rounded-lg bg-white peer-checked:bg-driver_dark peer-checked:text-white"
        />
    </div>

    <div className="flex justify-center">
      <button className="bg-driver_dark text-white rounded-lg m-1 px-2 py-1 text-xs">匯入歷史紀錄</button>
    </div>

    <hr className="m-4"></hr>

    <StationsComponent
      initialStations={initialStations}
      ref={stationRef}
      stataionList={stataionList}
    />

    <hr className="m-2"></hr>

    <div className="flex flex-row justify-between m-1 p-1">
      <div className="flex flex-row ">
        <label htmlFor="model" className="text-gray_dark">車款：</label>
        <input id="model" className="rounded-lg" size={14} ref={brandRef} defaultValue={route.carInfo.model} />
      </div>
      <div className="flex flex-row">
        <label htmlFor="license-plate-number" className="w-fit text-gray_dark">車牌：</label>
        <input id="license-plate-number" className="rounded-lg" size={10} ref={licNumRef} defaultValue={route.carInfo.licensePlateNumber} />
      </div>
    </div>

    <div className="flex flex-row justify-between m-1 p-1">
      <div>
        <label htmlFor="color" className="text-gray_dark">外觀顏色：</label>
        <input id="color" className="rounded-lg" size={10} ref={colorRef} defaultValue={route.carInfo.color} />
      </div>
      <div>
        <label htmlFor="max-passengers" className="w-fit text-gray_dark">共乘人數上限：</label>
        <input id="max-passengers" className="rounded-lg" size={3} ref={capRef} defaultValue={route.carInfo.capacity} />
      </div>
    </div>

    <div className="flex flex-row justify-begin m-1 p-1">
      <input type="checkbox" className="rounded-lg" id="enable-search" defaultChecked ref={isPublicRef} /> {/* defaultValue? */}
      <label htmlFor="enable-search" className="text-gray_dark">允許乘客搜尋</label>
    </div>

    <div className="flex justify-center">
      <button className="bg-white text-gray_dark rounded-lg m-2 px-2 py-1">取消</button>
      <button className="bg-driver_dark text-white rounded-lg m-2 px-2 py-1" onClick={handleSend}>確認</button>
    </div>

  </div>)
}