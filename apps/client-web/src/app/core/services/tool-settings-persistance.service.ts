import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { WebStorageServiceService } from '@echoo/web-storage-service';
import { UntilDestroy } from '@ngneat/until-destroy';
import type { ToolSettings } from '../../data/types/tool-config';
import { APP_CONFIGS } from '../config';

/**
 * This service is used to persist settings for a tool.
 * Setting values can be accessed from query params or local storage.
 */
@UntilDestroy({ checkProperties: true })
@Injectable({
  providedIn: 'root',
})
export class ToolSettingsPersistanceService<
  K,
  T extends ToolSettings = ToolSettings
> {
  rt = inject(Router);
  appConfigs = inject(APP_CONFIGS);
  storeService = inject(WebStorageServiceService);

  settings?: T;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _temp: any;

  static fromDefaultSettings<K>(
    settingValue: ToolSettings
  ): ToolSettingsPersistanceService<K> {
    const service = new ToolSettingsPersistanceService<K>();
    service.settings = settingValue;
    return service;
  }

  get appConfigKey() {
    return this.appConfigs.ToolsSettingsLocalStoreKey || 'XX';
  }

  get toolConfigKey() {
    return this.settings?.storeInLocalStorageKey;
  }

  get store() {
    // init an empty item in this.vault if it doesn't exist
    if (!this.storeService.get(this.appConfigKey)) {
      this.resetDefault();
    }

    if (!this._temp) {
      this._temp = this.storeService.get(this.appConfigKey);
    }
    return this._temp;
  }

  resetDefault() {
    this._temp = undefined;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const defaultSettings: { [key: string]: any } = {};
    if (!this.toolConfigKey) {
      return;
    }
    defaultSettings[this.toolConfigKey] = this.settings?.payload || {};
    this.storeService.set(this.appConfigKey, defaultSettings);
  }

  get(key: string) {
    if (!Object.keys(this.settings?.payload || {}).includes(key as string)) {
      return;
    }
    if (!this.toolConfigKey) {
      return;
    }
    return this.store[this.toolConfigKey][key] || this.settings?.payload[key];
  }

  set(key: K, value: string) {
    if (!Object.keys(this.settings?.payload || {}).includes(key as string)) {
      return;
    }
    if (!this.toolConfigKey) {
      return;
    }
    this.store[this.toolConfigKey][key] = value;
    this.storeService.set(this.appConfigKey, this.store);
  }
}
