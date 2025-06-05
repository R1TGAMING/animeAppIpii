import { Test, TestingModule } from '@nestjs/testing';
import { AnimeController } from './anime.controller';
import { AnimeService } from './anime.service';
import { BaseUrlModule } from '../common/base-url/base-url/base-url.module';

describe('AnimeController', () => {
  let controller: AnimeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnimeController],
      providers: [AnimeService],
      imports: [BaseUrlModule],
    }).compile();

    controller = module.get<AnimeController>(AnimeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
