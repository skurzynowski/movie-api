import { Injectable } from '@nestjs/common';
import { Movie } from './interfaces/movie.interface';
import { DbService } from '../db/dbmovies.service';
import { CreateMovie } from './interfaces/createMovie.dto';
import _ from 'lodash';

@Injectable()
export class MoviesService {
  constructor(private dbService: DbService<Movie>) {}

  async findAll(params): Promise<Movie[]> {
    const movies: Movie[] = await this.dbService.getAllMovies();

    return this.filterByParameters(movies, params);
  }

  filterByParameters(movies, { genres, runtime }): Movie[] {
    let result: Movie[] = [];

    // filter by genres
    if (!_.isEmpty(genres)) {
      for (
        let precision = genres.length;
        precision > 0;
        precision = precision - 1
      ) {
        result = _.concat(
          result,
          this.filterByGenres(movies, genres, precision) || [],
        );
      }
    } else {
      result = [...movies];
    }

    // filter by runtime
    result = this.filterByRuntime(result, runtime);

    // when no genres shuffle to get random movie
    if (!genres) {
      result = [_.get(_.shuffle(result), '[0]')];
    }

    return result;
  }

  filterByRuntime(movies, runtime?: number): Movie[] {
    return _.filter(movies, m => {
      return (
        !runtime || (+m.runtime - 10 <= runtime && +m.runtime + 10 >= runtime)
      );
    });
  }

  filterByGenres(movies, genres, precision) {
    return _.filter(
      movies,
      m =>
        _.difference(m.genres, genres).length === m.genres.length - precision,
    );
  }

  async getAllGenres(): Promise<string[]> {
    return await this.dbService.getAllGenres();
  }

  async createMovie(payload: CreateMovie): Promise<Movie> {
    return await this.dbService.saveMovie(payload);
  }
}
