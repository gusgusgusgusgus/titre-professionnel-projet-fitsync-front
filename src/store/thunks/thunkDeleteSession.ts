import { createAsyncThunk } from '@reduxjs/toolkit';
import instanceAxios from '../../axios/axiosInstance';

const thunkDeleteSession = createAsyncThunk(
  'sessions/DELETE_SESSION',

  async (sessionId: number) => {
    await instanceAxios.delete(`/sessions/${sessionId}`);
    return sessionId;
  }
);

export default thunkDeleteSession;
