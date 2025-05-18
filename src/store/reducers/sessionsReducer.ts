// Import of librairies or technical components
import { createReducer } from '@reduxjs/toolkit';
import actionThunkFetchSessions from '../thunks/thunkFetchSessions.js';
import thunkAddNewSession from '../thunks/thunkAddNewSession.js';
// Import of custom types
import type ISession from '../../@types/session.js';
import thunkDeleteSession from '../thunks/thunkDeleteSession.js';

// --- THE INITIAL STATE AND ITS TYPE

interface ISessionsState {
  sessionsList: ISession[];
  newSession: ISession[];
}
const initialState: ISessionsState = {
  sessionsList: [],
  newSession: [],
};

// --- THE ACTIONS

// --- THE REDUCER
const sessionsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actionThunkFetchSessions.fulfilled, (state, action) => {
      state.sessionsList = action.payload;
      // console.log(state.sessionsList);
    })
    .addCase(thunkAddNewSession.fulfilled, (state, action) => {
      state.sessionsList.push(action.payload);
    })
    .addCase(thunkDeleteSession.fulfilled, (state, action) => {
      state.sessionsList = state.sessionsList.filter(
        (session) => session.id !== action.payload
      );
    });
});

export default sessionsReducer;
