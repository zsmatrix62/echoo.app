import type { Type } from '@angular/core';
import type { EchooIconNames } from '@echoo/components/echoo-icons';

export type ToolSettingItem<V> = {
  asQueryParams: boolean;
  asLocalStorageItem: boolean;
  value: V;
};

export type ToolSettings<K extends string> = {
  key: string;
  settings: { [key in K]: ToolSettingItem<unknown> };
};

export interface ToolConfig {
  title: string;
  uniqueId: string;
  icon?: EchooIconNames;
  routerLink: string[];
  component?: Type<unknown>;
  children?: ToolConfig[];
  data?: any;
}
