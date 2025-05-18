// Import of librairies or technical components
import { createReducer } from '@reduxjs/toolkit';
import actionThunkFetchActivities from '../thunks/thunkFetchActivities';

// Import of custom types
import type IActivity from '../../@types/activity';

// --- THE INITIAL STATE AND ITS TYPE
interface IActivitiesState {
  activitiesList: IActivity[];
}
const initialState: IActivitiesState = {
  activitiesList: [],
};

// --- THE ACTIONS

// --- THE REDUCER
const activitiesReducer = createReducer(initialState, (builder) => {
  builder.addCase(actionThunkFetchActivities.fulfilled, (state, action) => {
    // put the categegories from the payload into the state
    state.activitiesList = action.payload;
  });
});

export default activitiesReducer;
