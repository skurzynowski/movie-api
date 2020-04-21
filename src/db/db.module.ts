import { Module } from '@nestjs/common';
import { DbService } from './dbmovies.service';

@Module({
  exports: [DbService],
  providers: [DbService],
})
export class DbModule {}
