/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/function-component-definition */
import React from 'react';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
  CssBaseline,
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  Button,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Add as AddIcon, Favorite as FavoriteIcon } from '@mui/icons-material';

import { useParams, useNavigate } from 'react-router-dom';

import Header from '../Base/Header/Header';
import Footer from '../Base/Footer/Footer';
import DesktopHeader from '../Base/Header/DesktopHeader';
import DesktopFooter from '../Base/Footer/DesktopFooter';

import { useAppSelector, useAppDispatch } from '../../hooks/redux-hooks';

import thunkAddFavorite from '../../store/thunks/thunkAddFavorite';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#adfa1d',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

const ActivityId: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { activityId } = useParams();
  const idFromUrl = Number(activityId);
  const activities = useAppSelector((state) => state.activities.activitiesList);
  const activityToDisplay = activities.find(
    (activity) => activity.id === idFromUrl
  );
  const categories = useAppSelector((state) => state.categories.categoriesList);
  const categoryToDisplay = categories.find(
    (category) => category.id === activityToDisplay?.category_id
  );

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const handleAddToFavorites = async () => {
    const favoriteActivityId = Number(activityId);
    await dispatch(thunkAddFavorite(favoriteActivityId));
    navigate('/favorites');
  };

  const handleSelectThisActivity = () => {
    navigate(`/new-session/${idFromUrl}`);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {isDesktop ? <DesktopHeader /> : <Header />}
      <main>
        <Container
          maxWidth="md"
          sx={{
            marginTop: 10,
          }}
        >
          <Typography variant="h3" component="h1" gutterBottom>
            {categoryToDisplay?.name}
          </Typography>
          <Card sx={{ mb: 2, boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="h5">{activityToDisplay?.name}</Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body1" color="textSecondary">
                Description of the activity goes here.
              </Typography>
            </CardContent>
          </Card>
          <Button
            variant="contained"
            color="secondary"
            className="form--btn"
            fullWidth
            sx={{ mb: 2 }}
            endIcon={<FavoriteIcon />}
            onClick={handleAddToFavorites}
          >
            Add to my favorite activities
          </Button>
          <Button
            variant="contained"
            color="primary"
            className="form--btn"
            fullWidth
            endIcon={<AddIcon />}
            onClick={handleSelectThisActivity}
          >
            Select this activity
          </Button>
        </Container>
      </main>
      {isDesktop ? <DesktopFooter /> : <Footer />}
    </ThemeProvider>
  );
};

export default ActivityId;
