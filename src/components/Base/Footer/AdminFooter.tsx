import * as React from 'react';
import { Dashboard } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';

const FixedBottomNavigation = styled(BottomNavigation)(({ theme }) => ({
  position: 'fixed',
  bottom: 0,
  width: '100%',
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: '#272727',
}));

export default function AdminFooter() {
  const [value, setValue] = React.useState(0);

  return (
    <FixedBottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
    >
      <BottomNavigationAction
        label="Admin panel"
        icon={<Dashboard />}
        component={Link}
        to="/home-admin"
      />
    </FixedBottomNavigation>
  );
}
