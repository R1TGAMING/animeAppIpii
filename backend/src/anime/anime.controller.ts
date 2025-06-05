import { Controller, Query, Get } from '@nestjs/common';
import { AnimeService } from './anime.service';
import { SearchAnimeDTO } from './anime.dto';

@Controller('/anime')
export class AnimeController {
  constructor(private animeService: AnimeService) {}

  @Get('/search')
  searchAnime(@Query() query: SearchAnimeDTO) {
    try {
      return this.animeService.searchAnime(query.q);
    } catch (e: unknown) {
      return e;
    }
  }

  @Get('/popular')
  popularAnime() {
    try {
      return this.animeService.getPopularAnime();
    } catch (e: unknown) {
      return e;
    }
  }
}
