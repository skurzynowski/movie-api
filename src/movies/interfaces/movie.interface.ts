export interface Movie {
  title: string;
  genres: string[];
  runtime: number;
  year: number;
  director: string;
  actors?: string;
  plot?: string;
  posterUrl?: string;
  id: string | number;
}
