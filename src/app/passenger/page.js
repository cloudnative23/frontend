"use client";
import Route from './components/Route'
import {useEffect,useState,useRef} from "react";




export default function Passenger() {

  const [routes, setRoutes] = useState([])

  const example_route = {'driver':'可麗','year':2023,'month':11,'day':22,'start_time':'15:00','end_time':'16:45' ,'start':'台北車站','end':'台東車站'}
  const stations = ["車站0","車站1","車站2","車站3","車站4"]

  const [date,setDate] = useState(null)
  const [startStation,setStartStation] = useState(null)
  const [endStation,setEndStation] = useState(null)
  const [startTime,setStartTime] = useState(null)
  const [endTime,setEndTime] = useState(null)

  const DateInputRef = useRef(null)
  const StartStationRef = useRef(null)
  const EndStationRef = useRef(null)
  const StartTimeRef = useRef(null)
  const EndTimeRef = useRef(null)


  const handleDateChange = () => {
    setDate(new Date(DateInputRef.current.value));
  }
  const handleStartStationChange = () => {
    setStartStation(StartStationRef.current.value)
  }
  const handleEndStationChange = () => {
    setEndStation(EndStationRef.current.value)
  }
  const handleStartTimeChange = () => {
    setStartTime(StartTimeRef.current.value)
  }
  const handleEndTimeChange = () => {
    setEndTime(EndTimeRef.current.value)
  }
  
  useEffect(() => {
    if(date && startStation && endStation && startTime && endTime){
      console.log(date)
      console.log(parseInt(startStation) + 101)
      console.log(endStation)
      console.log(startTime)
      console.log(endTime)
  }
  }, [date,startStation,endStation,startTime,endTime]);

  return (
    <div className="relative bg-passenger w-mobile h-mobile flex flex-wrap justify-center space-y-0 border border-red-500"> 
      <div className="text-dark_o h-5">TSMC COMMUTING PASSENGER</div>

      <div className='bg-white text-dark_o flex items-center justify-center font-bold rounded-xl w-11/12 h-9'>尋 找 行 程</div>

      <div className='relative text-black text-center rounded-xl w-full h-5/6'>
        <div className='w-full h-9 flex items-center '>
          <p className=" ml-4 mr-2.5">日期</p>
          <input type="date" ref={DateInputRef} className="rounded-xl w-36 mr-4 text-black text-center bg-white" onChange={handleDateChange}/>
          {/* <button className="bg-white w-14 rounded-xl mr-2 hover:bg-dark_o hover:text-white">上班</button>
          <button className="bg-white  w-14 rounded-xl mr-2 hover:bg-dark_o hover:text-white">下班</button> */}
        </div>
        <div className='w-full h-9 flex items-center '>
          <p className="ml-4 mr-2.5">出發</p>
          <select ref={StartStationRef} className=" text-center rounded-xl w-44 mr-2" onChange={handleStartStationChange}>
            <option selected disabled hidden value={null}>請選擇起點</option>
            {stations.map((e,idx)=>{return <option value={idx}>{e}</option>})}
          </select>
          <input ref={StartTimeRef} type="time" className="rounded-xl" onChange={handleStartTimeChange}/>
        </div>
        <div className='w-full h-9 flex items-center '>
          <p className="ml-4 mr-2.5">抵達</p>
          <select ref={EndStationRef} className=" text-center rounded-xl w-44 mr-2" onChange={handleEndStationChange}>
            <option selected disabled hidden value={null}>請選擇終點</option>
            {stations.map((e,idx)=>{return <option value={idx}>{e}</option>})}
          </select>
          <input ref={EndTimeRef} type="time" className="rounded-xl" onChange={handleEndTimeChange}/>
        </div>
        <div className='flex text-dark_o font-bold ml-4 block'>現有行程搜尋結果</div>
        <div className="flex flex-wrap max-h-route_board overflow-y-auto h-full">
        {
          (routes.length == 0 )?<p className='w-full text-center font-bold'>無</p>:
          routes.map((e,idx)=>{
            return(
              <Route props={e}/>
            )
          })}
        </div>
        <button className="bg-black text-white hover:bg-blue-200 hover:text-black mr-4" onClick={()=>{setRoutes((ele)=>{let a=[];a.push(...ele);a.push(example_route);return a;})}}> Add Route </button>
        <button className="bg-black text-white hover:bg-blue-200 hover:text-black" onClick={()=>{setRoutes((ele)=>{let a=[];a.push(...ele);a.pop();return a;})}}> Delete Route </button> 
      </div>
    </div>
  );
}
