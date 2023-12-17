import Link from "next/link";


export default function Request({props}) {
    const weekMap = ['一','二','三','四','五','六','日']
    
    const statusMap = {'new':'等待回復','accepted':'被接受','denied':'被拒絕','expired':'已過期','deleted':'已刪除','canceled':'已取消'}
    const statusColorMap = {'new':'text-dark_o','accepted':'text-lime-600','denied':'text-rose-500','expired':'text-slate-500','deleted':'text-slate-500','canceled':'text-slate-500'}
    // const encodedInfo = encodeURIComponent(JSON.stringify(info));
    
    var date = new Date(props['route'].date)
    const encodedInfo = encodeURIComponent(JSON.stringify(props));

    return (
        <Link href="/passenger/checkRequest" as={`/passenger/checkRequest?info=${encodedInfo}`} className="bg-white mx-5 my-1 w-full h-36">
            <div className="ml-2.5 mt-2 flex">{date.getFullYear()} / {date.getMonth() + 1} / {date.getDate()} ({weekMap[date.getDay()]})</div>
            <div className="flex mt-2">
                <p className="bg-lime-400 text-black w-9 ml-4">上車</p>
                <p className='w-24 ml-1'> {props['on-station'].datetime.slice(-8,-3)} </p>
                <p className='w-auto ml-4'> {props['on-station'].name} </p>
            </div>
            <div className="flex mt-2">
                <p className="bg-red-400 text-black w-9 ml-4">下車</p>
                <p className='w-24 ml-1'> {props['off-station'].datetime.slice(-8,-3)} </p> 
                <p className='w-auto ml-4'> {props['off-station'].name}</p>
            </div>
            <div className="flex text-dark_o ml-4 mt-2.5">
                <p>司機</p>
                <div className="overflow-hidden rounded-full w-6 h-6 border border-blue-500 ml-3"><img src={props['route'].driver.avatar} className="w-full h-full"/></div> 
                <p className="text-black ml-2">{props['route'].driver.name}</p>
                <div className={statusColorMap[props['status']] + " border border-slate-400 ml-auto font-bold rounded-xl w-20 mb-1 mr-2 text-center"}>{statusMap[props['status']]}</div>
            </div>
        </Link>
    )
}
