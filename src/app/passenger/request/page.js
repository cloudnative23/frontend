"use client";
import Route from '../components/Route'
import {useEffect,useState,useRef} from "react";
import axios from 'axios';
import { useSearchParams } from 'next/navigation';


export default function RouteRequest( ) {

    const searchParams = useSearchParams()
    const props = JSON.parse(searchParams.get('info'))

    var date = new Date(props.date)
    const weekMap = ['一','二','三','四','五','六','日']

    const [workStatus,setWorkStatus] = useState(true)

    var crossDay = false
    if(props.on.datetime.slice(8,10) != props.off.datetime.slice(8,10))
        crossDay = true

    return (
        <div className="relative bg-passenger w-mobile h-mobile flex flex-wrap justify-center space-y-0 border border-red-500"> 
            <div className="text-dark_o h-5">TSMC COMMUTING PASSENGER</div>
            <div className='bg-white text-dark_o flex items-center justify-center font-bold rounded-xl w-11/12 h-9'>請 求 確 認</div>
            <div className='relative text-black text-center rounded-xl w-full h-5/6'>
                <div className='h-14 flex items-center'>
                    <p className='text-dark_o ml-4'>{date.getFullYear()} / {date.getMonth() + 1} / {date.getDate()} ({weekMap[date.getDay()]})</p>
                    <button className={(workStatus?'bg-dark_o text-white':'bg-white')+" w-12 rounded-xl ml-auto hover:bg-dark_o hover:text-white"} onClick={()=>{setWorkStatus(true)}}>上班</button>
                    <button className={(workStatus?'bg-white':'bg-dark_o text-white')+" w-12 rounded-xl ml-2 mr-4 hover:bg-dark_o hover:text-white"} onClick={()=>{setWorkStatus(false)}}>下班</button>
                </div>
                <div className="h-auto">
                    <p className="flex text-dark_o font-bold ml-3.5">路線資訊</p>
                    <div className="h-32 bg-white mx-3.5 mt-2 rounded-xl">
                        <div className='invisible'> invisible block </div>
                        <div className="flex">
                            <p className="bg-lime-400 text-black w-9 ml-4">上車</p>
                            <p className='w-24 ml-1'> {props.on.datetime.slice(-5)} </p>
                            <p className='w-auto ml-4'> {props.on.name} </p>
                        </div>
                        <div className="flex mt-2.5">
                            <p className="bg-red-400 text-black w-9 ml-4">下車</p>
                            <p className='w-24 ml-1'> {props.off.datetime.slice(-5)} {crossDay?'(跨日)':''}</p> 
                            <p className='w-auto ml-4'> {props.off.name}</p>
                        </div>
                        <p className="text-dark_o flex mt-4 mb-1 ml-4 text-sm font-bold hover:cursor-pointer" onClick={()=>{console.log('hey')}}>展開所有停靠站</p>
                    </div>
                </div>
                <div className='h-auto'>
                    <p className="flex text-dark_o font-bold ml-3.5 mt-4">司機和車輛資訊</p>
                    <div className="h-32 bg-white mx-3.5 mt-2 rounded-xl">
                        <div className="h-4 invisible">invisible block</div>
                        <div className='flex'>
                            <p className="flex text-black ml-4 w-28">司機</p>
                            <div className="overflow-hidden rounded-full w-6 h-6"><img src={props.driver.avatar} className="w-full h-full"/></div> 
                            <p className="text-black ml-2">{props.driver.name}</p>
                        </div>
                        <div className='flex mt-2.5'>
                            <p className='flex ml-4 w-28'>可共乘人數</p>
                            <p>{props.carInfo.capacity}</p>
                        </div>
                        <div className='flex mt-2.5'>
                            <p className='flex ml-4 w-28'>顏色</p>
                            <p>{props.carInfo.color}</p>
                        </div>
                    </div>
                </div>
                <div className='flex justify-center mt-10'>
                    <button className='bg-dark_o text-white float-right rounded-2xl text-sm w-28 h-8'>發送共乘請求</button>
                </div>
            </div>
        </div>
    );
}
