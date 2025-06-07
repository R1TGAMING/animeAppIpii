import { Module } from '@nestjs/common';
import { AnimeModule } from './anime/anime.module';

@Module({
  imports: [AnimeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
