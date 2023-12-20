"use client"
import React, { useState, useEffect } from 'react'
import Link from "next/link";
import SettingsIcon from '@mui/icons-material/Settings';
import EmailIcon from '@mui/icons-material/Email';
import axios from "axios";
import { useSearchParams } from 'next/navigation'
import { getTime } from '@/app/driver/_components/utils';

export default function SingleRide(props) {

  const searchParams = useSearchParams();
  const rid = parseInt(searchParams.get('id'));

    const fake = [
      {
        "id": 10,
        "date": "",
        "workStatus": false,
        "status": "available",
        "stations": [],
        "carInfo": {
          "color": "",
          "capacity": "",
          "licensePlateNumber": ""
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
          "name": "",
          "avatar": "https://example.com/avatar.png",
          "phone": ""
        }
      }
    ]

    const [id, setID] = useState(null);
    const [routeid, setrid] = useState(61);
    const [route, setRoute] = useState(fake[0]);

    useEffect(() => {
        const now = new Date();
        const currentDateTime = now.toLocaleString();
        //setDate(currentDateTime);
      }, []
    )

    useEffect(() => {
        axios(`${process.env.NEXT_PUBLIC_API_ROOT}/me`, {method: 'get', withCredentials: true })
        .then(response => {
            setID(response.data.id)
        })
    }, []
    );
       
    useEffect(() => {
        //setrid(rid);
        //console.log("rid = ", rid)
        //let data = {mode: 'search'}
        //axios(`${process.env.NEXT_PUBLIC_API_ROOT}/route?mode=passenger-future&n=1`, {method: 'get', withCredentials: true })
        axios(`${process.env.NEXT_PUBLIC_API_ROOT}/routes/${rid}`, {method: 'get', withCredentials: true })
        .then(response => {
            if (!response.ok) {
                //throw new Error('Network response was not ok');
            }
            return response.data;
        })
        .then(data => {
            // Handle the successful login response
            console.log(data.stations[0]);
            //setId(data.id)
            setRoute(data)
            console.log(route.stations[0])
        })
        .catch(error => {
            // Handle errors
            console.error('There was a problem with the fetch operation:', error);
        });
      }, []
    )

    return (
      <div className="flex flex-col items-center bg-[#F9F3EF] items-stretch text-sm overflow-y-scroll h-full">
        <div className="w-11/12 self-center ">
          <div className="bg-white text-center rounded-xl">檢視行程</div>
        </div>

        <div className='flex justify-between'>
          <div className="pt-6 mb-0 ml-3 text-center text-orange-600"> {route.date} </div>
          <div className="pt-6 mt-0 mr-3 text-center text-orange-600"> {route.workStatus ? "上班" : "下班"} </div>
        </div>
        
        <div className='text-orange-600 mt-8 mb-4 ml-3'> 路線資訊 </div>
        <div className="w-10/12 self-center flex flex-col rounded-xl bg-white " >
            {route.stations.map(station => (
                <div className='grid grid-cols-12 px-1 my-2' key={station.id}> 
                  <div className='col-span-2'>
                    {/*station["on-passengers"]*/}
                    {station["on-passengers"].includes(id) ? <div className='bg-[#E4F8CC] text-sm m-auto w-9 text-center'> 上車 </div> : <div> </div>}
                    {station["off-passengers"].includes(id) ? <div className='bg-[#FFE2E3] text-sm m-auto w-9 text-center'> 下車 </div>: <div> </div>}
                  </div>
                  <div className='col-span-2 text-center'> { getTime(station.datetime) } </div>
                  <div className='col-span-8 text-center'> {station.name} </div>
                </div>
            )
            )}
        </div>



        <div className='text-orange-600 mt-8 mb-4 ml-3'> 司機與車輛資訊 </div>
        <div className="w-10/12 self-center flex flex-col rounded-xl bg-white " >
            <div>
                <div className='flex justify-between px-1 my-2'> 
                  <div> 司機 </div>
                  <div> {route.driver.name} </div>
                </div>
            </div>
            <div>
                <div className='flex justify-between px-1 my-2'> 
                  <div> 可共乘人數 </div>
                  <div> {route.carInfo.capacity} </div>
                </div>
            </div>
            <div>
                <div className='flex justify-between px-1 my-2'> 
                  <div> 車牌 </div>
                  <div> {route.carInfo.licensePlateNumber} </div>
                </div>
            </div>
            <div>
                <div className='flex justify-between px-1 my-2'> 
                  <div> 顏色 </div>
                  <div> {route.carInfo.color} </div>
                </div>
            </div>
            <div>
                <div className='flex justify-between px-1 my-2'> 
                  <div> 聯絡電話 </div>
                  <div> {route.driver.phone} </div>
                </div>
            </div>
        </div>
      </div>
    );
  }