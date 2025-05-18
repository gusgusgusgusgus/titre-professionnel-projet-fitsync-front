// Import of librairies or technical components
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import instanceAxios from '../../axios/axiosInstance';

const actionCheckLogin = createAsyncThunk(
  'user/CHECK_LOGIN',
  async (_, thunkAPI) => {
    try {
      const response = await instanceAxios.get('/users');
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.response?.data);
      }

      return thunkAPI.rejectWithValue('An unknown error occurred');
    }
  }
);

export default actionCheckLogin;
