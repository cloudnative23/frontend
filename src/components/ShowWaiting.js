"use client";

import * as React from 'react';
import { useRouter } from 'next/navigation';

function ShowWaiting({whoWait, waitFor}) {
  const router = useRouter();
  const handleButtonClick = () => {
    if (whoWait === waitFor && whoWait === "driver") {
      router.push(`/driver/allRequest`);
    }
  };

  return (
    <>
      <button className="flex justify-center" onClick={handleButtonClick} >
        <div className="bg-white w-40 rounded-xl pt-2 pb-2">
          {/* <div className="flex justify-center flex-row items-end space-x-2"> */}
          {whoWait === waitFor && whoWait === "driver" &&
            <div className="flex justify-center flex-row items-end space-x-2 items-center">
              <p className="text-xl text-driver_dark">2</p>
              <p className="text-xs">則請求等候您的回覆</p>
            </div>}
          {whoWait === waitFor && whoWait === "passenger" &&
            <div className="flex justify-center flex-row items-end space-x-2 items-center">
              <p className="text-xl text-passenger_dark">1</p>
              <p className="text-xs">則請求等候您的回覆</p>
            </div>}
            
          {whoWait !== waitFor &&
            <div className="flex justify-center flex-row items-end space-x-2 items-center">
              <p className="text-xl text-driver_dark">4</p>
              <p className="text-xs">則邀請等候乘客回覆</p>
            </div>}
          {/* </div> */}
        </div>
      </button>
    </>
  )
}

export default ShowWaiting;