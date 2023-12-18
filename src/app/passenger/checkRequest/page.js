"use client";
import Route from '../components/Route'
import {useEffect,useState,useRef} from "react";
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import Swal from "sweetalert2";
import { useRouter } from 'next/navigation';




export default function RouteRequest( ) {

    const searchParams = useSearchParams()
    const props = JSON.parse(searchParams.get('info'))
    var date = new Date(props['route'].date)
    const weekMap = ['一','二','三','四','五','六','日']

    var timestamp = new Date(props.timestamp)
   
    const [showStations,setShowStations] = useState(false)

    const statusMap = {'new':'請求已送出，等待回復','accepted':'請求已被接受','denied':'請求已被拒絕','expired':'請求已過期','deleted':'請求已刪除','canceled':'請求已取消'}



    const router = useRouter();
    const send_delete_request = async()=>{
       
        const delete_request_op = {
            method: 'DELETE',
            url: `${process.env.NEXT_PUBLIC_API_ROOT}/requests/${props.id}`,
            headers: {'Content-Type': 'application/json', Accept: 'application/json'},
            withCredentials: true,
          };
          
          try {
            const { data } = await axios.request(delete_request_op);
            console.log(data);
            Swal.fire({
                icon: "success",
                title: "Done",
                text: "已成功刪除請求",
              });
            router.push('/passenger')
          } catch (error) {
            console.error(error);
          }
    }


    return (
        <div className="relative bg-passenger h-full flex flex-wrap justify-center space-y-0"> 
            <div className='bg-white text-dark_o flex items-center justify-center font-bold rounded-xl w-11/12 h-9'>請 求 確 認</div>
            <div className='relative text-black text-center rounded-xl w-full h-full border'>
                <div className='h-14 flex items-center'>
                    <p className='text-dark_o ml-4'>{date.getFullYear()} / {date.getMonth() + 1} / {date.getDate()} ({weekMap[date.getDay()]})</p>
                    <div className='text-dark_o  font-bold ml-2'>{props.workStatus?'上班':'下班'}</div>
                </div>
                <div className="h-auto">
                    <p className="flex text-dark_o font-bold ml-3.5">路線資訊</p>
                    {/* <div className={(showStations?"h-auto":"h-32") +  " bg-white mx-3.5 mt-2 rounded-xl"}> */}
                    <div className={"h-auto bg-white mx-3.5 mt-2 rounded-xl pt-2"}>
                        {showStations?(
                        <>
                            <div className="flex flex-wrap  h-24 overflow-y-auto">
                                    {props['route'].stations.map((e,idx)=>{return (
                                    <>
                                        <div className='flex w-full h-2/6 items-center'>
                                            <p className={((e.id == props['on-station'].id)?"bg-lime-400":(e.id == props['off-station'].id)?"bg-red-400":"invisible") + " text-black w-9 ml-4"}>{(e.id == props['on-station'].id)?"上車":"下車"}</p>
                                            <p className='ml-2'>{e.datetime.slice(-8,-3)}</p>
                                            <p className='ml-2'>{e.name}</p>
                                        </div>
                                    </>)})}
                            </div>
                            <p className="text-dark_o flex mt-4 mb-1 ml-4 text-sm font-bold hover:cursor-pointer" onClick={()=>{setShowStations(false)}}>顯示較少</p>
                        </>):(
                        <>
                            <div className="flex">
                                <p className="bg-lime-400 text-black w-9 ml-4">上車</p>
                                <p className='w-24 ml-1'> {props['on-station'].datetime.slice(-8,-3)} </p>
                                <p className='w-auto ml-4'> {props['on-station'].name} </p>
                            </div>
                            <div className="flex mt-2.5">
                                <p className="bg-red-400 text-black w-9 ml-4">下車</p>
                                <p className='w-24 ml-1'> {props['off-station'].datetime.slice(-8,-3)} </p>
                                <p className='w-auto ml-4'> {props['off-station'].name}</p>
                            </div>
                            <p className="text-dark_o flex mt-4 mb-1 ml-4 text-sm font-bold hover:cursor-pointer" onClick={()=>{setShowStations(true)}}>展開所有停靠站</p>
                        </>)}
                        
                    </div>
                </div>
                <div className='h-auto relative'>
                    <p className="flex text-dark_o font-bold ml-3.5 mt-4">司機和車輛資訊</p>
                    <div className="h-auto bg-white mx-3.5 mt-2 rounded-xl">
                        <div className='flex'>
                            <p className="flex text-black ml-4 w-28">司機</p>
                            <div className="overflow-hidden rounded-full w-6 h-6"><img src={props['route'].driver.avatar} className="w-full h-full"/></div> 
                            <p className="text-black ml-2">{props['route'].driver.name}</p>
                        </div>
                        <div className='flex mt-2.5'>
                            <p className='flex ml-4 w-28'>可共乘人數</p>
                            <p>{props['route'].carInfo.capacity}</p>
                        </div>
                        {/* <div className='flex mt-2.5'>
                            <p className='flex ml-4 w-28'>顏色</p>
                            <p>{props['route'].carInfo.color}</p>
                        </div> */}
                        <div className='flex mt-2.5'>
                            <p className='flex ml-4 w-28'>車牌</p>
                            <p>{props['route'].carInfo.licensePlateNumber}</p>
                        </div>
                        
                    </div>
                </div>
                <div>
                  <p className="flex text-dark_o font-bold ml-3.5 mt-4">狀態</p>
                  <div className="h-auto bg-white mx-3.5 mt-2 rounded-xl py-2">
                    <p className="text-slate-600 font-bold text-base text-left ml-4">{statusMap[props.status]}</p>
                    <p className='text-xs text-left ml-4'>發送時間: {timestamp.getFullYear()}/{timestamp.getMonth() + 1}/{timestamp.getDate()} {timestamp.getHours()}:{timestamp.getMinutes()}:{timestamp.getSeconds()}</p>
                  </div>
                </div>
                {(props.status == 'new')?<button onClick={send_delete_request} className='mt-4 w-28 bg-rose-400 rounded-xl text-white text-sm font-bold'>取消共乘請求</button>:<></>}
            </div>
        </div>
    );
}
