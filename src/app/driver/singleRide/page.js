"use client"
import React, { useState, useEffect } from 'react'
import Link from "next/link";
import SettingsIcon from '@mui/icons-material/Settings';
import EmailIcon from '@mui/icons-material/Email';
import axios from "axios";
import { useSearchParams } from 'next/navigation'

export default function SingleRide(props) {

    const searchParams = useSearchParams();
    const rid = parseInt(searchParams.get('id'));

    const fake = [
      {
        "id": 10,
        "date": "2023-10-22",
        "workStatus": false,
        "status": "available",
        "stations": [
          {
            "id": 3,
            "name": "台積電新竹3廠東側門",
            "datetime": "2023-10-22T17:30",
            "on-passengers": [
              2,
              4
            ],
            "off-passengers": []
          },
          {
            "id": 1,
            "name": "台北車站",
            "datetime": "2023-10-22T17:50",
            "on-passengers": [],
            "off-passengers": [
              4
            ]
          },
          {
            "id": 2,
            "name": "台大校門口",
            "datetime": "2023-10-22T18:10",
            "on-passengers": [],
            "off-passengers": [
              4
            ]
          }
        ],
        "carInfo": {
          "color": "紅色",
          "capacity": 4,
          "licensePlateNumber": "ABC-1234"
        },
        "passengers": [
          {
            "id": 2,
            "name": "Bill Gates",
            "phone": "0982104928"
          },
          {
            "id": 4,
            "name": "Paul",
            "phone": "0954201859"
          }
        ],
        "driver": {
          "id": 3,
          "name": "John James",
          "avatar": "https://example.com/avatar.png",
          "phone": "0928123456"
        }
      }
    ]

    const [routeid, setrid] = useState(60);
    const [route, setRoute] = useState(fake[0]);

    useEffect(() => {
        const now = new Date();
        const currentDateTime = now.toLocaleString();
        //setDate(currentDateTime);
      }, []
    )

    useEffect(() => {

        axios(`${process.env.NEXT_PUBLIC_API_ROOT}/routes/${rid}`, {method: 'get', withCredentials: true })
        .then(response => {
            if (!response.ok) {
                //throw new Error('Network response was not ok');
            }
            return response.data
        })
        .then(data => {
            // Handle the successful login response
            var curRoute = data;
            for (let i = 0; i < curRoute.passengers.length; i++) {
              for (let j = 0; j < curRoute.stations.length; j++) {
                if ( curRoute.stations[j]["on-passengers"].includes(curRoute.passengers[i].id) )
                  curRoute.passengers[i].on = curRoute.stations[j].name;
                if ( curRoute.stations[j]["off-passengers"].includes(curRoute.passengers[i].id) )
                  curRoute.passengers[i].off = curRoute.stations[j].name;
              }
            }
            console.log(curRoute);
            //setId(data.id)
            setRoute(curRoute);
        })
        .catch(error => {
            // Handle errors
            console.error('There was a problem with the fetch operation:', error);
        });
      }, []
    )

    return (
      <div className="flex flex-col items-center bg-[#EFF6F9] items-stretch text-sm overflow-y-scroll h-full">
        <div className="w-11/12 self-center">
          <div className="bg-white text-center rounded-xl">檢視行程</div>
        </div>

        <div className='flex justify-between'>
          <div className="pt-6 mb-0 ml-3 text-center text-orange-600"> {route.date} </div>
          <div className="pt-6 mt-0 mr-3 text-center text-orange-600"> 上班 </div>
        </div>
        
        <div className='text-orange-600 mt-8 mb-4 ml-3'> 路線資訊 </div>
        <div className="w-10/12 self-center flex flex-col rounded-md bg-white " >  
            {route.stations.map(station => (
                <div className='grid grid-cols-12 px-1 my-2' key={station.id}> 
                  <div className='col-span-2'>
                    {/* {station.on.includes(id) ? <div className='bg-[#E4F8CC] text-sm m-auto w-9 text-center'> 上車 </div> : <div> </div>}
                    {station.off.includes(id) ? <div className='bg-[#FFE2E3] text-sm m-auto w-9 text-center'> 下車 </div>: <div> </div>} */}
                  </div>
                  <div className='col-span-2'> {station.datetime.substring(station.datetime.indexOf("T")+1, station.datetime.length)} </div>
                  <div className='col-span-8 text-center'> {station.name} </div>
                </div>
            )
            )}
        </div>



        <div className='text-orange-600 mt-8 mb-4 ml-3'> 司機與車輛資訊 </div>
        <div className="w-10/12 self-center flex flex-col " >
            {route.passengers.map( passenger => (
              <div className='px-2 py-2 my-2 rounded-md bg-white' key={passenger.id}>
                <div className='flex justify-between px-1 py-1'> 
                  <div> 乘客姓名 </div>
                  <div> {passenger.name} </div>
                </div>
                <div className='flex justify-between px-1 py-1'> 
                  <div> 乘客電話 </div>
                  <div> {passenger.phone} </div>
                </div>
                <div className='flex justify-between px-1 py-1'> 
                  <div> 上車站點 </div>
                  <div> {passenger.on} </div>
                </div>
                <div className='flex justify-between px-1 py-1'> 
                  <div> 下車站點 </div>
                  <div> {passenger.off} </div>
                </div>
              </div>  
            )
            )}


            
{/*           
            <div>
                <div className='flex justify-between px-1 my-2'> 
                  <div> 聯絡電話 </div>
                  <div> {fake[0].driver.name} </div>
                </div>
            </div> */}
        </div>
      </div>
    );
  }