import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { fetchMovieService, fetchMoviesService } from "./movies.thunk";
import { type TMovie } from "../../constants/movie.type";

export interface IInitialState {
  list: TMovie[];
  movie: TMovie;
  loading: boolean;
  error: string | null;
}

const initialState: IInitialState = {
  list: [],
  movie: {
    title: "",
    episode_id: -1,
    plot: "",
    director: "",
    release_date: "",
  },
  loading: false,
  error: null,
};

const dataSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMoviesService.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.list = [];
      })
      .addCase(
        fetchMoviesService.fulfilled,
        (state, action: PayloadAction<any>) => {
          const data = action.payload?.results;
          if (data?.length > 0) {
            state.list = data.map((dt: any) => ({
              title: dt?.title,
              episode_id: dt?.episode_id,
              plot: dt?.opening_crawl,
              director: dt?.director,
              release_date: dt?.release_date,
            }));
          }
          state.loading = false;
        }
      )
      .addCase(fetchMoviesService.rejected, (state, action) => {
        state.loading = false;
        state.list = [];
        state.error = action.error.message || "Failed to fetch data";
      })
      .addCase(fetchMovieService.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.movie = {
          title: "",
          episode_id: -1,
          plot: "",
          director: "",
          release_date: "",
        };
      })
      .addCase(
        fetchMovieService.fulfilled,
        (state, action: PayloadAction<any>) => {
          const data = action.payload;
          state.movie = {
            title: data.Title,
            plot: data.Plot,
            director: data.Director,
            release_date: data.Released,
            poster: data.Poster,
            imdbRating: parseInt(data.imdbRating),
          };
        }
      )
      .addCase(fetchMovieService.rejected, (state, action) => {
        state.loading = false;
        state.movie = {
          title: "",
          episode_id: -1,
          plot: "",
          director: "",
          release_date: "",
        };
        state.error = action.error.message || "Failed to fetch data";
      });
  },
});

export default dataSlice.reducer;
