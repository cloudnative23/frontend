"use client";
import Route from './components/Route'
import {useEffect,useState,useRef} from "react";
import axios from 'axios';



// useEffect(async() => {
//   const options = {
//     method: 'GET',
//     url: 'https://www.cloudnative23.com/api/stations',
//     headers: {Accept: 'application/json'}
//   };
  
//   try {
//     const { data } = await axios.request(options);
//     console.log(data);
//   } catch (error) {
//     console.error(error);
//   }
// }, [])
const options2 = {
  method: 'GET',
  url: 'https://api-dev.cloudnative23.com/stations',
  headers: {Accept: 'application/json'}
};



const options = {
  method: 'POST',
  url: 'https://api-dev.cloudnative23.com/login',
  headers: {'Content-Type': 'application/json', Accept: 'application/json'},
  data: {email: 'user1@example.com', password: 'pa$$word'}
};



export default function Passenger() {

  const [routes, setRoutes] = useState([])

  const example_route = {'id':0,'workStatus':true,'status':'available','date':'2023-10-20','stations':[{'id':0,'name':'台北車站','datetime':'2023-10-22T22:30','on':[],'off':[]},{'id':1,'name':'台北地下鐵','datetime':'2023-10-22T23:40','on':[],'off':[]},{'id':2,'name':'捷運公館站','datetime':'2023-10-23T01:40','on':[],'off':[]},{'id':3,'name':'龜山','datetime':'2023-10-23T02:15','on':[],'off':[]},{'id':4,'name':'台積電本部','datetime':'2023-10-23T03:40','on':[],'off':[]}],'passengers':[],'driver':{"id":10,"name":"John James","avatar":"https://i.ibb.co/r49x9Kb/kirbohappy.png","phone":912123456},'carInfo':{"color":"紅色","capacity":3,"licensePlateNumber":"ABC-0123"}}
  const example_route2 = {'id':1,'workStatus':true,'status':'available','date':'2023-10-20','stations':[{'id':0,'name':'台北車站','datetime':'2023-10-22T11:30','on':[],'off':[]},{'id':1,'name':'台北地下鐵','datetime':'2023-10-22T12:40','on':[],'off':[]},{'id':2,'name':'捷運公館站','datetime':'2023-10-22T13:40','on':[],'off':[]},{'id':3,'name':'龜山','datetime':'2023-10-22T14:15','on':[],'off':[]},{'id':4,'name':'台積電本部','datetime':'2023-10-22T15:40','on':[],'off':[]}],'passengers':[],'driver':{"id":10,"name":"提達斯","avatar":"https://i.ibb.co/94Qs1WR/FCVWD5-XMAYa46b.jpg","phone":912123456},'carInfo':{"color":"白色","capacity":2,"licensePlateNumber":"ABC-0123"}}
  const stations = ["台北車站","台北地下鐵","捷運公館站","龜山","台積電本部"]

  const [date,setDate] = useState(null)
  const [startStation,setStartStation] = useState(null)
  const [endStation,setEndStation] = useState(null)
  const [startTime,setStartTime] = useState(null)
  const [endTime,setEndTime] = useState(null)
  const [crossDay,setCrossDay] = useState(false)

  const DateInputRef = useRef(null)
  const StartStationRef = useRef(null)
  const EndStationRef = useRef(null)
  const StartTimeRef = useRef(null)
  const EndTimeRef = useRef(null)


  const handleDateChange = () => {
    setDate(new Date(DateInputRef.current.value));
  }
  const handleStartStationChange = () => {
    setStartStation(parseInt(StartStationRef.current.value))
  }
  const handleEndStationChange = () => {
    setEndStation(parseInt(EndStationRef.current.value))
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
          <p className=" ml-3.5 mr-2.5">日期</p>
          <input type="date" ref={DateInputRef} className="rounded-xl w-36 mr-4 text-black text-center bg-white" onChange={handleDateChange}/>
          <button className={(crossDay?'bg-white':'bg-dark_o text-white')+" w-16 rounded-xl mr-2 hover:bg-dark_o hover:text-white"} onClick={()=>{setCrossDay(false)}}>未跨日</button>
          <button className={(crossDay?'bg-dark_o text-white':'bg-white')+" w-16 rounded-xl hover:bg-dark_o hover:text-white"} onClick={()=>{setCrossDay(true)}}>跨日</button>
        </div>
        <div className='w-full h-9 flex items-center '>
          <p className="ml-3.5 mr-2.5">出發</p>
          <select ref={StartStationRef} className=" text-center rounded-xl w-44 mr-2" onChange={handleStartStationChange}>
            <option selected disabled hidden value={null}>請選擇起點</option>
            {stations.map((e,idx)=>{return <option value={idx}>{e}</option>})}
          </select>
          <input ref={StartTimeRef} type="time" className="rounded-xl" onChange={handleStartTimeChange}/>
        </div>
        <div className='w-full h-9 flex items-center '>
          <p className="ml-3.5 mr-2.5">抵達</p>
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
              <Route props={e} startStation={startStation} endStation={endStation}/>
            )
          })}
        </div>
        <button className="bg-black text-white hover:bg-blue-200 hover:text-black mr-4" onClick={()=>{setRoutes((ele)=>{let a=[];a.push(...ele);a.push(example_route);return a;})}}> Add Route </button>
        <button className="bg-black text-white hover:bg-blue-200 hover:text-black mr-4" onClick={()=>{setRoutes((ele)=>{let a=[];a.push(...ele);a.push(example_route2);return a;})}}> Add Route2 </button>
        <button className="bg-black text-white hover:bg-blue-200 hover:text-black" onClick={()=>{setRoutes((ele)=>{let a=[];a.push(...ele);a.pop();return a;})}}> Delete Route </button> 
        <button className="bg-black text-white hover:bg-blue-200 hover:text-black ml-4" onClick={async()=>{try {
  const { data } = await axios.request(options);
  console.log(data);
} catch (error) {
  console.error(error);
}}}>Login</button>
<button className="bg-black text-white hover:bg-blue-200 hover:text-black ml-4" onClick={async()=>{try {
  const { data } = await axios.request(options2);
  console.log(data);
} catch (error) {
  console.error(error);
}}}>Stations</button>
      </div>
    </div>
  );
}
