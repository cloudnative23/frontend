"use client";

import * as React from 'react';
import AddCardIcon from '@mui/icons-material/AddCard';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import InventoryIcon from '@mui/icons-material/Inventory';
import SearchIcon from '@mui/icons-material/Search';

function IndexButton({mode, name, icon}) {
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
      <div className="h-[5rem] w-[4.5rem] bg-driver_dark rounded-2xl">
        {icon === 'AddSchedule' &&
          <AddCardIcon className="text-white text-4xl mt-2 mb-2" /> }
        {icon === 'FindPassenger' &&
          <PersonAddAltIcon className="text-white text-4xl mt-2 mb-2" /> }
        {icon === 'CheckSchedule' &&
          <EditCalendarIcon className="text-white text-4xl mt-2 mb-2" /> }
        {icon === 'AllSchedule' &&
          <InventoryIcon className="text-white text-4xl mt-2 mb-2" /> }
        <p className="text-white text-sm">{name}</p>
      </div>
      }
      {showPassenger &&
      <div className="h-[5rem] w-[4.5rem] bg-passenger_dark rounded-2xl">
        {icon === 'Search' &&
          <SearchIcon className="text-white text-4xl mt-2 mb-2" /> }

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