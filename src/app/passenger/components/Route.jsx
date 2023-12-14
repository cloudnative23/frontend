import Link from "next/link";


export default function Route({props,startStation,endStation}) {
    console.log('hello')
    console.log(props)
    const weekMap = ['一','二','三','四','五','六','日']
    
    var on = null
    var off = null
    for(var i =0;i < props.stations.length;i++){
        if(props.stations[i].id == startStation)
            on = props.stations[i]
        if(props.stations[i].id == endStation)
            off = props.stations[i]
    }
    // var crossDay = false
    // if(on.datetime.slice(8,10) != off.datetime.slice(8,10))
    //     crossDay = true
    var info = props
    info.on = on
    info.off = off
    const encodedInfo = encodeURIComponent(JSON.stringify(info));
    
    var date = new Date(on.datetime.slice(0,10))

    return (
        <div className="bg-white mx-5 my-1 w-full h-40">
            <div className="ml-2.5 mt-2 flex">{date.getFullYear()} / {date.getMonth() + 1} / {date.getDate()} ({weekMap[date.getDay()]})</div>
            <div className="flex mt-2">
                <p className="bg-lime-400 text-black w-9 ml-4">上車</p>
                <p className='w-24 ml-1'> {on.datetime.slice(-8,-3)} </p>
                <p className='w-auto ml-4'> {on.name} </p>
            </div>
            <div className="flex mt-2">
                <p className="bg-red-400 text-black w-9 ml-4">下車</p>
                <p className='w-24 ml-1'> {off.datetime.slice(-8,-3)} </p> 
                <p className='w-auto ml-4'> {off.name}</p>
            </div>
            <div className="flex text-dark_o ml-4 mt-2.5">司機
                <div className="overflow-hidden rounded-full w-6 h-6 border border-blue-500 ml-3"><img src={props.driver.avatar} className="w-full h-full"/></div> 
                <p className="text-black ml-2">{props.driver.name}</p>
            </div>
            <Link href="/passenger/request" as={`/passenger/request?info=${encodedInfo}`} className="bg-dark_o text-white float-right rounded-xl w-20 mb-1 mr-2">發送請求</Link>
        </div>
    )
}
