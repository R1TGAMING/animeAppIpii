import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { AnimeService } from './anime.service';

@Controller('anime')
export class AnimeController {
  constructor(private readonly animeService: AnimeService) {}

  @Get('popular')
  async getPopularAnimeRoute() {
    try {
      const res = await this.animeService.getPopularAnime();
      return {
        status: HttpStatus.OK,
        message: 'success',
        data: res,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      if (error instanceof InternalServerErrorException) {
        throw error;
      }
    }
  }
}
