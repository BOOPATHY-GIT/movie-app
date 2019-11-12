export interface HighestRatedMovieType {
  title: string;
  rating: string;
}

export interface HighestBudgetMovieType {
  title: string;
  budget: string;
}

export interface HighestIFCOMovieType {
  title: string;
  ifco: string;
}

export interface FeaturedActorType {
  actor: string;
  totalMovies: number;
  highestRatedMovie: HighestRatedMovieType;
  highestBudgetMovie: HighestBudgetMovieType;
  highestIFCORatedMovie: HighestIFCOMovieType;
}

