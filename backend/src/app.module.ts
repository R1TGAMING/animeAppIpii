import { Module } from '@nestjs/common';
import { AnimeModule } from './anime/anime.module';
import { BaseUrlProvider } from './common/base-url/base-url/base-url';
import { BaseUrlService } from './common/base-url/base-url/base-url.service';
import { ZodValidationPipe } from 'nestjs-zod';
import { APP_PIPE } from '@nestjs/core';
import { PuppeteerModule } from './puppeteer/puppeteer.module';

@Module({
  imports: [AnimeModule, PuppeteerModule],
  controllers: [],
  providers: [
    BaseUrlProvider,
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
  exports: [BaseUrlService],
})
export class AppModule {}
