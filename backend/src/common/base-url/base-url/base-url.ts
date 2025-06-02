import { BaseUrlService } from './base-url.service';

export const BaseUrlProvider = {
  provide: BaseUrlService,
  useFactory: () => {
    return new BaseUrlService();
  },
};
