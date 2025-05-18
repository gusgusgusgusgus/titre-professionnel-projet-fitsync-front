import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { Add, Dashboard, Home } from '@mui/icons-material';

export default function Footer() {
  const [value, setValue] = React.useState(0);
  const location = useLocation();

  React.useEffect(() => {
    const pathname = location.pathname;
    if (pathname === '/home') {
      setValue(0);
    } else if (pathname === '/dashboard') {
      setValue(1);
    } else if (pathname === '/new-session') {
      setValue(2);
    }
  }, [location]);

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{ pb: 2, pt: 2 }}
      >
        <BottomNavigationAction
          label="Home"
          icon={<Home sx={{ color: 'primary' }} />}
          component={Link}
          to="/home"
        />
        <BottomNavigationAction
          label="Dashboard"
          icon={<Dashboard sx={{ color: 'primary' }} />}
          component={Link}
          to="/dashboard"
        />
        <BottomNavigationAction
          label="Session"
          icon={<Add sx={{ color: 'primary' }} />}
          component={Link}
          to="/new-session/new"
        />
      </BottomNavigation>
    </Box>
  );
}
