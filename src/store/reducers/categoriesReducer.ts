// Import of librairies or technical components
import { createReducer } from '@reduxjs/toolkit';
import actionThunkFetchCategories from '../thunks/thunkFetchCategories.js';

// Import of custom types
import type ICategory from '../../@types/category.js';

// --- THE INITIAL STATE AND ITS TYPE

interface ICategoriesState {
  categoriesList: ICategory[];
}
const initialState: ICategoriesState = {
  categoriesList: [],
};

// --- THE ACTIONS

// --- THE REDUCER
const categoriesReducer = createReducer(initialState, (builder) => {
  builder.addCase(actionThunkFetchCategories.fulfilled, (state, action) => {
    // put the categegories from the payload into the state
    state.categoriesList = action.payload;
  });
});

export default categoriesReducer;
