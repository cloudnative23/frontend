'use client'

import { useState } from "react";
import allRoute from "./data";

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

    return (
        <div className="bg-[#EEF6F9]">
            <div className="m-2 p-2 rounded-lg bg-[#FAFFFB]">
                <div className="flex justify-between w-full">
                    <div>{getDate(route)}</div>
                    <div>M</div>
                </div>
                <div className="flex justify-begin w-full">
                    {
                        route.workStatus ?
                            <div className="rounded-3xl w-fit m-1 p-0.5 bg-[#57A368] text-white">上班</div>
                            :
                            <div className="rounded-3xl w-fit m-1 p-0.5 bg-[#DC7272] text-white">下班</div>
                    }
                    <div className="rounded-3xl w-fit m-1 p-0.5 bg-[#5284CF] text-white">{route.passengers.length}/{route.carInfo.capacity}人</div>
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
        </div>
    )
}

function RadioButton({ id, text, onChecked }) {

    return (<div>
        <input
            type='radio'
            id={id}
            name='hosting'
            className='hidden peer'
            required=''
            onChange={event => onChecked(id)}
        />
        <label
            htmlFor={id}
            className='flex justify-between mx-1 p-1 text-gray-500 bg-white rounded-lg peer-checked:bg-[#5284CF] peer-checked:text-white'
        >
            <div>{text}</div>
        </label>
    </div>
    )
}

export default function App() {

    // let allRoute = allRoute;

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

        <div className='flex flex-row w-max'>
            <RadioButton id="all" text="全部" onChecked={handleFilterChange}/>
            <RadioButton id="to-work" text="上班" onChecked={handleFilterChange}/>
            <RadioButton id="to-home" text="下班" onChecked={handleFilterChange}/>
            <RadioButton id="pass-avalible" text="乘客未滿" onChecked={handleFilterChange}/>
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