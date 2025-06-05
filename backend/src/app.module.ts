import { Module } from '@nestjs/common';
import { AnimeModule } from './anime/anime.module';
import { ZodValidationPipe } from 'nestjs-zod';
import { APP_PIPE } from '@nestjs/core';
import { PuppeteerModule } from './puppeteer/puppeteer.module';
import { BaseUrlModule } from './common/base-url/base-url/base-url.module';
import * as winston from 'winston';
import { WinstonModule } from 'nest-winston';

@Module({
  imports: [
    WinstonModule.forRoot({
      format: winston.format.json(),
      level: 'debug',
      transports: [new winston.transports.Console()],
    }),
    AnimeModule,
    PuppeteerModule,
    BaseUrlModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}
