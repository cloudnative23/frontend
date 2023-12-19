"use client";

import * as React from 'react';
import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import SyncIcon from '@mui/icons-material/Sync';
import LogoutIcon from '@mui/icons-material/Logout';

function Navbar({mode}) {
  let showDriver = false;
  let showPassenger = false;
  if (mode === "driver") {
    showDriver = true;
  }
  if (mode === "passenger") {
    showPassenger = true;
  }

  return (
    <>
      {showDriver &&
      <AppBar position="static" elevation={0} sx={{backgroundColor: 'transparent'}}>
        <Container>
          <Toolbar disableGutters>
            <Typography
              // variant="h6"
              noWrap
              component="a"
              href={`/driver`}
              sx={{
                marginLeft: -1,
                mr: 2,
                display: 'flex',
                // fontFamily: 'monospace',
                fontWeight: 'regular',
                // letterSpacing: '.1rem',
                textDecoration: 'none',
              }}
              className='text-sm text-driver_dark'
            >
              TSMC COMMUTING DRIVER
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display : 'flex' }}>
              <div className='rounded-full bg-white'>
                <Link href={`/passenger`}>
                  <IconButton size="small">
                    {/* <Badge badgeContent={4} color="error"> */}
                    <SyncIcon className='text-driver_dark' />
                    {/* </Badge> */}
                  </IconButton>
                </Link>
              </div>

              <div className='rounded-full bg-white ml-2'>
                <Link href={`/login`}>
                  <IconButton size="small">
                    <LogoutIcon href={`/login`} className='text-driver_dark' edge="end" />
                  </IconButton>
                </Link>
              </div>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      }

      {showPassenger &&
      <AppBar position="static" elevation={0} sx={{backgroundColor: 'transparent'}}>
        <Container>
          <Toolbar disableGutters>
            <Typography
              // variant="h6"
              noWrap
              component="a"
              href={`/passenger`}
              sx={{
                marginLeft: -1,
                mr: 2,
                display: 'flex',
                // fontFamily: 'monospace',
                fontWeight: 'regular',
                // letterSpacing: '.1rem',
                textDecoration: 'none',
              }}
              className='text-sm text-passenger_dark'
            >
              TSMC COMMUTING PASSENGER
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display : 'flex' }}>
              <div className='rounded-full bg-white'>
                <Link href={`/driver`}>
                  <IconButton size="small">
                    {/* <Badge badgeContent={4} color="error"> */}
                    <SyncIcon className='text-passenger_dark' />
                    {/* </Badge> */}
                  </IconButton>
                </Link>
              </div>

              <div className='rounded-full bg-white ml-2'>
                <Link href={`/login`}>
                  <IconButton size="small">
                    <LogoutIcon href={`/login`} className='text-passenger_dark' edge="end" />
                  </IconButton>
                </Link>
              </div>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      }
    </>
  );
}
export default Navbar;