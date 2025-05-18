/* eslint-disable @typescript-eslint/no-unused-vars */
// Import of librairies or technical components
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import {
  Box,
  Button,
  TextField,
  Typography,
  List,
  ListItem,
  Card,
  CardContent,
  Divider,
  InputAdornment,
  Container,
  OutlinedInput,
  useMediaQuery,
  useTheme,
  IconButton,
  Chip,
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Add as AddIcon,
  Delete,
  Search as SearchIcon,
} from '@mui/icons-material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';

import IActivity from '../../@types/activity';

import Header from '../Base/Header/Header';
import Footer from '../Base/Footer/Footer';
import DesktopHeader from '../Base/Header/DesktopHeader';
import thunkAddNewSession from '../../store/thunks/thunkAddNewSession';
import actionThunkFetchSessions from '../../store/thunks/thunkFetchSessions';
import DesktopFooter from '../Base/Footer/DesktopFooter';
import thunkDeleteSession from '../../store/thunks/thunkDeleteSession';

function NewSession() {
  const dispatch = useAppDispatch();

  // -- NEW SESSION STATES --
  const [newSessionComment, setNewSessionComment] = useState('');
  const [newSessionDuration, setNewSessionDuration] = useState('');
  const [newSessionActivityId, setNewSessionActivityId] = useState('');
  const [newSessionDateTime, setNewSessionDateTime] = useState('');

  // -- LIST SESSIONS SELECTOR --
  const sessionsList = useAppSelector((state) => state.sessions.sessionsList);

  useEffect(() => {
    dispatch(actionThunkFetchSessions());
  }, [dispatch]);

  // -- LIST ACTIVITIES SELECTOR --
  const activitiesList = useAppSelector(
    (state) => state.activities.activitiesList
  );

  // -- MANAGEMENT OF PRESELECTED ACTIVITY
  // if "/new" is at the en of  URL, there will be no pre selected activity
  // if something else than "/new" ("/1" for example) is at the end of the URL, there will be a pre selected activity with a corresponding activity ID that will be provided to the page
  const { activityIdFromUrl } = useParams();
  const idFromUrl = Number(activityIdFromUrl);

  let preSelectedActivity = false;
  if (activityIdFromUrl !== 'new') {
    preSelectedActivity = true;
  }

  const activityToDisplay = activitiesList.find(
    (activity) => activity.id === idFromUrl
  );

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  // -- LOCAL UTILS STATES --
  const [activityName, setActivityName] = useState('');
  const [searchActivities, setSearchActivities] = useState('');
  const [filteredActivities, setFilteredActivities] = useState<IActivity[]>([]);
  const currentDateTime = dayjs();

  const handleSearch = (event) => {
    setSearchActivities(event.target.value);
    if (event.target.value === '') {
      setFilteredActivities([]);
    } else {
      setFilteredActivities(
        activitiesList.filter((activity) =>
          activity.name.toLowerCase().includes(event.target.value.toLowerCase())
        )
      );
    }
  };
  const handleNewSessionDuration = (event) => {
    setNewSessionDuration(event.target.value);
  };

  const handleNewSessionComment = (event) => {
    setNewSessionComment(event.target.value);
  };

  const handleSelectActivity = (activityId: number, activityName: string) => {
    setNewSessionActivityId(activityId); // Définit l'ID de l'activité sélectionnée
    setSearchActivities(activityName); // Met à jour le terme de recherche avec le nom de l'activité
    setFilteredActivities([]); // Réinitialise la liste des activités filtrées
  };

  const handlePreSelectedActivity = (idFromUrl) => {
    setNewSessionActivityId(idFromUrl);
  };

  // SUBMIT NEW SESSION
  const handleSubmitAddSession = () => {
    // Créer un objet représentant la nouvelle session avec le commentaire
    const newSession = {
      duration: newSessionDuration,
      activityId: newSessionActivityId,
      date: newSessionDateTime,
      comment: newSessionComment,
    };

    console.log(newSession);

    // Envoyer la nouvelle session à la base de données en utilisant le thunkAddNewSession
    dispatch(thunkAddNewSession(newSession));

    // Réinitialiser le champ de commentaire après l'ajout de la session
    setNewSessionDuration('');
    setNewSessionComment('');
    setNewSessionActivityId('');
    setSearchActivities('');
  };

  // Fonction de gestion de la suppression
  const handleDeleteSession = (sessionId: number) => {
    dispatch(thunkDeleteSession(sessionId));
  };

  return (
    <>
      {isDesktop ? <DesktopHeader /> : <Header />}
      <main>
        <Container
          maxWidth="md"
          sx={{
            marginTop: 10,
          }}
        >
          <Typography variant="h3" component="h1" gutterBottom>
            New Session
          </Typography>
          <Card sx={{ mb: 4, boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h5" color="action.disabled" gutterBottom>
                My Last Sessions
              </Typography>
              <List>
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
                        <Typography variant="body1" color="primary">
                          MET {session.activity_met}
                        </Typography>
                      </Box>
                      <Chip
                        label="DELETE"
                        size="small"
                        aria-label="delete"
                        onClick={() => handleDeleteSession(session.id)}
                        sx={{ fontSize: '0.60rem', height: '24px' }}
                      />
                    </ListItem>
                    {index < sessionsList.slice(-3).length - 1 && <Divider />}
                  </Box>
                ))}
              </List>
            </CardContent>
          </Card>

          {!preSelectedActivity && (
            <Box display="flex" flexDirection="column" mb={2}>
              <TextField
                label="Search Activities"
                variant="outlined"
                value={searchActivities}
                onChange={(event) => {
                  handleSearch(event);
                  setActivityName(event.target.value);
                }}
                sx={{ mb: 2 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
              {filteredActivities.length > 0 && (
                <Box
                  sx={{
                    maxHeight: '200px',
                    overflowY: 'auto',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                  }}
                >
                  <List>
                    {filteredActivities.map((activity) => (
                      <ListItem
                        key={activity.id}
                        onClick={() =>
                          handleSelectActivity(activity.id, activity.name)
                        }
                      >
                        {activity.name}
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}
            </Box>
          )}

          {preSelectedActivity && (
            <>
              <Typography variant="h6" gutterBottom>
                Selected Activity
              </Typography>
              <Card
                sx={{
                  alignItems: 'flex-center',
                  display: 'flex',
                  justifyContent: 'space-between',
                  mb: 4,
                  boxShadow: 3,
                }}
              >
                <Typography
                  variant="h6"
                  color="primary"
                  gutterBottom
                  sx={{ margin: 3 }}
                >
                  {activityToDisplay?.name}
                </Typography>
                <Button
                  variant="contained"
                  endIcon={<CheckCircleIcon />}
                  sx={{
                    margin: 3,
                    bgcolor: '#adfa1d',
                    '&:hover': {
                      bgcolor: '#8bcc0f',
                    },
                  }}
                  onClick={() => handlePreSelectedActivity(idFromUrl)}
                >
                  Confirm the selected activity
                </Button>
              </Card>
            </>
          )}

          <Typography variant="h6" gutterBottom>
            Date & Time
          </Typography>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              defaultValue={currentDateTime}
              sx={{ width: '100%', mb: 5 }}
              slotProps={{ textField: { fullWidth: true } }}
              onChange={(newValue) => {
                if (newValue !== null) {
                  setNewSessionDateTime(newValue.toISOString());
                }
              }}
            />
          </LocalizationProvider>

          <Typography variant="h6" gutterBottom>
            Duration
          </Typography>
          <Box display="flex" mb={2}>
            <OutlinedInput
              fullWidth
              type="number"
              placeholder="Enter duration"
              value={newSessionDuration}
              onChange={handleNewSessionDuration}
              endAdornment={
                <InputAdornment position="end">minutes</InputAdornment>
              }
            />
          </Box>

          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Add a comment..."
            variant="outlined"
            margin="normal"
            value={newSessionComment}
            onChange={handleNewSessionComment}
          />
          <Button
            variant="contained"
            fullWidth
            endIcon={<AddIcon />}
            sx={{
              marginTop: 3,
              marginBottom: 10,
              bgcolor: '#adfa1d',
              '&:hover': {
                bgcolor: '#8bcc0f',
              },
            }}
            onClick={handleSubmitAddSession}
          >
            Add Session
          </Button>
        </Container>
      </main>
      {isDesktop ? <DesktopFooter /> : <Footer />}
    </>
  );
}

export default NewSession;
