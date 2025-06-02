import { Module } from '@nestjs/common';
import { AnimeModule } from './anime/anime.module';
import { BaseUrlProvider } from './common/base-url/base-url/base-url';
import { BaseUrlService } from './common/base-url/base-url/base-url.service';

@Module({
  imports: [AnimeModule],
  controllers: [],
  providers: [BaseUrlProvider],
  exports: [BaseUrlService],
})
export class AppModule {}
