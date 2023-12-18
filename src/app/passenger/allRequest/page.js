"use client";
import Request from '../components/Request'
import {useEffect,useState,useRef} from "react";
import axios from 'axios';
import Swal from "sweetalert2";


export default function Passenger() {

 

  const [routes, setRoutes] = useState([])

  

  const [message,setMessage] = useState('')

 

  const [onStation,setOnStation] = useState(null)
  const [offStation,setOffStation] = useState(null)

  const [myRequest,setMyRequest] = useState([])
  
  

  const getMyRequest = async() =>{
    const options = {
      method: 'GET',
      url:  `${process.env.NEXT_PUBLIC_API_ROOT}/requests`,
      params: {mode: 'me', n: '3','order-mode': 'asc'},
      headers: {Accept: 'application/json'},
      withCredentials: true,
    };
    
    try {
      const { data } = await axios.request(options);
      let req = []
      console.log(data)
      for(let i = 0;i < data.length;i++){
        req.push(data[i])
      }
      setMyRequest(req)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(()=>{getMyRequest();}
  , [])

  

  return (
    <div className="relative bg-passenger h-full flex flex-wrap justify-center space-y-0"> 
        {/* <button className="bg-black text-white hover:bg-blue-200 hover:text-black mr-4 h-5" onClick={()=>{setRoutes((ele)=>{let a=[];a.push(...ele);a.push(example_route);return a;})}}> Add Route </button>
        <button className="bg-black text-white hover:bg-blue-200 hover:text-black mr-4 h-5" onClick={()=>{setRoutes((ele)=>{let a=[];a.push(...ele);a.push(example_route2);return a;})}}> Add Route2 </button>
        <button className="bg-black text-white hover:bg-blue-200 hover:text-black h-5" onClick={()=>{setRoutes((ele)=>{let a=[];a.push(...ele);a.pop();return a;})}}> Delete Route </button>  */}
      <div className='bg-white text-dark_o flex items-center justify-center font-bold rounded-xl w-11/12 h-9'>請 求 列 表</div>
      <div className="flex flex-wrap  overflow-y-auto h-5/6">
        {
          (myRequest.length == 0 )?<div className='h-full w-full flex items-center justify-center'><p className='w-full text-center font-bold'>無任何請求</p></div>:
          myRequest.map((e,idx)=>{
            return(
              <Request props={e}/>
            )
          })}
      </div>
    
    </div>
  );
}
