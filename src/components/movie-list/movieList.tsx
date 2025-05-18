import { type TMovie } from "../../constants/movie.type";
import MovieCard from "../movie-card/movieCard";

type TMoveListProps = {
  list: TMovie[];
  handleMovieSelect: (movie: TMovie) => void;
};

function MovieList(props: TMoveListProps) {
  const { list, handleMovieSelect } = props;
  return list?.length > 0 ? (
    <div>
      {list?.map((movie: TMovie) => (
        <MovieCard
          key={`${movie.title}${movie.release_date}_${movie.episode_id}`}
          movie={movie}
          onMovieClick={handleMovieSelect}
        />
      ))}
    </div>
  ) : (
    <div>No movies found!</div>
  );
}

export default MovieList;
