/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-unescaped-entities */
import {
  Container,
  Box,
  Typography,
  Button,
  TextField,
  FormControl,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import DisconnectedFooter from '../Base/Footer/DisconnectedFooter';
import DisconnectedHeader from '../Base/Header/DisconnectedHeader';
import Header from '../Base/Header/Header';
import DesktopHeader from '../Base/Header/DesktopHeader';

import { useAppSelector } from '../../hooks/redux-hooks';
import Footer from '../Base/Footer/Footer';
import DesktopFooter from '../Base/Footer/DesktopFooter';

export default function Contact() {
  const logged = useAppSelector((state) => state.user.logged);
  const theme = useTheme();

  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  return (
    <>
      {logged ? (
        isDesktop ? (
          <DesktopHeader />
        ) : (
          <Header />
        )
      ) : (
        <DisconnectedHeader />
      )}
      <Container component="main" maxWidth="md" sx={{ mt: 10 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Admin support
        </Typography>
        <Typography variant="h6" paragraph lineHeight="normal">
          Our dedicated support team is here to assist you with any questions or
          issues you may have. Please fill out the form below and we'll get back
          to you as soon as possible.
        </Typography>
        <Box textAlign="center" sx={{ mt: 4 }}>
          <FormControl
            component="form"
            style={{
              display: 'flex',
              flexDirection: 'column',
              maxWidth: '400px',
              margin: 'auto',
            }}
          >
            <TextField label="Nom" name="name" margin="normal" required />
            <TextField
              label="Email"
              name="email"
              type="email"
              margin="normal"
              required
            />
            <TextField
              label="Message"
              name="message"
              multiline
              rows={4}
              margin="normal"
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              sx={{ mt: 3 }}
            >
              Envoyer le message
            </Button>
          </FormControl>
        </Box>
      </Container>
      {logged ? (
        isDesktop ? (
          <DesktopFooter />
        ) : (
          <Footer />
        )
      ) : (
        <DisconnectedFooter />
      )}
    </>
  );
}
