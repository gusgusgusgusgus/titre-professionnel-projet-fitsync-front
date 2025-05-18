import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Send } from 'react-feather';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  TextField,
  Typography,
  Alert,
} from '@mui/material';
import { useAppDispatch } from '../../hooks/redux-hooks';
import actionUserSignin from '../../store/thunks/actionUserSignin';
import DisconnectedHeader from '../Base/Header/DisconnectedHeader';
import DisconnectedFooter from '../Base/Footer/DisconnectedFooter';

export default function Signup() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [pseudo, setPseudo] = useState('');
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [conditions, setConditions] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case 'pseudo':
        setPseudo(value);
        break;
      case 'mail':
        setMail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'confirmPassword':
        setConfirmPassword(value);
        break;
      case 'conditions':
        setConditions(event.target.checked);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!pseudo || !mail || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!conditions) {
      setError('You must agree to the Terms and Conditions');
      return;
    }

    const newUser = { pseudo, mail, password };

    dispatch(actionUserSignin(newUser)).then((result) => {
      if (actionUserSignin.fulfilled.match(result)) {
        navigate('/login');
      } else {
        setError('Signup failed. Please try again.');
      }
    });
  };

  return (
    <>
      <DisconnectedHeader />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="h3" component="h1" gutterBottom>
            Hello dear user!
          </Typography>
          <Typography
            component="p"
            variant="body2"
            align="center"
            sx={{ mt: 2 }}
          >
            Please create your account to access the app <br />
            Already have an account? &nbsp;
            <Link to="/login">Login here</Link>
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            {error && <Alert severity="error">{error}</Alert>}
            <TextField
              margin="normal"
              required
              fullWidth
              id="pseudo"
              label="Choose your pseudo"
              name="pseudo"
              autoComplete="pseudo"
              autoFocus
              value={pseudo}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Your email"
              name="mail"
              autoComplete="email"
              value={mail}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Choose your password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm your password"
              type="password"
              id="password--confirm"
              value={confirmPassword}
              onChange={handleChange}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={conditions}
                  onChange={(e) => setConditions(e.target.checked)}
                  color="primary"
                  required
                />
              }
              label="I agree to the Terms and Conditions"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
              endIcon={<Send />}
            >
              Create my account
            </Button>
          </Box>
        </Box>
      </Container>
      <DisconnectedFooter />
    </>
  );
}
