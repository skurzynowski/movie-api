import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { DbModule } from './db/db.module';

@Module({
  imports: [MoviesModule, DbModule],
})
export class AppModule {}
