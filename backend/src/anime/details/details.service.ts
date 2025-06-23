import { HttpService } from '@nestjs/axios';
import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { AxiosError } from 'axios';
import { firstValueFrom } from 'rxjs';
import * as cheerio from 'cheerio';

@Injectable()
export class DetailsService {
  constructor(private readonly httpService: HttpService) {}

  async getDetailsAnime(slug: string) {
    try {
      const res = await firstValueFrom(
        this.httpService.get('https://www.oploverz.now/anime/' + slug),
      );
      const $ = cheerio.load(res.data);
      const content = $('div[id="content"]');

      if (content.length === 0) {
        throw new HttpException('Anime not found', HttpStatus.NOT_FOUND);
      }

      const info = content.find('div.info-content');
      const info_list = info.find('div.spe').find('span');

      const information = {};

      info_list.toArray().forEach((element) => {
        const text = $(element).text().trim();
        const [key, value] = text.split(':').map((s) => s.trim());
        if (key && value) {
          const splitKey = key.replace(' ', '_');
          information[splitKey.toLowerCase()] = value;
        }
      });

      const data = {
        title: content.find('h1[class="entry-title"]').text() || '',
        url: res.config.url || '',
        slug:
          res.config.url?.replace('https://www.oploverz.now/anime/', '') || '',
        poster: content.find('img').attr('src') || '',
        information: information,
        genres: content
          .find('div.genxed')
          .find('a')
          .toArray()
          .map((el) => {
            return $(el).text().trim();
          }),
        synopsis: content.find('div.entry-content').text().trim() || '',
        total_episodes: content.find('div.eplister').find('li').length || 0,
        latest_episode:
          content.find('div.eplister').find('li').first().text().trim() || '',
        latest_episode_url:
          content
            .find('div.eplister')
            .find('li')
            .first()
            .find('a')
            .attr('href') || '',
        first_episode: content
          .find('div.eplister')
          .find('li')
          .last()
          .text()
          .trim(),
        first_episode_url:
          content
            .find('div.eplister')
            .find('li')
            .last()
            .find('a')
            .attr('href') || '',
      };

      return data;
    } catch (error) {
      console.error('Error fetching anime details:', error);
      if (error instanceof HttpException) {
        throw error;
      }

      if (error instanceof AxiosError) {
        throw new HttpException(
          'Failed to fetch details anime',
          HttpStatus.BAD_GATEWAY,
        );
      }

      throw new InternalServerErrorException(
        'Failed to fetch details anime',
        error,
      );
    }
  }
}
