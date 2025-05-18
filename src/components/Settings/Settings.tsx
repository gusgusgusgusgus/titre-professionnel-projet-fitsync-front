/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  ListItemText,
  TextField,
  Typography,
  Modal,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import { AccountCircle } from '@mui/icons-material';
import { useAppSelector, useAppDispatch } from '../../hooks/redux-hooks';
import Header from '../Base/Header/Header';
import Footer from '../Base/Footer/Footer';
import DesktopHeader from '../Base/Header/DesktopHeader';
import {
  actionUserUpdate,
  actionChangePassword,
} from '../../store/thunks/actionUserUpdate';
import {
  fetchWeight,
  actionWeightUpdate,
} from '../../store/thunks/actionWeightUpdate';
import DesktopFooter from '../Base/Footer/DesktopFooter';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const genders = ['male', 'female'];

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function Settings() {
  const dispatch = useAppDispatch();
  const pseudo = useAppSelector((state) => state.user.credentials.pseudo);
  const mail = useAppSelector((state) => state.user.mail);
  const gender = useAppSelector((state) => state.user.gender);
  const birthdate = useAppSelector((state) => state.user.birthdate);
  const weight = useAppSelector((state) => state.weight.value);
  const weightDate = useAppSelector((state) => state.weight.date);
  const height = useAppSelector((state) => state.user.height);

  const avatarUrl = 'public/1.jpg';
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const formattedBirthdate = birthdate
    ? new Date(birthdate).toISOString().split('T')[0]
    : '';

  const [newWeight, setNewWeight] = useState('');
  const [newWeightDate, setNewWeightDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [personName, setPersonName] = useState<string[]>([gender]);

  const [openModal, setOpenModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      typeof value === 'string' ? value.split(',') : (value as string[])
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = e.target;
    const updatedUser = {};
    const updatedWeight = parseFloat(newWeight);

    const newPseudo = formData.pseudo.value;
    if (newPseudo !== pseudo) {
      updatedUser.pseudo = newPseudo;
    }

    const newEmail = formData.mail.value;
    if (newEmail !== mail) {
      updatedUser.mail = newEmail;
    }

    const newHeight = parseFloat(formData.height.value);
    if (!isNaN(newHeight) && newHeight !== height) {
      updatedUser.height = newHeight;
    }

    const newGender = personName[0];
    if (newGender !== gender) {
      updatedUser.gender = newGender;
    }

    const newBirthdate = formData.birthdate.value;
    if (newBirthdate !== formattedBirthdate) {
      updatedUser.birthdate = newBirthdate;
    }

    if (!isNaN(updatedWeight)) {
      await dispatch(
        actionWeightUpdate({ weight: updatedWeight, date: newWeightDate })
      );
      setNewWeight('');
      setNewWeightDate(new Date().toISOString().split('T')[0]);
    }

    if (Object.keys(updatedUser).length > 0) {
      await dispatch(actionUserUpdate(updatedUser));
    }
    await dispatch(fetchWeight());
  };

  useEffect(() => {
    dispatch(fetchWeight());
  }, [dispatch]);

  useEffect(() => {}, [weight, weightDate]);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handlePasswordChange = async () => {
    if (newPassword !== confirmNewPassword) {
      setPasswordMismatch(true);
      return;
    }

    await dispatch(actionChangePassword(newPassword));
    setPasswordMismatch(false);
    handleCloseModal();
  };

  return (
    <>
      {isDesktop ? <DesktopHeader /> : <Header />}
      <Container component="main" maxWidth="sm" sx={{ mt: 10 }}>
        <Box
          sx={{
            marginTop: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'left',
          }}
        >
          <Box
            sx={{
              display: 'block',
            }}
          >
            <AccountCircle sx={{ fontSize: 60 }} />
            <Typography variant="h3" component="h1" gutterBottom>
              {pseudo}'s Settings
            </Typography>
          </Box>
          <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit}>
            <Typography
              component="h2"
              variant="h6"
              color="action.disabled"
              sx={{ mt: 2, mb: 1 }}
            >
              User Infos
            </Typography>
            <TextField
              margin="normal"
              fullWidth
              id="birthdate"
              label="Birthdate"
              name="birthdate"
              type="date"
              defaultValue={formattedBirthdate}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="gender-label">Gender</InputLabel>
              <Select
                labelId="gender-label"
                id="gender"
                value={personName}
                onChange={handleChange}
                input={<OutlinedInput label="Gender" />}
                MenuProps={MenuProps}
              >
                {genders.map((gender) => (
                  <MenuItem key={gender} value={gender}>
                    <ListItemText primary={gender} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              margin="normal"
              fullWidth
              id="height"
              label="Height (cm)"
              name="height"
              type="number"
              defaultValue={height}
            />
            <Typography
              component="h2"
              variant="h6"
              color="action.disabled"
              sx={{ mt: 3, mb: 1 }}
            >
              User Weight
            </Typography>
            {weight !== null && (
              <div>
                <Typography>
                  Current Weight: {weight} kg (Date:{' '}
                  {weightDate
                    ? new Date(weightDate).toLocaleDateString()
                    : 'N/A'}
                  )
                </Typography>
              </div>
            )}
            <TextField
              margin="normal"
              fullWidth
              id="newWeight"
              label="New Weight (kg)"
              name="newWeight"
              type="number"
              value={newWeight}
              onChange={(e) => setNewWeight(e.target.value)}
            />
            <TextField
              margin="normal"
              fullWidth
              id="newWeightDate"
              label="New Weight Date"
              name="newWeightDate"
              type="date"
              value={newWeightDate}
              onChange={(e) => setNewWeightDate(e.target.value)}
            />
            <Typography
              component="h2"
              variant="h6"
              color="action.disabled"
              sx={{ mt: 3, mb: 1 }}
            >
              User Account
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="pseudo"
              label="Pseudo"
              name="pseudo"
              defaultValue={pseudo}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="mail"
              label="Email"
              name="mail"
              type="email"
              defaultValue={mail}
            />
            <Button onClick={handleOpenModal}>Change Password</Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 13 }}
            >
              Validation
            </Button>
          </Box>
        </Box>
      </Container>
      {isDesktop ? <DesktopFooter /> : <Footer />}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Change Password
          </Typography>
          {passwordMismatch && (
            <Typography variant="body2" color="error">
              Passwords do not match.
            </Typography>
          )}
          <TextField
            margin="normal"
            required
            fullWidth
            id="currentPassword"
            label="Current Password"
            name="currentPassword"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="newPassword"
            label="New Password"
            name="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="confirmNewPassword"
            label="Confirm New Password"
            name="confirmNewPassword"
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
          <Button
            onClick={handlePasswordChange}
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
          >
            Save
          </Button>
        </Box>
      </Modal>
    </>
  );
}
