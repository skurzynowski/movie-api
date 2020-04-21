import { Movie } from './movie.interface';

export interface CreateMovie extends Omit<Movie, 'id'> {}
