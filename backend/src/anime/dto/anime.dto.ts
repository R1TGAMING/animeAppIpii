import { IsNumber, IsString } from 'class-validator';

export class PopularAnimeDto {
  @IsNumber()
  id: number;

  @IsString()
  title?: string;

  @IsString()
  poster?: string;

  @IsString()
  url?: string;
}
