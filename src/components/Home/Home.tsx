/* eslint-disable react/function-component-definition */
// Import of librairies or technical components
import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  Link as MuiLink,
  Divider,
  useMediaQuery,
  useTheme,
  Link,
  Chip,
} from '@mui/material';
import { AccountCircle, ArrowCircleRightOutlined } from '@mui/icons-material';
import dayjs from 'dayjs';
import { useAppSelector, useAppDispatch } from '../../hooks/redux-hooks';
import thunkFetchFavorites from '../../store/thunks/thunkFetchFavorites';
import actionThunkFetchSessions from '../../store/thunks/thunkFetchSessions';

// Import of sub-components
import Header from '../Base/Header/Header';
import Footer from '../Base/Footer/Footer';
import DesktopHeader from '../Base/Header/DesktopHeader';
import DesktopFooter from '../Base/Footer/DesktopFooter';
import { fetchWeight } from '../../store/thunks/actionWeightUpdate';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  // Pickup from the state of pseudo to say hello
  const pseudo = useAppSelector((state) => state.user.credentials.pseudo);
  const favoritesList = useAppSelector(
    (state) => state.favorites.favoritesList
  );

  // -- LIST SESSIONS SELECTOR --
  const sessionsList = useAppSelector((state) => state.sessions.sessionsList);
  const weight = useAppSelector((state) => state.weight.value);
  const weightDate = useAppSelector((state) => state.weight.date);
  console.log(weight);

  useEffect(() => {
    dispatch(actionThunkFetchSessions());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchWeight());
  }, [dispatch]);

  const theme = useTheme();

  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  useEffect(() => {
    dispatch(thunkFetchFavorites());
  }, [dispatch]);

  // Fonction pour générer un pourcentage aléatoire pour simuler la progression
  const getRandomPercentage = () => Math.floor(Math.random() * 100) + 1;

  return (
    <>
      {isDesktop ? <DesktopHeader /> : <Header />}
      <Container component="main" maxWidth="md" sx={{ mt: 10, pb: 10 }}>
        <Box
          sx={{
            display: 'block',
            justifyContent: 'center',
          }}
        >
          <AccountCircle sx={{ fontSize: 60 }} />
          <Typography variant="h3" component="h1" gutterBottom>
            Hello {pseudo}!
          </Typography>
        </Box>

        <Box display="flex" mb={2} flexDirection="column" width="100%">
          <Card sx={{ width: '100%', boxShadow: 3, borderRadius: 2 }}>
            <CardContent sx={{ paddingTop: '8px' }}>
              {' '}
              <Typography
                variant="h5"
                color="action.disabled"
                gutterBottom
                sx={{ marginBottom: '4px' }}
              >
                Current Weight
              </Typography>
              <Chip
                label={dayjs(weightDate).format('MM-DD-YYYY')}
                size="small"
                aria-label="weight date"
                sx={{
                  fontSize: '0.60rem',
                  height: '24px',
                  mr: 1,
                  mb: 1,
                  mt: 2,
                }}
              />
              <Typography variant="h3" color="primary">
                {weight} kg
              </Typography>
            </CardContent>
          </Card>
        </Box>

        <Card sx={{ mb: 4, boxShadow: 3, borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h5" color="action.disabled" gutterBottom>
              My Favorite Activities
            </Typography>
            <List sx={{ padding: 0 }}>
              {favoritesList.slice(-3).map((favorite, index) => (
                <Link
                  key={favorite.activity_id}
                  component={RouterLink}
                  to={`/activity/${favorite.activity_id}`}
                  color="inherit"
                  underline="none"
                >
                  <Box
                    sx={{
                      backgroundColor: 'action.hover',
                      color: '#fff',
                      borderRadius: '8px',
                      padding: '8px',
                      marginBottom:
                        index < favoritesList.slice(-3).length - 1 ? '8px' : 0,
                    }}
                  >
                    <ListItem
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Typography variant="body1">
                        {favorite.activity_name}
                      </Typography>
                      <ArrowCircleRightOutlined
                        color="primary"
                        sx={{ fontSize: '1.8rem' }}
                      />
                    </ListItem>
                  </Box>
                </Link>
              ))}
            </List>
          </CardContent>
        </Card>
        <Card sx={{ mb: 4, boxShadow: 3, borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h5" color="action.disabled" gutterBottom>
              My Last Sessions
            </Typography>
            <List sx={{ padding: 0 }}>
              {sessionsList.slice(-3).map((session, index) => (
                <Box key={session.id}>
                  <ListItem
                    sx={{
                      pt: index === 0 ? 0 : 2,
                      alignItems: 'flex-start',
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Box sx={{ width: '100%' }}>
                      <Typography variant="body2" color="textSecondary">
                        {dayjs(session.date).format('MM-DD-YYYY HH:mm')}
                      </Typography>
                      <Typography variant="body1" sx={{ marginBottom: 1 }}>
                        {session.activity_name}
                      </Typography>
                      <Typography
                        variant="body1"
                        color="primary"
                        sx={{ marginBottom: 1 }}
                      >
                        MET {session.activity_met}
                      </Typography>
                    </Box>
                  </ListItem>
                  {index < sessionsList.slice(-3).length - 1 && <Divider />}
                </Box>
              ))}
            </List>
          </CardContent>
        </Card>
      </Container>
      {isDesktop ? <DesktopFooter /> : <Footer />}
    </>
  );
};

export default Home;
