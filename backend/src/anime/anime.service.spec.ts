import { Test, TestingModule } from '@nestjs/testing';
import { AnimeService } from './anime.service';
import { BaseUrlModule } from '../common/base-url/base-url/base-url.module';

describe('AnimeService', () => {
  let service: AnimeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnimeService],
      imports: [BaseUrlModule],
    }).compile();

    service = module.get<AnimeService>(AnimeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('search anime should be object', async () => {
    const result = await service.searchAnime('naruto');
    expect(typeof result).toBe('object');
  });

  it('get popular anime should be object', async () => {
    const result = await service.getPopularAnime();
    expect(typeof result).toBe('object');
  });
});
