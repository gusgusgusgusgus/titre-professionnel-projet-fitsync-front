import { createAsyncThunk } from '@reduxjs/toolkit';
import instanceAxios from '../../axios/axiosInstance';

const thunkDeleteFavorite = createAsyncThunk(
  'favorites/DELETE_FAVORITE',

  async (activityId: number) => {
    await instanceAxios.delete(`/favorites/${activityId}`);
    return activityId;
  }
);

export default thunkDeleteFavorite;
