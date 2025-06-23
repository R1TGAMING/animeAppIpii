import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  Param,
} from '@nestjs/common';
import { DetailsService } from './details.service';

@Controller('/anime/details')
export class DetailsController {
  constructor(private readonly detailsService: DetailsService) {}

  @Get('/:slug')
  async getDetails(@Param('slug') slug: string) {
    try {
      const res = await this.detailsService.getDetailsAnime(slug);
      return {
        status: HttpStatus.OK,
        message: 'success',
        data: res,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      if (error instanceof InternalServerErrorException) {
        throw error;
      }
    }
  }
}
