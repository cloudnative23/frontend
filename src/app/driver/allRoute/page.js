'use client'

import { useState } from "react";
import allRoute from "./data";
import RadioComponent from "../_components/radioComponents"
import { getTime, getDate } from "../_components/date"

function Route({ route }) {

    return (<>
        <div className={"m-2 p-3 rounded-lg text-xs " + (route.workStatus ? "bg-[#FAFFFB]" : "bg-[#FFFBFB]")}>
            <div className="flex justify-between">
                <div>{getDate(route.date)}</div>
                <div>M</div>
            </div>
            <div className="flex justify-begin space-x-1 my-2">
                {
                    route.workStatus ?
                        <div className="rounded-xl px-2 bg-go2work text-white">上班</div>
                        :
                        <div className="rounded-xl px-2 bg-go2home text-white">下班</div>
                }
                <div className="rounded-3xl w-fit px-2 bg-driver_dark text-white">{route.passengers.length} / {route.carInfo.capacity}人</div>
            </div>
            <div className="grid grid-cols-[40%_60%]">
                {
                    route.stations.map((station) =>
                    (<>
                        <div>{getTime(station.datetime)}</div>
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

    const [filter, setFilter] = useState('all')

    function handleFilterChange(id) {
        switch (id) {
            case 'all':
            case 'to-work':
            case 'to-home':
            case 'pass-avalible':
                setFilter(id)
                break
            default:
                alert('bug')
                break;
        }
    }

    return (<>

        <div className='flex flex-row space-x-1 m-2'>
            <RadioComponent
                list={[
                    { id: "all", text: "全部" },
                    { id: "to-work", text: "上班" },
                    { id: "to-home", text: "下班" },
                    { id: "pass-avalible", text: "乘客未滿" },
                ]}
                defaultValue={'all'}
                onChange={(id) => (handleFilterChange(id))}
                className='flex justify-between px-3 text-sm text-gray_dark bg-white rounded-xl peer-checked:bg-driver_dark peer-checked:text-white'
            />
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