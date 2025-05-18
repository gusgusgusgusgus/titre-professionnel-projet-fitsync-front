// Import of librairies or technical components
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import instanceAxios from '../../axios/axiosInstance';

// Import of RootState
// eslint-disable-next-line import/no-cycle
import { RootState } from '../store';

const actionLogout = createAsyncThunk('user/LOGOUT', async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState() as RootState;
    const response = await instanceAxios.post('/logout');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
    return thunkAPI.rejectWithValue('An unknown error occurred');
  }
});

export default actionLogout;
