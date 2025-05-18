// Import of librairies or technical components
import {
  useMediaQuery,
  useTheme,
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
} from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux-hooks';

// Import of sub-components
import Header from '../Base/Header/Header';
import Footer from '../Base/Footer/Footer';
import DesktopHeader from '../Base/Header/DesktopHeader';
import DesktopFooter from '../Base/Footer/DesktopFooter';

// Stylesheet
import './CategoryId.scss';

export default function CategoryId() {
  // -- STATE REDUX --
  // Je récupère toutes les catégories de l'état
  const categories = useAppSelector((state) => state.categories.categoriesList);
  // Je récupère toutes les activités de l'état
  const activities = useAppSelector((state) => state.activities.activitiesList);

  // J'utilise l'id de la catégorie de l'URL de la page
  const { categoryId } = useParams();
  const idFromUrl = Number(categoryId);

  // Je sélectionne la catégorie de l'état correspondant à l'id de la catégorie de l'URL
  const categoryToDisplay = categories.find(
    (category) => category.id === idFromUrl
  );
  // Je sélectionne toutes les activités de l'état correspondant à l'id de la catégorie de l'URL
  const activitiesToDisplay = activities.filter(
    (activity) => activity.category_id === idFromUrl
  );

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <>
      {isDesktop ? <DesktopHeader /> : <Header />}
      <main>
        <Container
          maxWidth="md"
          sx={{
            marginTop: 10,
            paddingBottom: 10,
          }}
        >
          <Typography variant="h3" component="h1" gutterBottom>
            {categoryToDisplay?.name}
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mb={4}
            width="100%"
          >
            <Grid container spacing={2}>
              {activitiesToDisplay
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((activity) => (
                  <Grid item xs={12} sm={6} key={activity.id}>
                    <Card
                      sx={{
                        boxShadow: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                      }}
                    >
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Link
                          to={`/activity/${activity.id}`}
                          style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                          <Typography
                            variant="h6"
                            component="h2"
                            sx={{
                              mb: 2,
                              pb: 1,
                              borderBottom: `1px solid ${theme.palette.divider}`,
                            }}
                          >
                            {activity.name}
                          </Typography>
                          <Typography variant="body2" color="primary">
                            MET: {activity.met}
                          </Typography>
                        </Link>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              <Grid item xs={12} sm={12}>
                <Button fullWidth variant="contained" color="primary">
                  Request Activity +
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </main>
      {isDesktop ? <DesktopFooter /> : <Footer />}
    </>
  );
}
