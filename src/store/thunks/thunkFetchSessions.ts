import { createAsyncThunk } from '@reduxjs/toolkit';
// Import de l'instance axios pour fetch l'api
import instanceAxios from '../../axios/axiosInstance';

const actionThunkFetchSessions = createAsyncThunk(
  'sessions/FETCH_GET_SESSIONS',

  async () => {
    const response = await instanceAxios.get('/sessions');
    console.log(
      'thunk FetchSessions executed, API call, response : ',
      response.data.data
    );
    return response.data.data;
  }
);

export default actionThunkFetchSessions;
