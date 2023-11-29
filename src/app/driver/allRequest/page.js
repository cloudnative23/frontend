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
        <div className="bg-[#EEF6F9]">

            {/* <p>{JSON.stringify(request)}</p> */}

            <div className="m-2 p-2 rounded-lg bg-[#FAFFFB]">

                <div className="flex justify-begin w-full">
                    <div>{getDate(request.route.date)}</div>
                    {
                        request.route.workStatus ?
                            <div className="rounded-3xl w-fit m-1 p-0.5 bg-[#57A368] text-white">上班</div>
                            :
                            <div className="rounded-3xl w-fit m-1 p-0.5 bg-[#DC7272] text-white">下班</div>
                    }
                </div>

                <div className="grid grid-cols-3 space-0">
                    <div className='rounded-sm bg-[#E4F8CC] text-[#757575] w-fit px-2 py-0.5 text-center'>上車</div>
                    <div>{getTime(request.route.stations.find(station => station.id == request.on.id).datetime)}</div>
                    <div>{request.route.stations.find(station => station.id == request.on.id).name}</div>
                    <div className='rounded-sm bg-[#FFE2E2] text-[#757575] w-fit px-2 py-0.5 text-center'>下車</div>
                    <div>{getTime(request.route.stations.find(station => station.id == request.off.id).datetime)}</div>
                    <div className='w-full'>{request.route.stations.find(station => station.id == request.off.id).name}</div>
                </div>

            </div>
        </div>
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