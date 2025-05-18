import { render, screen, fireEvent } from "@testing-library/react";
import MovieCard from "./movieCard";
import { type TMovie } from "../../constants/movie.type";
import { vi } from "vitest";

describe("MovieCard", () => {
  const mockMovie: TMovie = {
    title: "A New Hope",
    plot: "Rebels fight against the Empire.",
    director: "George Lucas",
    release_date: "1977-05-25",
    episode_id: 4,
    producer: "Gary Kurtz, Rick McCallum",
    poster: "https://example.com/poster.jpg",
    awards: "Oscar-winning",
    actors: "Mark Hamill, Harrison Ford",
    imdbID: "tt0076759",
    imdbRating: 8.6,
    writer: "George Lucas",
    ratings: [
      { source: "Internet Movie Database", value: "8.6/10" },
      { source: "Rotten Tomatoes", value: "92%" },
    ],
  };

  it("renders movie details", () => {
    const handleClick = vi.fn(); // use vi.fn() instead of jest.fn()
    render(<MovieCard movie={mockMovie} onMovieClick={handleClick} />);

    expect(
      screen.getByText(`Episode ${mockMovie.episode_id}`)
    ).toBeInTheDocument();
    expect(screen.getByText(mockMovie.title)).toBeInTheDocument();
    expect(screen.getByText(mockMovie.release_date)).toBeInTheDocument();
  });

  it("calls onMovieClick when clicked", () => {
    const handleClick = vi.fn();
    render(<MovieCard movie={mockMovie} onMovieClick={handleClick} />);

    const card = screen
      .getByText(mockMovie.title)
      .closest(".movie-card__container")!;
    fireEvent.click(card);

    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(handleClick).toHaveBeenCalledWith(mockMovie);
  });
});
