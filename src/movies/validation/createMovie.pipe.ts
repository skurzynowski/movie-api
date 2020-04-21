import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { MoviesService } from '../movies.service';
import { CreateMovieSchema } from './createMovie.schema';
import { CreateMovie } from '../interfaces/createMovie.dto';

@Injectable()
export class CreateMovieValidationPipe implements PipeTransform {
  constructor(
    private schema: CreateMovieSchema,
    private readonly movieService: MoviesService,
  ) {}

  async transform(value: CreateMovie) {
    const genres = await this.movieService.getAllGenres();
    const { error } = this.schema.getSchema(genres).validate(value);

    if (error) {
      throw new BadRequestException(error.message);
    }

    return value;
  }
}
