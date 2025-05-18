import { type TMovie } from "../../constants/movie.type";
import "./movieCard.style.css";

type TMovieCardProps = {
  movie: TMovie;
  onMovieClick: (movie: TMovie) => void;
};

function MovieCard(props: TMovieCardProps) {
  const { movie, onMovieClick } = props;
  const handleClick = () => {
    onMovieClick(movie);
  };

  return (
    <div className="movie-card__container" onClick={handleClick}>
      <p>Episode {movie.episode_id}</p>
      <p>{movie.title}</p>
      <p>{movie.release_date}</p>
    </div>
  );
}

export default MovieCard;
