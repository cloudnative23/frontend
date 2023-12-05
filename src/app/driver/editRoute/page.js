"use client";

import { useRef } from "react";

import routes from './data'
import StationsComponent from "../components/stationComponet";
import RadioComponent from "../components/radioComponents";

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
  const workStatusRef = useRef(null)
  
  const brandRef = useRef(null)
  const colorRef = useRef(null)
  const capRef = useRef(null)
  const licNumRef = useRef(null)

  const isPublicRef = useRef(null)

  const stationRef = useRef(null)

  function handleSend() {

    alert(

      JSON.stringify(dateRef.current.value) + "\n" +
      JSON.stringify(workStatusRef.current) + "\n" +
      
      JSON.stringify(brandRef.current.value) + "\n" +
      JSON.stringify(colorRef.current.value) + "\n" +
      JSON.stringify(capRef.current.value) + "\n" +
      JSON.stringify(licNumRef.current.value) + "\n" +

      JSON.stringify(isPublicRef.current.value) +  "\n" +
      JSON.stringify(stationRef.current.stations())
    )

    let updated = stationRef.current.stations()
    let initial = route.stations

    updated.forEach(station => {
      if(!(
        station.hasOwnProperty("time") && station["time"] != "" &&
        station.hasOwnProperty("id") && station["id"] >= 0)) {
        alert('There are some imcomplete station')
        // TODO: halt
        return;
      } else if (updated.findIndex(s => (s.time == station.time) && (s.key != station.key)) >= 0) {
        alert('Duplicate time !!!')
        // TODO: halt
        return;
      } else if (updated.findIndex(s => (s.id == station.id) && (s.key != station.key)) >= 0) {
        alert('Duplicate station !!!')
        // TODO: halt
        return;
      }
    })


    let intersec = updated.filter(station => {
      let match_id = initial.findIndex(s => s.id == station.id)
      let match_time = initial.findIndex(s => s.time == station.time)
      return ((match_id >= 0) && (match_id === match_time))
    })

    let added   = updated.filter(station => (intersec.findIndex(s => (s.id == station.id)) != -1))
    let deleted = initial.filter(station => (intersec.findIndex(s => (s.id == station.id)) != -1))
    alert("Initial route: \n" + 
    JSON.stringify(initial) + "\n" +
    "Intersec: \n" +
    JSON.stringify(intersec))

    // alert(JSON.stringify(stationRef.current.stations()))
    // alert(JSON.stringify(workStatusRef.current.value.current))
    // alert(JSON.stringify(stationRef.current.stations()))
    // alert(JSON.stringify(workStatusRef.current.value.current))
  }

  return (<>

      <div className="text-center bg-white rounded-lg m-2">新增行程</div>

      <div className="flex flex-row justify-between items-center px-2">
        <div className="h-fit">
          <label htmlFor="date">日期：</label>
          <input type="date" id="date" className="rounded-lg" defaultValue={route.date} ref={dateRef}/>
        </div>
        <div className='flex flex-row w-max'>
          <RadioComponent 
            list={[
              {id: 'on', text: "上班"}, 
              {id: 'off', text: "下班"}
            ]}
            defaultValue={route.workStatus ? 'on' : 'off'}
            onChange={(id) => (workStatusRef.current = id)} />
        </div>
      </div>
            
      <div className="flex justify-center">
        <button className="bg-driver_dark text-white rounded-lg m-2 px-2 py-1">匯入歷史紀錄</button>
      </div>

      <hr className="m-2"></hr>

      <StationsComponent 
        initialStations={route.stations}
        ref={stationRef}
        stataionList={stataionList}
      />

      <hr className="m-2"></hr>
      
      <div className="flex flex-row justify-between m-1 p-1">
        <div className="flex flex-row ">
          <label htmlFor="model" className="text-gray_dark">車款：</label>
          <input id="model" className="rounded-lg" size={14} ref={brandRef} defaultValue={route.carInfo.model}/>
        </div>
        <div className="flex flex-row">
          <label htmlFor="license-plate-number" className="w-fit text-gray_dark">車牌：</label>
          <input id="license-plate-number" className="rounded-lg" size={10} ref={licNumRef} defaultValue={route.carInfo.licensePlateNumber}/>
        </div>
      </div>

      <div className="flex flex-row justify-between m-1 p-1">
        <div>
          <label htmlFor="color" className="text-gray_dark">外觀顏色：</label>
          <input id="color" className="rounded-lg" size={10} ref={colorRef} defaultValue={route.carInfo.color}/>
        </div>
        <div>
          <label htmlFor="max-passengers" className="w-fit text-gray_dark">共乘人數上限：</label>
          <input id="max-passengers" className="rounded-lg" size={3} ref={capRef} defaultValue={route.carInfo.capacity}/>
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

  </>)
}