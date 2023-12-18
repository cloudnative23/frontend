"use client";

import * as React from 'react';
// import AddCardIcon from '@mui/icons-material/AddCard';
// import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import InventoryIcon from '@mui/icons-material/Inventory';
import SearchIcon from '@mui/icons-material/Search';
import MailIcon from '@mui/icons-material/Mail';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';

function IndexButton({mode, name, icon, alertNum}) {
  let showDriver = false;
  let showPassenger = false;
  if (mode === "driver") {
    showDriver = true;
  }
  if (mode === "passenger") {
    showPassenger = true;
  }

  return (
    <button className="flex justify-center items-center">
      {showDriver &&
      <div className="h-[5rem] w-[4.5rem] bg-driver_dark rounded-2xl relative">
        {icon === 'AddSchedule' &&
          <AddLocationIcon className="text-white text-4xl mt-2 mb-2" /> }
        {icon === 'CheckMail' && alertNum === 0 &&
          <MailIcon className="text-white text-4xl mt-2 mb-2" />}
        {icon === 'CheckMail' && alertNum > 0 &&
          <IconButton size="large">
            <Badge badgeContent={alertNum} color="error">
              <MailIcon className="text-white text-4xl" />
            </Badge>
          </IconButton>
        }
        {icon === 'CheckSchedule' &&
          <EditCalendarIcon className="text-white text-4xl mt-2 mb-2" /> }
        {icon === 'AllSchedule' &&
          <InventoryIcon className="text-white text-4xl mt-2 mb-2" /> }
        {/* <p className="text-white text-sm">{name}</p> */}
        <div className="absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 whitespace-nowrap">
          <p className="text-white text-sm">{name}</p>
        </div>
      </div>
      }
      {showPassenger &&
      <div className="h-[5rem] w-[4.5rem] bg-passenger_dark rounded-2xl">
        {icon === 'Search' &&
          <SearchIcon className="text-white text-4xl mt-2 mb-2" /> }
        {icon === 'CheckMail' &&
          <MailIcon className="text-white text-4xl mt-2 mb-2" /> }
        {icon === 'CheckSchedule' &&
          <EditCalendarIcon className="text-white text-4xl mt-2 mb-2" /> }
        {icon === 'AllSchedule' &&
          <InventoryIcon className="text-white text-4xl mt-2 mb-2" /> }
        <p className="text-white text-sm">{name}</p>
      </div>
      }
    </button>
  );
}

export default IndexButton;