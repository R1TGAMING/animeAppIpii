import { Test, TestingModule } from '@nestjs/testing';
import { BaseUrlService } from './base-url.service';

describe('BaseUrlService', () => {
  let service: BaseUrlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BaseUrlService],
    }).compile();

    service = module.get<BaseUrlService>(BaseUrlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return the base url', () => {
    expect(service.getBaseUrl('baseUrl')).toBe('https://samehadaku.now');
  });

  it('should return the anime url', () => {
    expect(service.getBaseUrl('anime')).toBe('https://samehadaku.now/anime');
  });

  it('should return the newAnime url', () => {
    expect(service.getBaseUrl('newAnime')).toBe(
      'https://samehadaku.now/anime-terbaru',
    );
  });

  it('should return the registerAnime url', () => {
    expect(service.getBaseUrl('registerAnime')).toBe(
      'https://samehadaku.now/daftar-anime-2',
    );
  });

  it('should return the batch url', () => {
    expect(service.getBaseUrl('batch')).toBe(
      'https://samehadaku.now/daftar-batch',
    );
  });

  it('should return the schedule url', () => {
    expect(service.getBaseUrl('schedule')).toBe(
      'https://samehadaku.now/jadwal-rilis',
    );
  });
});
