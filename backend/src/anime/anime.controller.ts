import { Controller, Query, Get } from '@nestjs/common';
import { AnimeService } from './anime.service';

@Controller('/anime')
export class AnimeController {
  constructor(private animeService: AnimeService) {}

  @Get('/search')
  searchAnime(@Query('q') query: string) {
    try {
      return this.animeService.searchAnime(query);
    } catch (e: unknown) {
      return e;
    }
  }
}
