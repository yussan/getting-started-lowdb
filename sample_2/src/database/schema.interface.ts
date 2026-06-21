export interface Movie {
  id: string; //generate from nanoid
  title: string;
  genre: string;
}

export interface DatabaseSchema {
  movies: Movie[];
}
