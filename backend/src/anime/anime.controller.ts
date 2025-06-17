import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  Query,
} from '@nestjs/common';
import { AnimeService } from './anime.service';
import { QueryAnimeDto } from './dto/search-anime.dto';

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

  @Get('latest')
  async getLatestAnime() {
    try {
      const res = await this.animeService.getLatestAnime();
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

  @Get('search')
  async searchAnime(@Query() query: QueryAnimeDto) {
    try {
      const res = await this.animeService.searchAnime(query);
      return {
        status: HttpStatus.OK,
        message: 'success',
        data: res,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        console.error('HttpException:', error);
        throw error;
      }

      if (error instanceof InternalServerErrorException) {
        throw error;
      }
    }
  }
}
