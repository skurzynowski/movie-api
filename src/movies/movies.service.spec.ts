import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { DbService } from '../db/dbmovies.service';
import { readFile } from '../common/utils';
import path from 'path';

class DbServiceMock {
  async getAllMovies(): Promise<{ movies: [] }> {
    const rawData = await readFile(path.resolve('data', 'testData.json'));
    const result = JSON.parse(rawData.toString());

    return result.movies;
  }
}

const mockMovies = [
  {
    genres: ['Comedy', 'Fantasy', 'Crime', 'Musical', 'Sport', 'Film-Noir'],
  },
  {
    genres: ['Horror', 'Musical', 'Sport', 'Fantasy'],
  },
  {
    genres: ['Biography', 'Action', 'Film-Noir', 'Comedy'],
  },
  {
    genres: ['Biography', 'Comedy', 'Fantasy'],
  },
];

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const DbServiceProvider = {
      provide: DbService,
      useClass: DbServiceMock,
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService, DbServiceProvider],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should filter by runtime', () => {
    const movies = [{ runtime: 100 }, { runtime: 115 }, { runtime: 130 }];

    const result = service.filterByRuntime(movies, 110);

    expect(result[0].runtime).toEqual(100);
  });
  it('should filter by runtime when undefinned', () => {
    const movies = [{ runtime: 100 }, { runtime: 115 }, { runtime: 130 }];

    const result = service.filterByRuntime(movies);

    expect(result.length).toEqual(3);
  });

  it('should filter by genres with precision 3', async () => {
    const genres = ['Comedy', 'Fantasy', 'Crime'];
    const result = service.filterByGenres(mockMovies, genres, genres.length);

    expect(result.length).toBe(1);
  });

  it('should filter by genres with precision 2', async () => {
    const genres = ['Comedy', 'Fantasy', 'Crime'];
    const result = service.filterByGenres(mockMovies, genres, 2);

    expect(result.length).toBe(1);
  });

  it('should filter by genres with precision 1', async () => {
    const genres = ['Comedy', 'Fantasy', 'Crime'];
    const result = service.filterByGenres(mockMovies, genres, 1);

    expect(result.length).toBe(2);
  });

  it('should findAll() find ONLY by genres', async () => {
    const genres = ['Drama', 'History'];
    const result = await service.findAll({ genres });

    expect(result.length).toBe(98);
  });

  it('should findAll() return random movie when no runtime and no genres', async () => {
    const result = await service.findAll({});

    expect(result.length).toBe(1);
  });

  it('should findAll() return random movie when gets only runtime', async () => {
    const result = await service.findAll({ runtime: 100 });

    expect(result.length).toBe(1);
  });
});
