import { Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Box } from '@mui/material';
import { Settings as SettingsIcon } from '@mui/icons-material';
import BurgerMenu from '../BurgerMenu/BurgerMenu';

export default function Header() {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            component={Link}
            to="/home"
          >
            <img
              src="/fitsync-logo.svg"
              alt="Logo Fitsync"
              style={{ height: 25 }}
            />
          </IconButton>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton color="inherit" component={Link} to="/settings">
            <SettingsIcon />
          </IconButton>
          <BurgerMenu />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
