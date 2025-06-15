import { HttpService } from '@nestjs/axios';
import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import * as cheerio from 'cheerio';
import { firstValueFrom } from 'rxjs';
import { PopularAnimeDto } from './dto/anime.dto';
import { AxiosError } from 'axios';

@Injectable()
export class AnimeService {
  constructor(private readonly httpService: HttpService) {}

  async getPopularAnime() {
    try {
      const res = await firstValueFrom(
        this.httpService.get('https://www.oploverz.now/'),
      );
      const $ = cheerio.load(res.data);
      const data: PopularAnimeDto[] = [];

      const content = $('div.excstf').first();
      const list = content.find('article.bs').toArray();

      const getAllList = list.map((item, index) => ({
        id: index + 1,
        title: $(item).find('h2').text() || '',
        url: $(item).find('a').attr('href') || '',
        poster: $(item).find('img').attr('src') || '',
        type: $(item).find('div.typez').text() || '',
        latest_episode: $(item).find('span.epx').text() || '',
      }));

      data.push(...getAllList);

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpException(error.response?.data, HttpStatus.BAD_GATEWAY);
      }

      throw new InternalServerErrorException(
        'Failed to fetch popular anime',
        error,
      );
    }
  }
}
