import {
  Controller,
  Get,
  Post,
  UsePipes,
  Query,
  Body,
  Response,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieValidationPipe } from './validation/createMovie.pipe';
import { FindMoviesValidationPipe } from './validation/findMovies.pipe';
import { CreateMovie } from './interfaces/createMovie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private movieService: MoviesService) {}

  @Get()
  @UsePipes(FindMoviesValidationPipe)
  async findMovies(@Query() query) {
    return this.movieService.findAll(query);
  }

  @Post()
  @UsePipes(CreateMovieValidationPipe)
  async createMovies(@Body() moviePayload: CreateMovie, @Response() response) {
    const createdMovie = await this.movieService.createMovie(moviePayload);

    return response.send(createdMovie);
  }
}
