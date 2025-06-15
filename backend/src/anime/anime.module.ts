import { Module } from '@nestjs/common';
import { AnimeService } from './anime.service';
import { AnimeController } from './anime.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  providers: [AnimeService],
  controllers: [AnimeController],
  imports: [HttpModule],
})
export class AnimeModule {}
