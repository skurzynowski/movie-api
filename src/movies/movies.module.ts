import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { DbModule } from '../db/db.module';
import { CreateMovieSchema } from './validation/createMovie.schema';
import { FindMoviesSchema } from './validation/findMovies.schema';

@Module({
  controllers: [MoviesController],
  providers: [MoviesService, CreateMovieSchema, FindMoviesSchema],
  imports: [DbModule],
})
export class MoviesModule {}
