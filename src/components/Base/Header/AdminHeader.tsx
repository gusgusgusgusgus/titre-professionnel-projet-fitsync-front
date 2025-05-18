import { Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Box, Button } from '@mui/material';
import actionLogout from '../../../store/thunks/actionLogout';
import { useAppDispatch } from '../../../hooks/redux-hooks';

export default function AdminHeader() {
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(actionLogout());
  };
  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            component={Link}
            to="/"
          >
            <img
              src="/fitsync-logo.svg"
              alt="Logo Fitsync"
              style={{ height: 25 }}
            />
          </IconButton>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleLogout}
            component={Link}
            to="/"
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
