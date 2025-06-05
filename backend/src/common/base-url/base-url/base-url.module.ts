import { Global, Module } from '@nestjs/common';
import { BaseUrlProvider } from './base-url';

@Global()
@Module({
  providers: [BaseUrlProvider],
  exports: [BaseUrlProvider],
})
export class BaseUrlModule {}
