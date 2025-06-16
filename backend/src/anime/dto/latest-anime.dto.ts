import { IsNumber, IsOptional, IsString } from 'class-validator';

export class LatestAnimeDto {
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

  @IsString()
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  posted_by?: string;

  @IsString()
  @IsOptional()
  released?: string;

  @IsString()
  @IsOptional()
  series?: string;

  @IsString()
  @IsOptional()
  genres?: string[];

  @IsString()
  @IsOptional()
  score?: string;
}
