"use client"

import requests from './data'

import { getDate, getTime } from '../_components/date'
import HeaderBar from '../_components/headerComponnet'

function RequestComponent({ request, onAccept, onDeny }) {

    return (
        <>
            {/* <p>{JSON.stringify(request)}</p> */}
            <div className="m-2 p-2 rounded-lg bg-white">

                <div className="flex justify-begin w-full text-gray_dark items-center space-x-2">
                    <div>{getDate(request.route.date)}</div>
                    {
                        request.route.workStatus ?
                            <div className="rounded-3xl w-fit m-1 p-0.5 bg-go2work text-white text-sm">上班</div>
                            :
                            <div className="rounded-xl w-fit px-3 py-0.5 text-white text-sm bg-go2home">下班</div>
                    }
                </div>

                <div className="flex flex-col pl-3 py-2 space-y-2 text-gray_dark text-sm">
                    <div className='flex flex-row space-x-3 items-center'>
                        <div className='rounded-sm bg-go2work_light w-fit px-2 py-0.5 text-center'>上車</div>
                        <div>{getTime(request.route.stations.find(station => station.id == request.on.id).datetime)}</div>
                        <div>{request.route.stations.find(station => station.id == request.on.id).name}</div>
                    </div>
                    <div className='flex flex-row space-x-3 items-center'>
                        <div className='rounded-sm bg-go2home_light w-fit px-2 py-0.5 text-center'>下車</div>
                        <div>{getTime(request.route.stations.find(station => station.id == request.off.id).datetime)}</div>
                        <div>{request.route.stations.find(station => station.id == request.off.id).name}</div>
                    </div>

                    <div className='flex flex-row'>
                        <div className='flex flex-row space-x-2 items-center'>
                            <div className='text-driver_dark'>乘客</div>
                            <img className='rounded-full' src={request.route.driver.avatar} width={20} height={20} />
                            <div>{request.route.driver.name}</div>
                        </div>
                    </div>

                    <div className='flex flex-row justify-between items-end'>
                        <div className='text-[10px]/[10px]'>發送時間：{request.route.date}</div>
                        <div className='flex flex-row space-x-1'>
                            <button className="text-white rounded-xl px-4 bg-gray_dark" onClick={onDeny}>婉拒</button>
                            <button className="text-white rounded-xl px-4 bg-driver_dark" onClick={onAccept}>確認</button>
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}

export default function App(props) {
    return (<>
        <HeaderBar text={"乘 客 請 求 確 認"} />
        {

            requests.map((request, key) => (
                <RequestComponent key={key} request={request} onDeny={() => null} onAccept={() => null} />
            ))
        }
    </>)
}