import React, { FormEvent, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import LoginIcon from '@mui/icons-material/Login';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { actionChangeCredential } from '../../store/reducers/userReducer';
import actionLogin from '../../store/thunks/actionLogin';

import DisconnectedHeader from '../Base/Header/DisconnectedHeader';
import DisconnectedFooter from '../Base/Footer/DisconnectedFooter';

export default function Login() {
  const pseudo = useAppSelector((state) => state.user.credentials.pseudo ?? '');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loginError = useAppSelector((state) => state.user.error);
  const logged = useAppSelector((state) => state.user.logged);
  const role = useAppSelector((state) => state.user.role);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(
      actionChangeCredential({ name: name as 'pseudo' | 'password', value })
    );
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(actionLogin()).then((result) => {
      if (actionLogin.fulfilled.match(result)) {
        if (role === 'user') {
          navigate('/home');
        } else if (role === 'admin') {
          navigate('/home-admin');
        }
      }
    });
  };

  useEffect(() => {
    if (logged) {
      if (role === 'user') {
        navigate('/home');
      } else if (role === 'admin') {
        navigate('/home-admin');
      }
    }
  }, [logged, navigate, role]);

  return (
    <>
      <DisconnectedHeader />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 15,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Hello dear user !
          </Typography>
          <Typography component="p">Please login to access the app</Typography>
          {loginError && <Typography color="error">{loginError}</Typography>}
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="pseudo"
              label="Your pseudo"
              name="pseudo"
              autoComplete="pseudo"
              autoFocus
              onChange={handleInputChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Your password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleInputChange}
            />
            <Link to="/reset-password">
              <Typography variant="body2">
                I forgot my password, let&lsquo;s reset it
              </Typography>
            </Link>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
              endIcon={<LoginIcon />}
            >
              Login
            </Button>
            <Link to="/signup">
              <Typography variant="body2">
                You don&lsquo;t have an account yet? Register here
              </Typography>
            </Link>
          </Box>
        </Box>
      </Container>
      <DisconnectedFooter />
    </>
  );
}
