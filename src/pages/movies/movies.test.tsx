import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Movies from "./movies";
import { vi } from "vitest";
import {
  fetchMoviesService,
  fetchMovieService,
} from "../../redux/movies/movies.thunk";

// Mock the thunks
vi.mock("../../redux/movies/movies.thunk", () => ({
  fetchMoviesService: vi.fn(),
  fetchMovieService: vi.fn(),
}));

const mockStore = configureStore([]);

describe("Movies Component", () => {
  let store: any;

  beforeEach(() => {
    // Mock the Redux store with initial state
    store = mockStore({
      movies: {
        list: [
          {
            title: "Movie 1",
            episode_id: 1,
            imdbRating: 8,
            plot: "Plot 1",
            release_date: "2000-01-01",
          },
          {
            title: "Movie 2",
            episode_id: 2,
            imdbRating: 7,
            plot: "Plot 2",
            release_date: "2001-01-01",
          },
        ],
        movie: {
          title: "Movie 1",
          poster: "poster1.jpg",
          plot: "Plot 1",
          director: "Director 1",
          imdbRating: 8,
        },
        loading: false,
        error: null,
      },
    });

    // Mock the dispatch function
    store.dispatch = vi.fn();
  });

  it("should render the Movies component", () => {
    render(
      <Provider store={store}>
        <Movies />
      </Provider>
    );

    expect(screen.getByPlaceholderText("Search Movie")).toBeInTheDocument();
    expect(screen.getByText("Episodes")).toBeInTheDocument();
    expect(screen.getByText("Ratings")).toBeInTheDocument();
  });

  it("should dispatch fetchMoviesService on mount", () => {
    render(
      <Provider store={store}>
        <Movies />
      </Provider>
    );

    expect(fetchMoviesService).toHaveBeenCalled();
  });

  it("should filter movies based on search input", () => {
    render(
      <Provider store={store}>
        <Movies />
      </Provider>
    );

    const searchInput = screen.getByPlaceholderText("Search Movie");
    fireEvent.change(searchInput, { target: { value: "Movie 1" } });

    expect(screen.getByText("Movie 1")).toBeInTheDocument();
    expect(screen.queryByText("Movie 2")).not.toBeInTheDocument();
  });

  it("should sort movies by ratings", () => {
    render(
      <Provider store={store}>
        <Movies />
      </Provider>
    );

    const sortSelect = screen.getByText("Episodes");
    fireEvent.change(sortSelect, { target: { value: "ratings" } });

    expect(screen.getByText("Movie 2")).toBeInTheDocument();
    expect(screen.getByText("Movie 1")).toBeInTheDocument();
  });

  it("should display selected movie details", () => {
    render(
      <Provider store={store}>
        <Movies />
      </Provider>
    );

    const movieItem = screen.getByText("Movie 1");
    fireEvent.click(movieItem);

    expect(fetchMovieService).toHaveBeenCalledWith({
      title: "Movie 1",
      year: 2000,
    });
    expect(screen.getByText("Directed By: Director 1")).toBeInTheDocument();
  });
});
