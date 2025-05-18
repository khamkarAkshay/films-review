import { render, screen, fireEvent } from "@testing-library/react";
import MovieList from "./movieList";
import { type TMovie } from "../../constants/movie.type";
import { vi } from "vitest";

const mockMovies: TMovie[] = [
  {
    title: "A New Hope",
    plot: "Rebels fight against the Empire.",
    director: "George Lucas",
    release_date: "1977-05-25",
    episode_id: 4,
  },
  {
    title: "The Empire Strikes Back",
    plot: "The saga continues.",
    director: "Irvin Kershner",
    release_date: "1980-05-21",
    episode_id: 5,
  },
];

describe("MovieList", () => {
  it("renders a list of MovieCard components", () => {
    const handleSelect = vi.fn();

    render(<MovieList list={mockMovies} handleMovieSelect={handleSelect} />);

    expect(screen.getByText("Episode 4")).toBeInTheDocument();
    expect(screen.getByText("Episode 5")).toBeInTheDocument();
    expect(screen.queryByText("No movies found!")).not.toBeInTheDocument();
  });

  it("renders 'No movies found!' when list is empty", () => {
    const handleSelect = vi.fn();
    render(<MovieList list={[]} handleMovieSelect={handleSelect} />);

    expect(screen.getByText("No movies found!")).toBeInTheDocument();
  });

  it("calls handleMovieSelect when a MovieCard is clicked", () => {
    const handleSelect = vi.fn();

    render(<MovieList list={mockMovies} handleMovieSelect={handleSelect} />);

    const firstMovieCard = screen
      .getByText("Episode 4")
      .closest(".movie-card__container")!;
    fireEvent.click(firstMovieCard);

    expect(handleSelect).toHaveBeenCalledTimes(1);
    expect(handleSelect).toHaveBeenCalledWith(mockMovies[0]);
  });
});
