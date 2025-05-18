/* eslint-disable import/no-cycle */
// Import of librairies or technical components
import { configureStore } from '@reduxjs/toolkit';
// import of reducers
import activitiesReducer from './reducers/activitiesReducer';
import categoriesReducer from './reducers/categoriesReducer';
import userReducer from './reducers/userReducer';
import favoritesReducer from './reducers/favoritesReducer';
import sessionsReducer from './reducers/sessionsReducer';
import weightReducer from './reducers/weightReducer';

const store = configureStore({
  reducer: {
    activities: activitiesReducer,
    categories: categoriesReducer,
    user: userReducer,
    weight: weightReducer,
    favorites: favoritesReducer,
    sessions: sessionsReducer,
  },
});

export default store;

// on exporte le type du state du store et le type de la fonction dispatch du store
// on en aura besoin plus tard pour typer nos hooks useSelector et useDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
