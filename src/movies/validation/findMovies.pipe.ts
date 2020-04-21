import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { MoviesService } from '../movies.service';
import { FindMoviesSchema } from './findMovies.schema';
import { CreateMovie } from '../interfaces/createMovie.dto';

@Injectable()
export class FindMoviesValidationPipe implements PipeTransform {
  constructor(
    private schema: FindMoviesSchema,
    private readonly movieService: MoviesService,
  ) {}

  async transform(value: Pick<CreateMovie, 'genres' | 'runtime'>) {
    const genres = await this.movieService.getAllGenres();
    const { error } = this.schema.getSchema(genres).validate(value);

    if (error) {
      throw new BadRequestException(error.message);
    }

    return value;
  }
}
