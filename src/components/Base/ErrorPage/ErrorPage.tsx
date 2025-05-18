// Import of librairies or technical components
import { Link } from 'react-router-dom';
import { Container, Box, Typography, Button } from '@mui/material';
import { useAppSelector } from '../../../hooks/redux-hooks';

// Import of sub-components
import DisconnectedHeader from '../Header/DisconnectedHeader';
import DisconnectedFooter from '../Footer/DisconnectedFooter';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

export default function ErrorPage() {
  const logged = useAppSelector((state) => state.user.logged);

  return (
    <>
      {!logged && <DisconnectedHeader />}
      {logged && <Header />}

      <Container component="main" maxWidth="md" sx={{ mt: 10 }}>
        <Typography variant="h3" component="h1" color="primary" gutterBottom>
          Got lost?
        </Typography>
        <Typography variant="h5" paragraph>
          You can go back to homepage by clicking the button bellow.
        </Typography>
        <Box textAlign="center" sx={{ mt: 4 }}>
          {logged && (
            <Button
              component={Link}
              to="/home"
              variant="contained"
              color="primary"
              size="large"
              sx={{ mt: 20 }}
            >
              Please bring me back
            </Button>
          )}
          {!logged && (
            <Button
              component={Link}
              to="/"
              variant="contained"
              color="primary"
              size="large"
              sx={{ mt: 20 }}
            >
              Please bring me back
            </Button>
          )}
        </Box>
      </Container>
      {!logged && <DisconnectedFooter />}
      {logged && <Footer />}
    </>
  );
}
