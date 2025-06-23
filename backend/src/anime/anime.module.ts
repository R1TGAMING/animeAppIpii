import { Module } from '@nestjs/common';
import { AnimeService } from './anime.service';
import { AnimeController } from './anime.controller';
import { HttpModule } from '@nestjs/axios';
import { DetailsModule } from './details/details.module';

@Module({
  providers: [AnimeService],
  controllers: [AnimeController],
  imports: [HttpModule, DetailsModule],
})
export class AnimeModule {}
