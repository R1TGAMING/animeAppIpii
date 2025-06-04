import { Injectable } from '@nestjs/common';
import { BaseUrlService } from 'src/common/base-url/base-url/base-url.service';
import * as cheerio from 'cheerio';
import axios from 'axios';
import { DataSearchAnimeDTO } from './anime.dto';

@Injectable()
export class AnimeService {
  constructor(private base_url: BaseUrlService) {}

  async searchAnime(query: string) {
    try {
      const uri = this.base_url.getBaseUrl('baseUrl') + '?s=' + query;
      const data: DataSearchAnimeDTO[] = [];
      const res = await axios.get<string>(uri);
      const $ = cheerio.load(res.data);
      const content = $('#content');
      const list = content.find('.listupd');

      const animeList = list.find('article').map((index, element) => ({
        id: index + 1,
        title: $(element).find('h2').text() || '',
        status: $(element).find('span').text() || '',
        url: $(element).find('a').attr('href') || '',
        poster: $(element).find('img').attr('src') || '',
        type: $(element).find('div.typez').text() || '',
      }));

      data.push(...animeList);

      return {
        status: 200,
        message: 'success',
        data: data,
      };
    } catch (e: unknown) {
      console.error(e);
      if (e instanceof Error) {
        throw new Error(e.message);
      }
    }
  }
}
