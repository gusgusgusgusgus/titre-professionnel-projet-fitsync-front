/* eslint-disable prefer-destructuring */
/* eslint-disable no-useless-catch */
import { createAsyncThunk } from '@reduxjs/toolkit';
import instanceAxios from '../../axios/axiosInstance';

const actionWeightUpdate = createAsyncThunk(
  'weight/UPDATE_WEIGHT',
  async ({ weight, date }, thunkAPI) => {
    try {
      const response = await instanceAxios.post('/weight', {
        weight,
        date,
      });
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        'An error occurred while updating user weight'
      );
    }
  }
);

const fetchWeight = createAsyncThunk('weight/FETCH_WEIGHT', async () => {
  try {
    const response = await instanceAxios.get('/weight');
    const data = response.data.data;
    if (data.length <= 1) {
      return null;
    }
    return data[data.length - 1];
  } catch (error) {
    throw error;
  }
});

const fetchGraphicWeight = createAsyncThunk(
  'weight/FETCH_GRAPHIC_WEIGHT',
  async () => {
    try {
      const response = await instanceAxios.get('/weight');
      const data = response.data.data;

      const formattedData = data
        .map((entry) => ({
          weight: parseFloat(entry.value),
          date: new Date(entry.date).toISOString().split('T')[0],
        }))
        .slice(1);

      return formattedData;
    } catch (error) {
      throw error;
    }
  }
);

export { actionWeightUpdate, fetchWeight, fetchGraphicWeight };
