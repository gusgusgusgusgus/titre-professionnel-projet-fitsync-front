// Import of libraries or technical components
import { Link } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
  useTheme,
  Grid,
  useMediaQuery,
} from '@mui/material';
import {
  Bed,
  DirectionsBike,
  DirectionsCar,
  DirectionsRun,
  DirectionsWalk,
  FitnessCenter,
  Handyman,
  Home as HomeIcon,
  LocalFlorist,
  MoreHoriz,
  Pool,
  Radar,
  Snowboarding,
  Spa,
  SpatialAudio,
  SportsGymnastics,
  SportsHandball,
  TempleHindu,
  VideogameAsset,
  VolunteerActivism,
  Weekend,
  Work,
} from '@mui/icons-material';
import { useAppSelector } from '../../hooks/redux-hooks';

// Import of sub-components
import Header from '../Base/Header/Header';
import Footer from '../Base/Footer/Footer';
import DesktopHeader from '../Base/Header/DesktopHeader';
import DesktopFooter from '../Base/Footer/DesktopFooter';

// Mapping of activity names to icons
const activityIcons = {
  Bicycling: DirectionsBike,
  'Conditionning Exercise': FitnessCenter,
  Dancing: SportsGymnastics,
  'Fishing & Hunting': Radar,
  'Home Activities': HomeIcon,
  'Home Repair': Handyman,
  Inactivity: Weekend,
  'Lawn & Garden': LocalFlorist,
  Miscellaneous: MoreHoriz,
  'Music Playing': SpatialAudio,
  Occupation: Work,
  Running: DirectionsRun,
  'Self Care': Spa,
  'Sexual Activity': Bed,
  Sports: SportsHandball,
  Transportation: DirectionsCar,
  Walking: DirectionsWalk,
  'Water Activities': Pool,
  'Winter Activities': Snowboarding,
  'Religious Activities': TempleHindu,
  'Volunteer Activities': VolunteerActivism,
  'Video Games': VideogameAsset,
};

export default function CategoryList() {
  // -- STATE REDUX --
  const categoriesList = useAppSelector(
    (state) => state.categories.categoriesList
  );
  console.log(categoriesList);

  // Utilisation du thème pour récupérer la couleur primaire
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  return (
    <>
      {isDesktop ? <DesktopHeader /> : <Header />}
      <Container
        component="main"
        maxWidth="md"
        sx={{ mt: 10, pb: 5, color: theme.palette.text.primary }}
      >
        <Typography variant="h3" component="h1" gutterBottom>
          Categories
        </Typography>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          mb={4}
          width="100%"
        >
          <Grid container spacing={2}>
            {[...categoriesList]
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((category) => {
                const IconComponent = activityIcons[category.name];
                return (
                  <Grid item xs={12} sm={6} key={category.id}>
                    <Link
                      to={`/category-list/${category.id}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <Card
                        sx={{
                          boxShadow: 3,
                          display: 'flex',
                          flexDirection: 'column',
                          height: '100%',
                        }}
                      >
                        <CardHeader
                          title={category.name}
                          action={
                            <IconComponent
                              color="primary"
                              sx={{ fontSize: 28 }}
                            />
                          }
                          sx={{
                            borderBottom: `1px solid ${theme.palette.divider}`,
                          }}
                        />
                        <CardContent sx={{ flexGrow: 1 }} />
                      </Card>
                    </Link>
                  </Grid>
                );
              })}
          </Grid>
        </Box>
      </Container>
      {isDesktop ? <DesktopFooter /> : <Footer />}
    </>
  );
}
