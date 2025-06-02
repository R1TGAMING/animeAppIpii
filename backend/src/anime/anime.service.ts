import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { BaseUrlService } from 'src/common/base-url/base-url/base-url.service';
import * as cheerio from 'cheerio';

@Injectable()
export class AnimeService {
  constructor(private base_url: BaseUrlService) {}

  async searchAnime(query: string) {
    try {
      const uri = this.base_url.getBaseUrl('anime') + '?s=' + query;
      const res = await axios.get<string>(uri);
      const $ = cheerio.load(res.data);
      const main = $('#main');
      return main;
    } catch (e: unknown) {
      console.error(e);
      if (e instanceof Error) {
        throw new Error(e.message);
      }
    }
  }
}
