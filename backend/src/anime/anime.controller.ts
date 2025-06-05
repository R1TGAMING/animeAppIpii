import { Controller, Query, Get } from '@nestjs/common';
import { AnimeService } from './anime.service';
import { SearchAnimeDTO } from './anime.dto';

@Controller('/anime')
export class AnimeController {
  constructor(private animeService: AnimeService) {}

  @Get('/search')
  async searchAnime(@Query() query: SearchAnimeDTO) {
    try {
      return await this.animeService.searchAnime(query.q);
    } catch (e: unknown) {
      return e;
    }
  }

  @Get('/popular')
  async popularAnime() {
    try {
      return await this.animeService.getPopularAnime();
    } catch (e: unknown) {
      return e;
    }
  }

  @Get('/latest')
  async latestAnime() {
    try {
      return await this.animeService.getLatestAnime();
    } catch (e: unknown) {
      return e;
    }
  }
}
