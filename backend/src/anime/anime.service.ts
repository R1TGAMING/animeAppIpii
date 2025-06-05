import { Injectable } from '@nestjs/common';
import { BaseUrlService } from '../common/base-url/base-url/base-url.service';
import * as cheerio from 'cheerio';
import axios from 'axios';
import {
  DataSearchAnimeDTO,
  LatestAnimeDTO,
  PopularAnimeDTO,
} from './anime.dto';

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

  async getPopularAnime() {
    try {
      const uri = this.base_url.getBaseUrl('baseUrl');
      const data: PopularAnimeDTO[] = [];
      const res = await axios.get<string>(uri);
      const $ = cheerio.load(res.data);
      const popularList = $('.excstf').find('article');
      const animeList = popularList.map((index, element) => ({
        id: index + 1,
        title: $(element).find('div > h2').text() || '',
        poster: $(element).find('img').attr('src') || '',
        latest_episode: $(element).find('span.epx').text() || '',
        url: $(element).find('a').attr('href') || '',
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

  async getLatestAnime() {
    try {
      const uri = this.base_url.getBaseUrl('baseUrl');
      const data: LatestAnimeDTO[] = [];
      const res = await axios.get<string>(uri);
      const $ = cheerio.load(res.data);
      const latestList = $('div.excstf').eq(1).find('article');
      const animeList = latestList.map((index, element) => {
        return {
          id: index + 1,
          title: $(element).find('a').eq(1).text() || '',
          poster: $(element).find('img').attr('src') || '',
          status:
            $(element)
              .find('li')
              .eq(0)
              .clone()
              .find('b')
              .remove()
              .end()
              .text()
              .trim() || '',
          posted_by:
            $(element)
              .find('li')
              .eq(1)
              .clone()
              .find('b')
              .remove()
              .end()
              .text()
              .trim() || '',
          released:
            $(element)
              .find('li')
              .eq(2)
              .clone()
              .find('b')
              .remove()
              .end()
              .text()
              .trim() || '',
          genres: $(element)
            .find('li')
            .eq(4)
            .find('a')
            .map((i, e) => $(e).text().trim())
            .get(),
          score: $(element).find('div.upscore > span.scr').text() || '',
          url: $(element).find('a').eq(0).attr('href') || '',
          type: $(element).find('div.typez').text() || '',
        };
      });

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
