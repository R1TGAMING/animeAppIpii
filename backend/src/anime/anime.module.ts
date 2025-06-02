import { Module } from '@nestjs/common';
import { AnimeController } from './anime.controller';
import { AnimeService } from './anime.service';
import { BaseUrlService } from 'src/common/base-url/base-url/base-url.service';

@Module({
  controllers: [AnimeController],
  providers: [AnimeService, BaseUrlService],
})
export class AnimeModule {}
