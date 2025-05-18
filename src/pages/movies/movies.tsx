import React, { useEffect, useState } from "react";
import { type TMovie } from "../../constants/movie.type";
import { Rating } from "@smastrom/react-rating";
import MovieList from "../../components/movie-list/movieList";
import "@smastrom/react-rating/style.css";
import "./movies.style.css";
import { useDispatch, useSelector } from "react-redux";
import { type TAppDispatch, type TRootState } from "../../redux/store";
import {
  fetchMovieService,
  fetchMoviesService,
} from "../../redux/movies/movies.thunk";

function Movies() {
  const dispatch = useDispatch<TAppDispatch>();
  const moviesData = useSelector((state: TRootState) => state.movies);
  const [movieList, setMovieList] = useState<TMovie[]>([]);
  const [filteredMovieList, setFilteredMovieList] = useState<TMovie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<TMovie | null>(null);
  const [sortFilter, setSortFilter] = useState<string>("episode");
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    dispatch(fetchMoviesService());
  }, []);

  useEffect(() => {
    if (movieList.length > 0) {
      const sortFilterData = [...movieList].sort((a: TMovie, b: TMovie) => {
        if (sortFilter === "ratings") {
          return (a?.imdbRating || 0) - (b?.imdbRating || 0);
        }
        return (a?.episode_id || 0) - (b?.episode_id || 0);
      });
      if (search !== "") {
        const fileteredData = [...sortFilterData].filter(
          (d: TMovie) => d.title.includes(search) || d.plot.includes(search)
        );
        setFilteredMovieList([...fileteredData]);
      } else {
        setFilteredMovieList([...sortFilterData]);
      }
    }
  }, [movieList, search, sortFilter]);

  useEffect(() => {
    if (selectedMovie) {
      const payload = {
        title: selectedMovie.title,
        year: parseInt(selectedMovie.release_date.split("-")[0]),
      };

      dispatch(fetchMovieService({ ...payload }));
    }
  }, [selectedMovie]);

  useEffect(() => {
    if (moviesData?.list?.length > 0) {
      setMovieList([...moviesData.list]);
    }
  }, [moviesData]);

  const handleOnMovieSelect = (movie: TMovie) => {
    setSelectedMovie(movie);
  };

  const handleSortFilterSelect = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSortFilter(event.target.value);
  };

  const handleOnSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <div>
      <div className="movies-filter-bar">
        <select
          className="movie-sort__filter"
          value={sortFilter}
          onChange={handleSortFilterSelect}
        >
          <option value="episode">Episodes</option>
          <option value="ratings">Ratings</option>
        </select>
        <input
          className="movie-search__filter"
          value={search}
          placeholder="Search Movie"
          onChange={handleOnSearch}
        />
      </div>
      <div className="movies-grid-container">
        <div className="movies-grid-container__col">
          <MovieList
            list={filteredMovieList}
            handleMovieSelect={handleOnMovieSelect}
          />
        </div>
        {selectedMovie && moviesData?.movie && (
          <div className="movies-grid-container__col movie-details__container">
            <h4>{moviesData?.movie?.title}</h4>
            <span className="movie-poster__container">
              <img src={moviesData?.movie?.poster} alt="poster" />
              <p>{moviesData?.movie?.plot}</p>
            </span>
            <p>Directed By: {moviesData?.movie?.director}</p>
            <span className="movie-rating__container">
              <p>Average Rating:</p>
              <Rating
                style={{ maxWidth: 180 }}
                items={10}
                value={moviesData?.movie?.imdbRating || 0}
                readOnly={true}
              />
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Movies;
