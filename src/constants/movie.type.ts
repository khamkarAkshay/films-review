export type TRatings = {
  source: string;
  value: string;
}

export type TMovie = {
  title: string;
  episode_id?: number;
  plot: string;
  director: string;
  producer?: string;
  release_date: string;
  poster?: string;
  awards?: string;
  actors?: string;
  imdbID?: string;
  imdbRating?: number;
  writer?: string;
  ratings?: TRatings[]
};
