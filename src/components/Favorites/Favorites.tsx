import { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Link,
  Typography,
  Card,
  CardContent,
  Grid,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import thunkFetchFavorites from '../../store/thunks/thunkFetchFavorites';
import thunkDeleteFavorite from '../../store/thunks/thunkDeleteFavorite';

import Header from '../Base/Header/Header';
import Footer from '../Base/Footer/Footer';
import DesktopHeader from '../Base/Header/DesktopHeader';
import DesktopFooter from '../Base/Footer/DesktopFooter';

export default function Favorites() {
  const dispatch = useAppDispatch();
  const favoritesList = useAppSelector(
    (state) => state.favorites.favoritesList
  );

  useEffect(() => {
    dispatch(thunkFetchFavorites());
  }, [dispatch]);

  // Utilisation du thème pour récupérer la couleur primaire
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  // Fonction de gestion de la suppression
  const handleDeleteFavorite = (activityId: number) => {
    dispatch(thunkDeleteFavorite(activityId));
  };

  return (
    <>
      {isDesktop ? <DesktopHeader /> : <Header />}
      <main>
        <Container
          component="main"
          maxWidth="md"
          sx={{ mt: 10, paddingBottom: 10, color: theme.palette.text.primary }}
        >
          <Typography variant="h3" component="h1" gutterBottom>
            Favorites
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mb={4}
            width="100%"
          >
            <Button
              fullWidth
              variant="contained"
              color="primary"
              component={RouterLink}
              to="/category-list"
            >
              Add New Activity
            </Button>
          </Box>
          <Grid container spacing={2}>
            {favoritesList.map((favorite) => (
              <Grid item xs={12} sm={6} key={favorite.activity_id}>
                <Card>
                  <CardContent>
                    <Link
                      component={RouterLink}
                      to={`/activity/${favorite.activity_id}`}
                      underline="none"
                      color="inherit"
                    >
                      <Typography variant="h6" gutterBottom>
                        {favorite.activity_name}
                      </Typography>
                      <Typography variant="body2" color="primary">
                        MET: {favorite.activity_met}
                      </Typography>
                    </Link>
                  </CardContent>
                  <Box mt={2} mb={2} ml={2} mr={2}>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={() => handleDeleteFavorite(favorite.activity_id)}
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
          <Box mt={5} />
        </Container>
      </main>
      {isDesktop ? <DesktopFooter /> : <Footer />}
    </>
  );
}
