"use client"
import React, { useState, useEffect } from 'react'
import Link from "next/link";
import SettingsIcon from '@mui/icons-material/Settings';
import EmailIcon from '@mui/icons-material/Email';

export default function SingleRide(props) {

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
            "on": [
              2,
              4
            ],
            "off": []
          },
          {
            "id": 1,
            "name": "台北車站",
            "datetime": "2023-10-22T17:50",
            "on": [],
            "off": [
              4
            ]
          },
          {
            "id": 2,
            "name": "台大校門口",
            "datetime": "2023-10-22T18:10",
            "on": [],
            "off": [
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

    const [date, setDate] = useState(null);
    const [id, setId] = useState(4);

    useEffect(() => {
        const now = new Date();
        const currentDateTime = now.toLocaleString();
        setDate(currentDateTime);
      }, []
    )

    useEffect(() => {
        fetch('your_backend_login_endpoin/me')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Handle the successful login response
            console.log(data);
            setId(data.id)
            setDate(data.date)
        })
        .catch(error => {
            // Handle errors
            console.error('There was a problem with the fetch operation:', error);
        });
      }, []
    )

    return (
      <div className="flex flex-col items-center bg-[#EFF6F9] items-stretch ">
        <div className="w-11/12 self-center">
          <div className="bg-white text-center rounded-xl">檢視行程</div>
        </div>

        <div className='flex justify-between'>
          <div className="pt-6 mb-0 ml-3 text-center text-orange-600"> {date} </div>
          <div className="pt-6 mt-0 mr-3 text-center text-orange-600"> 上班 </div>
        </div>
        
        <div className='text-orange-600 mt-8 mb-4 ml-3'> 路線資訊 </div>
        <div className="w-10/12 self-center flex flex-col rounded-md bg-white " >  
            {fake[0].stations.map(station => (
                <div className='grid grid-cols-12 px-1 my-2'> 
                  <div className='col-span-2'>
                    {station.on.includes(id) ? <div className='bg-[#E4F8CC] text-sm m-auto w-9 text-center'> 上車 </div> : <div> </div>}
                    {station.off.includes(id) ? <div className='bg-[#FFE2E3] text-sm m-auto w-9 text-center'> 下車 </div>: <div> </div>}
                  </div>
                  <div className='col-span-2'> {station.datetime.substring(station.datetime.indexOf("T")+1, station.datetime.length)} </div>
                  <div className='col-span-8 text-center'> {station.name} </div>
                </div>
            )
            )}
        </div>



        <div className='text-orange-600 mt-8 mb-4 ml-3'> 司機與車輛資訊 </div>
        <div className="w-10/12 self-center flex flex-col " >
            {fake[0].passengers.map( passenger => (
              <div className='px-2 py-2 my-2 rounded-md bg-white'>
                <div className='flex justify-between px-1'> 
                  <div> 乘客姓名 </div>
                  <div> {passenger.name} </div>
                </div>
                <div className='flex justify-between px-1'> 
                  <div> 乘客電話 </div>
                  <div> {passenger.phone} </div>
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