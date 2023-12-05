'use client'

import { useState } from "react";
import allRoute from "./data";
import RadioComponent from "../components/radioComponents"

const digitToChinese = ["日", "ㄧ", "二", "三", "四", "五", "六"]

function Route({ route }) {

    function getDate(route) {
        let d = new Date(route.date)
        return `${d.getUTCMonth() + 1}月${d.getUTCDate() + 1}日（${digitToChinese[d.getDay()]}）`
    }

    function getTime(station) {
        let d = new Date(station.datetime)
        return `${d.getHours()}:${d.getMinutes()}`
    }

    return (<>
            <div className="m-2 p-2 rounded-lg bg-[#FAFFFB]">
                <div className="flex justify-between w-full">
                    <div>{getDate(route)}</div>
                    <div>M</div>
                </div>
                <div className="flex justify-begin w-full">
                    {
                        route.workStatus ?
                            <div className="rounded-3xl w-fit m-1 p-0.5 bg-go2work text-white">上班</div>
                            :
                            <div className="rounded-3xl w-fit m-1 p-0.5 bg-go2home text-white">下班</div>
                    }
                    <div className="rounded-3xl w-fit m-1 p-0.5 bg-driver_dark text-white">{route.passengers.length}/{route.carInfo.capacity}人</div>
                </div>
                <div className="grid grid-cols-[30%_70%]">
                    {
                        route.stations.map((station) =>
                        (<>
                            <div>{getTime(station)}</div>
                            <div>{station.name}</div>
                        </>)
                        )
                    }
                </div>

            </div>
        </>
    )
}

export default function App() {

    const [filter, setFiler] = useState('all')

    function handleFilterChange(id) {
        switch (id) {
            case 'all':
            case 'to-work':
            case 'to-home':
            case 'pass-avalible':
                setFiler(id)
                break
            default:
                alert('bug')
                break;
        }
    }

    return (<>

        <div className='flex flex-row space-x-0.5 m-1'>
            <RadioComponent
                list={[
                    {id: "all", text: "全部"},
                    {id: "to-work", text: "上班"},
                    {id: "to-home", text: "下班"},
                    {id: "pass-avalible", text: "乘客未滿"},
                ]}
                defaultValue={'all'}
                onChange={(id) => (handleFilterChange(id))} />
        </div>

        <div className="grid grid-cols-2 w-full">
            {
                allRoute.filter(route => {
                    switch (filter) {
                        case 'all':
                            return true
                        case 'to-work':
                            return route.workStatus
                        case 'to-home':
                            return !route.workStatus
                        case 'pass-avalible':
                            return route.carInfo.capacity > route.passengers.length
                    }
                }).map((route) => <Route key={route.id} route={route} />)
            }
        </div>
    </>)
}