import { Test, TestingModule } from '@nestjs/testing';
import { AnimeService } from './anime.service';
import { BaseUrlService } from 'src/common/base-url/base-url/base-url.service';

describe('AnimeService', () => {
  let service: AnimeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnimeService],
      imports: [BaseUrlService],
    }).compile();

    service = module.get<AnimeService>(AnimeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
