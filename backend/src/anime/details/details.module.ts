import { Module } from '@nestjs/common';
import { DetailsService } from './details.service';
import { DetailsController } from './details.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [DetailsController],
  providers: [DetailsService],
  imports: [HttpModule],
})
export class DetailsModule {}
