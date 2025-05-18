import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMoviesService = createAsyncThunk(
  "movies/fetchMovieList",
  async () => {
    const response = await fetch(
      "https://swapi.py4e.com/api/films/?format=json"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return await response.json();
  }
);

export const fetchMovieService = createAsyncThunk(
  "movies/fetchMovie",
  async (body: { year: number; title: string }) => {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=b9a5e69d&y=${body.year}&t=${body.title}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return await response.json();
  }
);
