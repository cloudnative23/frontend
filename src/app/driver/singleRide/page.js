"use client"
import { useState, useEffect } from 'react'
import axios from "axios";
import Swal from 'sweetalert2';

import { useSearchParams } from 'next/navigation';

import HeaderBar from '../_components/HeaderComponent/HeaderComponnet';
import { getTime } from '../_components/utils';

export default function SingleRide(props) {

  const routeid = useSearchParams().get('id')
  const [route, setRoute] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (routeid != null) {
      axios(`${process.env.NEXT_PUBLIC_API_ROOT}/routes/${routeid}`, { method: 'get', withCredentials: true })
        .then(response => {
          return response.data
        })
        .then(data => {
          // Handle the successful login response
          // console.log(data);
          //setId(data.id)
          setRoute(data);
          setIsLoaded(true)
        })
        .catch(error => {
          // Handle errors
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${error.response.data.message}`,
          });
          console.error('There was a problem with the fetch operation:', error);
        });
    }
  }, [])

  function WorkComponent(route, station) {
    switch (station.id) {
    // case route["on-station"].id:
    //   return (<div className='bg-go2work_light text-center px-2 w-fit'>上車</div>)
    // case route["off-station"].id:
    //   return (<div className='bg-go2home_light text-center px-2 w-fit'>下車</div>)
    default:
      return <div></div>
    }
  }

  return (
    <div className="flex flex-col items-center bg-[#EFF6F9] items-stretch ">
      <HeaderBar text={"檢 視 行 程"}/>

      {isLoaded && (<>

        <div className='flex justify-between mx-3 text-driver_dark'>
          <div className="text-center"> {route.date.replaceAll('-', ' / ')} </div>
          <div className="text-center"> {route.workStatus ? "上班" : "下班"} </div>
        </div>

        <div className='text-driver_dark mx-3 my-3 text-sm'> 路線資訊 </div>
        <div className='grid grid-cols-[25%_20%_55%] mx-3 px-6 py-3 gap-y-2 text-sm rounded-md bg-white text-gray_dark'>
          {
            route.stations.map(station => (<>
              { WorkComponent(route, station) }
              <div> {getTime(station.datetime)} </div>
              <div> {station.name} </div>
            </>))
          }
        </div>

        <div className='text-driver_dark mx-3 my-3 text-sm'> 乘客資訊 </div>
        
        <div className='flex flex-col gap-y-2'>
          {route.passengers.map(passenger => (<>
            <div className='grid grid-cols-[30%_70%] mx-3 px-6 py-2 gap-y-2 text-sm rounded-md bg-white text-gray_dark text-sm'>
                <div> 乘客姓名 </div>
                <div> {passenger.name} </div>
                <div> 乘客電話 </div>
                <div> {passenger.phone} </div>
            </div>
            </>))}
        </div>
      </>)}
    </div>
  );
}