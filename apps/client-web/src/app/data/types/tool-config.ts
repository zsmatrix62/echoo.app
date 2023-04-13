import type { Type } from '@angular/core';
import type { EchooIconNames } from '@echoo/echoo-icons';

export type ToolSettingsPayload = {
  [key: string]: unknown;
};

export type ToolSettings = {
  asQueryParams?: boolean;
  storeInLocalStorageKey?: string;
  payload: ToolSettingsPayload;
};

export interface ToolConfig {
  title: string;
  uniqueId: string;
  icon?: EchooIconNames;
  routerLink: string[];
  component?: Type<unknown>;
  children?: ToolConfig[];
  toolsettings?: ToolSettings;
}
