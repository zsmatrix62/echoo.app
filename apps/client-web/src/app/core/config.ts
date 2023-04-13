import { InjectionToken } from '@angular/core';

const APP_CONFIGS: InjectionToken<AppConfigs> = new InjectionToken<AppConfigs>(
  'APP_CONFIG'
);

type AppConfigs = {
  ToolsSettingsLocalStoreKey: string;
};

export { APP_CONFIGS, AppConfigs };
