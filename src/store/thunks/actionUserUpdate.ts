/* eslint-disable no-useless-catch */
import { createAsyncThunk } from '@reduxjs/toolkit';
import instanceAxios from '../../axios/axiosInstance';

export const actionUserUpdate = createAsyncThunk(
  'user/UPDATE_USER',
  async (
    updatedUser: {
      pseudo?: string;
      mail?: string;
      height?: number;
      gender?: string;
      birthdate?: string;
      objective?: number;
    },
    thunkAPI
  ) => {
    try {
      const response = await instanceAxios.patch('/users', updatedUser);

      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        'An error occurred while updating user data'
      );
    }
  }
);

export const actionChangePassword = createAsyncThunk(
  'user/CHANGE_PASSWORD',
  async (password: string, thunkAPI) => {
    try {
      const response = await instanceAxios.patch('/users', {
        password,
      });
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        'An error occurred while updating user password'
      );
    }
  }
);
