import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./movies/movie.slice";

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
  },
});

export type TRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;
