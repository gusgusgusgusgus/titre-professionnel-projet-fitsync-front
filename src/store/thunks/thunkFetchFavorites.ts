import { createAsyncThunk } from '@reduxjs/toolkit';
// Import de l'instance axios pour fetch l'api
import instanceAxios from '../../axios/axiosInstance';

const actionThunkFetchFavorites = createAsyncThunk(
  'favorites/FETCH_GET_FAVORITES',

  async () => {
    const response = await instanceAxios.get('/favorites');

    return response.data.data;
  }
);

export default actionThunkFetchFavorites;
