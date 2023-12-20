"use client";

import * as React from "react";

// import AddCardIcon from '@mui/icons-material/AddCard';
// import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import AddLocationIcon from "@mui/icons-material/AddLocation";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import InventoryIcon from "@mui/icons-material/Inventory";
import MailIcon from "@mui/icons-material/Mail";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";

function IndexButton({ mode, name, icon, alertNum }) {
  let showDriver = false;
  let showPassenger = false;
  if (mode === "driver") {
    showDriver = true;
  }
  if (mode === "passenger") {
    showPassenger = true;
  }

  return (
    <button className="flex items-center justify-center">
      {showDriver && (
        <div className="relative h-[5rem] w-[4.5rem] rounded-2xl bg-driver_dark">
          {icon === "AddSchedule" && (
            <AddLocationIcon className="mb-2 mt-2 text-4xl text-white" />
          )}
          {icon === "CheckMail" && alertNum === 0 && (
            <MailIcon className="mb-2 mt-2 text-4xl text-white" />
          )}
          {icon === "CheckMail" && alertNum > 0 && (
            <div className=" mb-2 mt-2">
              <Badge badgeContent={alertNum} color="error">
                <MailIcon className="text-4xl text-white" />
              </Badge>
            </div>
          )}
          {icon === "CheckSchedule" && (
            <EditCalendarIcon className="mb-2 mt-2 text-4xl text-white" />
          )}
          {icon === "AllSchedule" && (
            <InventoryIcon className="mb-2 mt-2 text-4xl text-white" />
          )}
          {/* <p className="text-white text-sm">{name}</p> */}
          <div className="absolute left-1/2 top-3/4 -translate-x-1/2 -translate-y-1/2 transform whitespace-nowrap">
            <p className="text-sm text-white">{name}</p>
          </div>
        </div>
      )}
      {showPassenger && (
        <div className="h-[5rem] w-[4.5rem] rounded-2xl bg-passenger_dark">
          {icon === "Search" && (
            <SearchIcon className="mb-2 mt-2 text-4xl text-white" />
          )}
          {icon === "CheckMail" && (
            <MailIcon className="mb-2 mt-2 text-4xl text-white" />
          )}
          {icon === "CheckSchedule" && (
            <EditCalendarIcon className="mb-2 mt-2 text-4xl text-white" />
          )}
          {icon === "AllSchedule" && (
            <InventoryIcon className="mb-2 mt-2 text-4xl text-white" />
          )}
          <p className="text-sm text-white">{name}</p>
        </div>
      )}
    </button>
  );
}

export default IndexButton;
