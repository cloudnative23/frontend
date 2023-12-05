import requests from './data'

const digitToChinese = ["日", "ㄧ", "二", "三", "四", "五", "六"]

function RequestComponent({request, onAccept, onDeny}) {

    function getDate(date) {
        let d = new Date(date)
        return `${d.getUTCMonth() + 1}月${d.getUTCDate() + 1}日（${digitToChinese[d.getDay()]}）`
    }

    function getTime(datetime) {
        let d = new Date(datetime)
        return `${d.getHours()}:${d.getMinutes()}`
    }

    return (
        <>

            {/* <p>{JSON.stringify(request)}</p> */}

            <div className="m-2 p-2 rounded-lg bg-white">

                <div className="flex justify-begin w-full text-gray_dark items-center">
                    <div>{getDate(request.route.date)}</div>
                    {
                        request.route.workStatus ?
                            <div className="rounded-3xl w-fit m-1 p-0.5 bg-go2work text-">上班</div>
                            :
                            <div className="rounded-sm w-fit px-3 bg-go2home text-white">下班</div>
                    }
                </div>

                <div className="flex flex-col pl-3 py-2 space-y-2 text-gray_dark">
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
                    <div className='flex flex-row space-x-2 items-center'>
                        <div className='text-driver_dark'>乘客</div>
                        <img className='rounded-full' src={request.route.driver.avatar} width={20} height={20} />
                        <div>{request.route.driver.name}</div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default function App(props) {
    return (<>
        {
        
            requests.map((request, key) => (
                <RequestComponent key={key} request={request} onDeny={() => null} onAccept={() => null} />
            ))
        }
    </>)
}