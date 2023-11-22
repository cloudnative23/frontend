"use client";

import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { MdModeEdit } from "react-icons/md";

import { AiFillDelete, AiOutlineCheck } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";

const stataions = [
  { id: 0, name: "台北車站" },
  { id: 1, name: "忠孝新生" },
  { id: 2, name: "忠孝復興" },
  { id: 3, name: "市政府" },
  { id: 4, name: "南港" }
];

function Station({ state, onUpdate, onDelete }) {

  let [isEditing, setIsEditing] = useState(state.isNewState)

  let timeRef = useRef(null)
  let stationRef = useRef(null)

  function handleEditComplete() {
    onUpdate({
      ...state,
      time: timeRef.current.value,
      station: Number(stationRef.current.value),
    }) && setIsEditing(false)
  }

  function handleEditCancel() {
    timeRef.current.value = state.time
    stationRef.current.value = state.station
    setIsEditing(false)
  }

  function handleEdit() {
    setIsEditing(true)
  }

  function handleDelete() {
    onDelete(state)
  }

  useEffect(() => {
    if (!isEditing) {
      timeRef.current.value = state.time
      stationRef.current.value = state.station
    }
  })

  return (
    <div className="flex flex-row justify-between">
      {/* <p>{JSON.stringify(state)}</p> */}
      <input type="time" defaultValue={state.time} ref={timeRef} disabled={!isEditing} />
      <select defaultValue={state.station} ref={stationRef} disabled={!isEditing} className="">
        {stataions.map((station) => (
          <option value={station.id} key={station.id}>
            {station.name}
          </option>
        ))}
      </select>
      <div className="w-10">
        {
          isEditing === true ?
            <>
              <button onClick={handleEditComplete}><AiOutlineCheck /></button>
              <button onClick={state.isNewState ? handleDelete : handleEditCancel}><AiOutlineClose /></button>
            </> :
            <>
              <button onClick={handleEdit} disabled={state.hasPassenger}><AiFillEdit/></button>
              <button onClick={handleDelete}><AiFillDelete /></button>
            </>
        }
      </div>

    </div>
  );
}

function cmp(lhs, rhs) {
  if (lhs.isNewState !== rhs.isNewState)
    return lhs.isNewState < rhs.isNewState
  else
    return lhs.time > rhs.time ? 1 : -1
}

function RouteComponent({ initialRoute }) {

  initialRoute = initialRoute.map((station, id) => { return { ...station, id: id, isNewState: false } })
  const [route, setRoute] = useState(initialRoute)
  const idRef = useRef(initialRoute.length)

  function handleUpdate(updatedStation) {
    // check valid of updatedStation
    setRoute((prevRoute) => prevRoute.map((station) => (station.id === updatedStation.id ? { ...updatedStation, isNewState: false } : station)).sort(cmp))
    return true
  }

  function handleDelete(deletedStation) {
    if (!deletedStation.isNewState) {
      // delete the station on the backend
    }
    setRoute((prevRoute) => prevRoute.filter((station) => (station.id === deletedStation.id ? false : true)))
  }

  function handleCreate() {
    setRoute((prevRoute) => [...prevRoute, { time: "12:00", station: 0, hasPassenger: false, isNewState: true, id: idRef.current }])
    idRef.current++
  }

  return (
    <>
      {route.map((station) => (
        <div key={station.id} className="rounded-lg bg-white m-2">
          <Station
            state={station}
            onUpdate={(station) => handleUpdate(station)}
            onDelete={(station) => handleDelete(station)}
          />
        </div>
      ))}

      <div className="flex justify-center items-center">
        <button onClick={() => (handleCreate())} className="bg-[#5284CF] text-white rounded-lg m-2 px-2 py-1">加入新路線</button>
      </div>
    </>
  );
}

export default function App(props) {
  const route = [
    { time: "12:00", station: 0, hasPassenger: true },
    { time: "13:00", station: 1, hasPassenger: false },
    { time: "14:00", station: 2, hasPassenger: false },
    { time: "15:00", station: 3, hasPassenger: false },
    { time: "16:00", station: 4, hasPassenger: false }
  ];

  return (
    <div className="bg-[#EEF6F9]">

      <div className="text-center bg-white rounded-lg m-2">新增行程</div>

      <div className="flex flex-row justify-between items-center px-2">

        <div className="h-fit">
          <label htmlFor="date">日期：</label>
          <input type="date" id="date" />
        </div>

        <div className='flex flex-row w-max'>
          <div>
            <input
              type='radio'
              id='to-work'
              name='hosting'
              className='hidden peer'
              required=''
              defaultChecked
            />
            <label
              htmlFor='to-work'
              className='flex justify-between mx-1 p-1 text-gray-500 bg-white rounded-lg peer-checked:bg-[#5284CF] peer-checked:text-white'
            >
              <div>上班</div>
            </label>
          </div>
          <div>
            <input
              type='radio'
              id='to-home'
              name='hosting'
              className='hidden peer'
              required=''
            />
            <label
              htmlFor='to-home'
              className='flex justify-between mx-1 p-1 text-gray-500 bg-white rounded-lg peer-checked:bg-[#5284CF] peer-checked:text-white'
            >
              <div>下班</div>
            </label>
          </div>
        </div>

        {/* <div className="flex flex-row content-center">
          <div className="flex items-center px-2 rounded bg-[#5284CF] text-white py-0.5 m-0.5">
            <input
              defaultChecked=""
              id="bordered-radio-2"
              type="radio"
              defaultValue=""
              name="bordered-radio"
              className=""
            />
            <label
              htmlFor="bordered-radio-2"
              className="text-white"
            >
              上班
            </label>
          </div>

          <div className="flex items-center px-2 rounded bg-[#5284CF] text-white py-0.5 m-0.5">
            <input
              defaultChecked=""
              id="bordered-radio-2"
              type="radio"
              defaultValue=""
              name="bordered-radio"
              className=""
            />
            <label
              htmlFor="bordered-radio-2"
              className="text-white"
            >
              下班
            </label>
          </div>
        </div> */}


      </div>
      <hr className="m-2"></hr>
      <div className="flex justify-center">
        <button className="bg-[#5284CF] text-white rounded-lg m-2 px-2 py-1">匯入歷史紀錄</button>
      </div>
      <RouteComponent initialRoute={route} />
      <hr className="m-2"></hr>
      <div className="flex flex-row justify-between m-1 p-1">
        <div className="flex flex-row ">
          <label htmlFor="model">車款：</label>
          <input id="model" size={14} />
        </div>
        <div className="flex flex-row">
          <label htmlFor="license-plate-number" className="w-fit">車牌：</label>
          <input id="license-plate-number" size={10} />
        </div>
      </div>
      <div className="flex flex-row justify-between m-1 p-1">
        <div>
          <label htmlFor="color">外觀顏色：</label>
          <input id="color" size={10} />
        </div>
        <div>
          <label htmlFor="max-passengers" className="w-fit">共乘人數上限：</label>
          <input id="max-passengers" size={3} />
        </div>
      </div>
      <div className="flex flex-row justify-begin m-1 p-1">
        <input type="checkbox" id="enable-search" defaultChecked />
        <label htmlFor="enable-search">允許乘客搜尋</label>
      </div>

      <div className="flex justify-center">
        <button className="bg-white text-[#757575] rounded-lg m-2 px-2 py-1">取消</button>
        <button className="bg-[#5284CF] text-white rounded-lg m-2 px-2 py-1">確認</button>
      </div>

    </div>
  );
}

// export default function Login() {
//     return (
//       <>
//         <p>This is Login!</p>
//       </>
//     );
// }  