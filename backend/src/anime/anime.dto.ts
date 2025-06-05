import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const CredentialsSchema = z.object({
  q: z.string().min(1, { message: 'Query Is Required' }),
});

const DataSearchAnime = z.object({
  id: z.number(),
  title: z.string().min(1, { message: 'Title Not Found' }),
  url: z.string().min(1, { message: 'Url Not Found' }),
  status: z.string().min(1, { message: 'Status Not Found' }),
  poster: z.string().min(1, { message: 'Poster Not Found' }),
  type: z.string().min(1, { message: 'Type Not Found' }),
});

const PopularAnime = z.object({
  id: z.number(),
  title: z.string().min(1, { message: 'Title Not Found' }),
  poster: z.string().min(1, { message: 'Poster Not Found' }),
  latest_episode: z.string().min(1, { message: 'Latest Episode Not Found' }),
  url: z.string().min(1, { message: 'Url Not Found' }),
  type: z.string().min(1, { message: 'Type Not Found' }),
});

const LatestAnime = z.object({
  id: z.number(),
  title: z.string().min(1, { message: 'Title Not Found' }),
  poster: z.string().min(1, { message: 'Poster Not Found' }),
  status: z.string().min(1, { message: 'Status Not Found' }),
  posted_by: z.string().min(1, { message: 'Posted Not Found' }),
  released: z.string().min(1, { message: 'Released Not Found' }),
  genres: z.array(z.string()).min(1, { message: 'Genres Not Found' }),
  score: z.string().min(1, { message: 'Score Not Found' }),
  url: z.string().min(1, { message: 'Url Not Found' }),
  type: z.string().min(1, { message: 'Type Not Found' }),
});

export class LatestAnimeDTO extends createZodDto(LatestAnime) {}
export class PopularAnimeDTO extends createZodDto(PopularAnime) {}
export class DataSearchAnimeDTO extends createZodDto(DataSearchAnime) {}
export class SearchAnimeDTO extends createZodDto(CredentialsSchema) {}
