"use client"
import Link from "next/link";
import SettingsIcon from '@mui/icons-material/Settings';
import AirlineSeatReclineNormalTwoToneIcon from '@mui/icons-material/AirlineSeatReclineNormalTwoTone';
import ToysTwoToneIcon from '@mui/icons-material/ToysTwoTone';
import { useState, useEffect } from "react"; 
import axios from "axios";

export default function Choose() {

  const [name, setName] = useState(null);

  useEffect(() => {
      axios.get(`${process.env.NEXT_PUBLIC_API_ROOT}/me`, { withCredentials: true })
      .then(response => {
          if (!response.ok) {
              //throw new Error('Network response was not ok');
              //console.log(response);
          }
          return response.data;
      })
      .then(data => {
          // Handle the successful login response
          console.log(data);
          //setId(data.id)
          setName(data.name)
      })
      .catch(error => {
          // Handle errors
          console.error('There was a problem with the fetch operation:', error);
      });
    }, []
  )

    return (
        <div className="flex flex-col items-center bg-[#F4F4F4] items-stretch">
          <nav className="flex flex-row justify-between p-2">
            <div>TSMC COMMUTING</div>
            <SettingsIcon />
          </nav>
          <div className="w-11/12 self-center mt-8">
            <div className="bg-white text-center rounded-xl">選擇身份</div>
          </div>
    
          <div className="pt-20 mb-0 text-center">歡迎 {name}, 您想當乘客還是司機呢？</div>


          <div className="w-6/12 flex self-center justify-between mt-24 text-white">
            <Link href="/passenger" className="basis-16 bg-[#DC8352] text-center rounded-xl text-xl">
                <div>
                    <AirlineSeatReclineNormalTwoToneIcon /> <br /> <div className="inline-block text-base">乘客</div>
                </div>
            </Link>
            <Link href="/driver" className="basis-16 bg-[#5184CF] text-center rounded-xl text-xl">
                <div>
                <ToysTwoToneIcon /> <br /> <div className="inline-block text-base">司機</div>
                </div>
            </Link>
          </div>
          
        </div>
      );
}