/* eslint-disable no-console */
// Import of libraries or technical components
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
// Import des bibliothèques ou des composants techniques

import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
  useTheme,
  Grid,
  Button,
  useMediaQuery,
} from '@mui/material';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import actionThunkFetchSessions from '../../store/thunks/thunkFetchSessions';
import thunkDeleteSession from '../../store/thunks/thunkDeleteSession';

// Import des sous-composants
import Header from '../Base/Header/Header';
import Footer from '../Base/Footer/Footer';
import DesktopHeader from '../Base/Header/DesktopHeader';
import DesktopFooter from '../Base/Footer/DesktopFooter';

export default function History() {
  // -- STATE REDUX --
  const dispatch = useAppDispatch();
  const sessionsList = useAppSelector((state) => state.sessions.sessionsList);
  console.log(sessionsList);

  useEffect(() => {
    dispatch(actionThunkFetchSessions());
  }, [dispatch]);

  // Utilisation du thème pour récupérer la couleur primaire
  const theme = useTheme();

  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  // Fonction de gestion de la suppression
  const handleDeleteSession = (sessionId: number) => {
    dispatch(thunkDeleteSession(sessionId));
  };

  return (
    <>
      {isDesktop ? <DesktopHeader /> : <Header />}
      <Container
        component="main"
        maxWidth="md"
        sx={{ mt: 10, paddingBottom: 10, color: theme.palette.text.primary }}
      >
        <Typography variant="h3" component="h1" gutterBottom>
          History
        </Typography>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          mb={4}
          width="100%"
        >
          <Grid container spacing={2}>
            {sessionsList.map((session) => (
              <Grid item xs={12} sm={6} key={session.id}>
                <Card
                  sx={{
                    boxShadow: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                  }}
                >
                  <CardHeader
                    title={
                      <div>
                        <Link
                          to={`/history/${session.id}`}
                          style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                          <Typography variant="body2" color="primary">
                            {dayjs(session.date).format('MM.DD.YYYY')}
                          </Typography>
                          <Typography variant="body2" color="primary">
                            {dayjs(session.date).format('HH:mm')}
                          </Typography>
                          {session.activity_name}
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            sx={{ mt: 2 }}
                          >
                            Duration: {session.duration} mn
                          </Typography>
                        </Link>
                        <hr
                          style={{
                            width: '100%',
                            border: `none`,
                            borderTop: `1px solid ${theme.palette.divider}`,
                            margin: `16px 0 8px`,
                          }}
                        />
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          sx={{ mt: 1 }}
                        >
                          {' '}
                          Comment: {session.comment}
                        </Typography>
                      </div>
                    }
                  />
                  <Box mt={2} mb={2} ml={2} mr={2}>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={() => handleDeleteSession(session.id)}
                      sx={{
                        color: theme.palette.text.disabled,
                        backgroundColor: theme.palette.action.hover,
                      }}
                    >
                      DELETE
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
      {isDesktop ? <DesktopFooter /> : <Footer />}
    </>
  );
}
