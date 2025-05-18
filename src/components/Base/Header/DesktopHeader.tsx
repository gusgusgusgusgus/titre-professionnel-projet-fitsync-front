import { Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Box, Button } from '@mui/material';
import { Settings as SettingsIcon } from '@mui/icons-material';
import { useAppDispatch } from '../../../hooks/redux-hooks';
import actionLogout from '../../../store/thunks/actionLogout';

export default function DesktopHeader() {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(actionLogout());
  };

  const buttonStyles = {
    flexGrow: 1,
    color: 'rgba(255, 255, 255, 0.7)',
    textShadow: '0 0 5px rgba(0, 0, 0, 0.7)',
    transition: 'color 0.3s, text-shadow 0.3s',
    '&:hover': {
      color: '#adfa1d',
      textShadow: '0 0 10px #adfa1d, 0 0 20px #adfa1d, 0 0 30px #adfa1d',
      backgroundColor: 'transparent',
    },
  };

  const activeButtonStyles = {
    ...buttonStyles,
    color: '#adfa1d',
    textShadow: '0 0 10px #adfa1d, 0 0 20px #adfa1d, 0 0 30px #adfa1d',
  };

  const getButtonStyles = (path) =>
    location.pathname === path ? activeButtonStyles : buttonStyles;

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
            sx={{ mr: 4 }}
          >
            <img
              src="/fitsync-logo.svg"
              alt="Logo Fitsync"
              style={{ height: 25 }}
            />
          </IconButton>
          <Box sx={{ display: 'flex', flexGrow: 1, ml: 2 }}>
            <Button
              color="inherit"
              component={Link}
              to="/home"
              sx={getButtonStyles('/home')}
            >
              Home
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/dashboard"
              sx={getButtonStyles('/dashboard')}
            >
              Dashboard
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/new-session/new"
              sx={getButtonStyles('/new-session')}
            >
              New session
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/category-list"
              sx={getButtonStyles('/category-list')}
            >
              Categories
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/history"
              sx={getButtonStyles('/history')}
            >
              History
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/favorites"
              sx={getButtonStyles('/favorites')}
            >
              Favorites
            </Button>
            <Button
              onClick={handleLogout}
              color="inherit"
              component={Link}
              to="/"
              sx={getButtonStyles('/')}
            >
              Logout
            </Button>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', ml: 4 }}>
          <IconButton color="inherit" component={Link} to="/settings">
            <SettingsIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
