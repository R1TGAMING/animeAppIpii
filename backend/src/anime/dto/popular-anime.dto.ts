import { IsNumber, IsOptional, IsString } from 'class-validator';

export class PopularAnimeDto {
  @IsNumber()
  id: number;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  poster?: string;

  @IsString()
  @IsOptional()
  url?: string;

  @IsString()
  @IsOptional()
  type?: string;

  @IsString()
  @IsOptional()
  latest_episode?: string;
}
