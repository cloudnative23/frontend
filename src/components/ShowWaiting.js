"use client";

import * as React from 'react';

function ShowWaiting({whoWait, waitFor}) {

  return (
    <>
      <button className="flex justify-center">
        <div className="bg-white w-40 rounded-xl pt-2 pb-2">
          {/* <div className="flex justify-center flex-row items-end space-x-2"> */}
          {whoWait === waitFor &&
            <div className="flex justify-center flex-row items-end space-x-2 items-center">
              <p className="text-lg text-driver_dark">2</p>
              <p className="text-xs">則請求等候您的回覆</p>
            </div>}
          {whoWait !== waitFor &&
            <div className="flex justify-center flex-row items-end space-x-2 items-center">
              <p className="text-lg text-driver_dark">4</p>
              <p className="text-xs">則邀請等候乘客回覆</p>
            </div>}
          {/* </div> */}
        </div>
      </button>
    </>
  )
}

export default ShowWaiting;