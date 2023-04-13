import { InjectionToken } from '@angular/core';

const APP_PROPERTIES: InjectionToken<AppProperties> =
  new InjectionToken<AppProperties>('APP_CONFIG');

type AppProperties = {
  github: {
    username: string;
    repo: string;
  };
  appVersion: string;
};

export { APP_PROPERTIES, AppProperties };
