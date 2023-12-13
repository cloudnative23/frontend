"use client";

import IndexButton from "@/components/IndexButton";
import ShowWaiting from "@/components/ShowWaiting";

import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

export default function Passenger() {
  return (
    <>
      <div className="flex justify-center">
        <div className="bg-white w-10/12 rounded-xl">
          <div className="flex justify-center space-x-6 py-1 my-2">
            <IndexButton mode="passenger" name="尋找行程" icon="Search" />
            <IndexButton mode="passenger" name="查看行程" icon="CheckSchedule" />
            <IndexButton mode="passenger" name="共乘紀錄" icon="AllSchedule" />
          </div>
        </div>
      </div>

      <div className="flex justify-center space-x-2 my-4">
        <ShowWaiting whoWait="passenger" waitFor="passenger"/>
        {/* <ShowWaiting whoWait="driver" waitFor="passenger" /> */}
      </div>

      <div className="ml-6 mb-4">
        <p className="text-sm text-passenger_dark">最近的行程</p>
      </div>

      <div className="flex justify-center">
        <div className="bg-white w-10/12 rounded-xl pb-2">

          {/* No schedule */}
          {!hasSchedule &&
          <div className="flex justify-center items-center my-4">
            <ErrorOutlineIcon className="text-xl mx-4" />
            <p className="text-base">尚未規畫任何未來行程</p>
          </div>
          }

          {/* Has schedule */}
          {hasSchedule &&
          <div className="mx-2 my-4">
            <div className="flex justify-between items-center">
              {/* first row */}
              <p className="ml-2">{getDateInChinese(tempDate)}</p>
              {go2work &&
              <div className="flex justify-center items-center rounded-xl bg-go2work h-6 w-12 ml-4">
                <p className="font-bold text-white text-md">上班</p>
              </div>
              }
              {!go2work &&
              <div className="flex justify-center items-center rounded-xl bg-go2home h-6 w-12 ml-4">
                <p className="font-bold text-white text-md">下班</p>
              </div>
              }
              <Box sx={{ flexGrow: 1 }} />
              <IconButton size="small">
                <MoreVertIcon />
              </IconButton>
            </div>
            
            <div>
              {/* routes info */}
              {stations.map((station) => (
                <div key={station.id}>
                  {singleStationInfo(station)}
                </div>
              ))}
            </div>
          </div>
          }

          {/* <p>This is Passenger!</p> */}
        </div>
      </div>
    </>
  );
}
