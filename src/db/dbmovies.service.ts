import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import _get from 'lodash/get';
import path from 'path';
import { readFile, writeFile } from '../common/utils';

@Injectable()
export class DbService<T> {
  private readonly dbFile = path.resolve('data', 'db.json');

  async getFileContent(): Promise<{ movies: T[]; genres: string[] }> {
    try {
      const rawData = await readFile(this.dbFile);
      const result = JSON.parse(rawData.toString());

      return result;
    } catch (e) {
      throw new ServiceUnavailableException('DB file not found');
    }
  }

  async getAllMovies(): Promise<T[]> {
    const result = await this.getFileContent();

    return _get(result, 'movies');
  }

  async getAllGenres(): Promise<string[]> {
    const result = await this.getFileContent();

    return _get(result, 'genres');
  }

  async saveMovie(movie): Promise<T> {
    const fileContent = await this.getFileContent();
    const id = this.generateId();
    fileContent.movies.push({ ...movie, id });
    const updatedFileContent = JSON.stringify(fileContent);

    try {
      await writeFile(this.dbFile, updatedFileContent);
    } catch (e) {
      throw new ServiceUnavailableException('Error while saving in file');
    }

    return movie;
  }

  generateId(): string {
    return uuidv4();
  }
}
