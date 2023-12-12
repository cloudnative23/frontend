"use client";

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
// import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';

const settings = ['個人資料', '切換為乘客', '登出'];

function Navbar({mode}) {
  let showDriver = false;
  if (mode === "driver") {
    showDriver = true;
  }
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      {showDriver &&
      <AppBar position="static" elevation={0} className="bg-driver">
        <Container>
          <Toolbar disableGutters>
            <Typography
              // variant="h6"
              noWrap
              component="a"
              href={`/driver`}
              sx={{
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
                <IconButton size="small">
                  <Badge badgeContent={4} color="error">
                    <MailIcon alt="Test" className='text-driver_dark' />
                  </Badge>
                </IconButton>
              </div>

              <div className='rounded-full bg-white ml-2'>
                <IconButton onClick={handleOpenUserMenu} size="small">
                  <SettingsIcon alt="Test" className='text-driver_dark' edge="end" />
                </IconButton>
              </div>

              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      }
    </>
  );
}
export default Navbar;

// async function Navbar() {
//   return (
//     <>
//       <nav className="sticky top-0 flex flex-col items-center justify-between bg-slate-100 pb-2">
//         <div className="flex w-full items-center justify-center px-3 py-1">
//           <p>TSMC Commuting</p>
//         </div>
//         <p>Hi, Driver!</p>
//       </nav>
//     </>
//   )
// }

// export default Navbar;