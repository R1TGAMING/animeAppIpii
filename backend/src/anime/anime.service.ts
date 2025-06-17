import { HttpService } from '@nestjs/axios';
import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import * as cheerio from 'cheerio';
import { firstValueFrom } from 'rxjs';
import { PopularAnimeDto } from './dto/popular-anime.dto';
import { AxiosError } from 'axios';
import { LatestAnimeDto } from './dto/latest-anime.dto';
import { QueryAnimeDto } from './dto/search-anime.dto';

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
      if (error instanceof HttpException) {
        throw error;
      }

      if (error instanceof AxiosError) {
        throw new HttpException(error.response?.data, HttpStatus.BAD_GATEWAY);
      }

      throw new InternalServerErrorException(
        'Failed to fetch popular anime',
        error,
      );
    }
  }

  async getLatestAnime() {
    try {
      const res = await firstValueFrom(
        this.httpService.get('https://www.oploverz.now/'),
      );
      const $ = cheerio.load(res.data);
      const data: LatestAnimeDto[] = [];

      const content = $('div.excstf').eq(1);
      const list = content.find('article.stylesix').toArray();

      const getAllList = list.map((item, index) => {
        const infList = $(item).find('div.inf>ul>li');
        const genres = infList
          .eq(4)
          .find('a')
          .toArray()
          .map((genre) => {
            return $(genre).text().trim();
          });
        infList.find('b').remove();

        return {
          id: index + 1,
          title: $(item).find('h2[itemprop="headline"]').text() || '',
          poster: $(item).find('img').attr('src') || '',
          url:
            $(item).find('h2[itemprop="headline"]').find('a').attr('href') ||
            '',
          type: $(item).find('div.typez').text().trim() || '',
          latest_episode: $(item).find('span.epx').text().trim() || '',
          status: infList.eq(0).text().trim() || '',
          posted_by: infList.eq(1).text().trim() || '',
          released: infList.eq(2).text().trim() || '',
          series: infList.eq(3).find('a').text().trim() || '',
          genres: genres,
          score: $(item).find('div.upscore>span.scr').text().trim() || '',
        };
      });

      data.push(...getAllList);

      return data;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      if (error instanceof AxiosError) {
        throw new HttpException(error.response?.data, HttpStatus.BAD_GATEWAY);
      }

      throw new InternalServerErrorException(
        'Failed to fetch latest anime',
        error,
      );
    }
  }

  async searchAnime(query: QueryAnimeDto) {
    try {
      const res = await firstValueFrom(
        this.httpService.get('https://www.oploverz.now?s=' + query.s),
      );
      const $ = cheerio.load(res.data);
      const data: LatestAnimeDto[] = [];

      const content = $('div.listupd');
      const list = content.find('article.bs').toArray();

      const getAllList = list.map((item, index) => ({
        id: index + 1,
        title: $(item).find('h2[itemprop="headline"]').text() || '',
        url: $(item).find('a').attr('href') || '',
        poster: $(item).find('img').attr('src') || '',
        type: $(item).find('div.typez').text() || '',
        status: $(item).find('span.epx').text() || '',
      }));

      data.push(...getAllList);

      if (data.length === 0) {
        throw new HttpException(
          'No anime found for the given search query',
          HttpStatus.NOT_FOUND,
        );
      }

      return data;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      if (error instanceof AxiosError) {
        throw new HttpException(error.response?.data, HttpStatus.BAD_GATEWAY);
      }

      throw new InternalServerErrorException(
        'Failed to fetch search anime',
        error,
      );
    }
  }
}
