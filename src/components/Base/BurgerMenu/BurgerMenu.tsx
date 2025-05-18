import React from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CancelIcon from '@mui/icons-material/Cancel';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks/redux-hooks';
import actionLogout from '../../../store/thunks/actionLogout';

export default function BurgerMenu() {
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    dispatch(actionLogout());
    setOpen(false);
  };

  return (
    <>
      <IconButton
        edge="end"
        color="inherit"
        aria-label="menu"
        onClick={handleToggle}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor="right"
        open={open}
        onClose={handleToggle}
        sx={{
          '& .MuiDrawer-paper': {
            width: '80%',
            height: '80%',
            maxWidth: '80vw',
            margin: '2.5rem',
            marginTop: '10vh',
            marginBottom: '10vh',
            borderRadius: '10px',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginRight: '1rem',
          }}
        >
          <IconButton
            edge="end"
            aria-label="close menu"
            onClick={handleToggle}
            sx={{ color: '#adfa1d' }}
          >
            <CancelIcon />
          </IconButton>
        </Box>
        <List>
          <ListItem component={Link} to="/home">
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem component={Link} to="/dashboard">
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem component={Link} to="/category-list">
            <ListItemText primary="Categories" />
          </ListItem>
          <ListItem component={Link} to="/new-session/new">
            <ListItemText primary="New Session" />
          </ListItem>
          <ListItem component={Link} to="/history">
            <ListItemText primary="History" />
          </ListItem>
          <ListItem component={Link} to="/favorites">
            <ListItemText primary="Favorites" />
          </ListItem>
          <ListItem component={Link} to="/contact">
            <ListItemText primary="Contact Support" />
          </ListItem>
          <ListItem onClick={handleLogout} component={Link} to="/">
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}
