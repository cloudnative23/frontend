"use client";

import * as React from 'react';
import AddCardIcon from '@mui/icons-material/AddCard';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import InventoryIcon from '@mui/icons-material/Inventory';

function IndexButton({name, icon}) {

  return (
    <button className="flex justify-center items-center">
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
    </button>
  );
}

export default IndexButton;