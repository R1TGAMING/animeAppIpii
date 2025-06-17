import {
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class QueryAnimeDto {
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  s: string;
}
export class SearchAnimeDto {
  @IsNumber()
  id: number;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  url?: string;

  @IsString()
  @IsOptional()
  poster?: string;

  @IsString()
  @IsOptional()
  type?: string;

  @IsString()
  @IsOptional()
  status?: string;
}
