// Import of React component or libraries
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Box, Button } from '@mui/material';

export default function DisconnectedHeader() {
  return (
    <AppBar position="fixed">
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
            component={Link}
            to="/login"
          >
            Login
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
