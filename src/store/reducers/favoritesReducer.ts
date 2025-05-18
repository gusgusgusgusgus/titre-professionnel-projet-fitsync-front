import { createReducer } from '@reduxjs/toolkit';
import actionThunkFetchFavorites from '../thunks/thunkFetchFavorites';
import IFavorite from '../../@types/favorite';
import thunkAddFavorite from '../thunks/thunkAddFavorite';
import thunkDeleteFavorite from '../thunks/thunkDeleteFavorite';

interface FavoritesState {
  favoritesList: IFavorite[];
}

const initialState: FavoritesState = {
  favoritesList: [],
};

const favoritesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actionThunkFetchFavorites.fulfilled, (state, action) => {
      state.favoritesList = action.payload;
    })
    .addCase(thunkAddFavorite.fulfilled, (state, action) => {
      state.favoritesList.push(action.payload);
    })
    .addCase(thunkDeleteFavorite.fulfilled, (state, action) => {
      state.favoritesList = state.favoritesList.filter(
        (favorite) => favorite.activity_id !== action.payload
      );
    });
});

export default favoritesReducer;
