// Thunks created to fetch Categories from the API to serve their data to the app.
// using async thunks from toolkit

import { createAsyncThunk } from '@reduxjs/toolkit';
// Import de l'instance axios pour fetch l'api
import instanceAxios from '../../axios/axiosInstance';

// import of RootState type in order to manage dependency cycle
// import type { RootState } from '../store/store';

const actionThunkFetchCategories = createAsyncThunk(
  // naming the action type (best-practice from Solène)
  'categories/FETCH_CATEGORIES',

  // the callback to go fetch Categories data on API
  async () => {
    const response = await instanceAxios.get('/categories');
    // console.log(
    //   'thunk FetchCategories executed, API call, response : ',
    //   response.data.data
    // );

    return response.data.data;
  }
);

export default actionThunkFetchCategories;
