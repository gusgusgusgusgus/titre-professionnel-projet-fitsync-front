// Thunks created to fetch Activities from the API to serve their data to the app.
// using async thunks from toolkit
import { createAsyncThunk } from '@reduxjs/toolkit';

// Import de l'instance axios pour fetch l'api
import instanceAxios from '../../axios/axiosInstance';

const actionThunkFetchActivities = createAsyncThunk(
  // naming the action type (best-practice from Solène)
  'activities/FETCH_ACTIVITIES',

  // the callback to go fetch Activities data on API
  async () => {
    const response = await instanceAxios.get('/activities');
    // console.log(
    //   'thunk FetchActivities executed, API call, response : ',
    //   response.data.data
    // );

    return response.data.data;
  }
);

export default actionThunkFetchActivities;
