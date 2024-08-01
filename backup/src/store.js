import { configureStore } from '@reduxjs/toolkit';
import movieSlice from './Redux/movieSlice';

export const store = configureStore({
  reducer: {
    movies: movieSlice,
  }
});
