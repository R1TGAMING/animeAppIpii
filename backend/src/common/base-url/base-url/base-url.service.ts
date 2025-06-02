import { Injectable } from '@nestjs/common';

@Injectable()
export class BaseUrlService {
  private baseUrls = {
    baseUrl: 'https://samehadaku.now',
    anime: 'https://samehadaku.now/anime',
    newAnime: 'https://samehadaku.now/anime-terbaru',
    batch: 'https://samehadaku.now/daftar-batch',
    schedule: 'https://samehadaku.now/jadwal-rilis',
    registerAnime: 'https://samehadaku.now/daftar-anime-2',
  };

  getBaseUrl(
    baseUrl:
      | 'baseUrl'
      | 'anime'
      | 'newAnime'
      | 'batch'
      | 'schedule'
      | 'registerAnime',
  ): string {
    return this.baseUrls[baseUrl];
  }
}
