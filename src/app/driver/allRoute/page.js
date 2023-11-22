import { useMemo } from "react";

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
                    <div className="rounded-3xl w-fit m-1 p-0.5 bg-[#DC7272] text-white">上班</div>
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


export default function App() {

    let allRoute = [
        {
            "id": 23,
            "date": "2023-10-22",
            "workStatus": true,
            "status": "available",
            "stations": [
                {
                    "id": 1,
                    "name": "台北車站",
                    "datetime": "2023-10-22T10:30",
                }
            ],
            "passengers": [
                {
                    "id": 10,
                    "name": "John James",
                    "avatar": "https://example.com/avatar.png",
                    "phone": 912123456
                }
            ],
            "driver": {
                "id": 10,
                "name": "John James",
                "avatar": "https://example.com/avatar.png",
                "phone": 912123456
            },
            "carInfo": {
                "color": "紅色",
                "capacity": 3,
                "licensePlateNumber": "ABC-0123"
            }
        },
        {
            "id": 24,
            "date": "2023-10-22",
            "workStatus": true,
            "status": "available",
            "stations": [
                {
                    "id": 1,
                    "name": "台北車站",
                    "datetime": "2023-10-22T10:30",
                }
            ],
            "passengers": [
                {
                    "id": 10,
                    "name": "John James",
                    "avatar": "https://example.com/avatar.png",
                    "phone": 912123456
                }
            ],
            "driver": {
                "id": 10,
                "name": "John James",
                "avatar": "https://example.com/avatar.png",
                "phone": 912123456
            },
            "carInfo": {
                "color": "紅色",
                "capacity": 3,
                "licensePlateNumber": "ABC-0123"
            }
        }
    ];

    return (<>
        <div className="grid grid-cols-2 w-full">
            {
                allRoute.map((route) => <Route key={route.id} route={route} />)
            }
        </div>
    </>)
}