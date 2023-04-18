/* eslint-disable @typescript-eslint/ban-ts-comment */
import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { WebStorageServiceService } from '@echoo/services/web-storage-service';
import { UntilDestroy } from '@ngneat/until-destroy';
import type {
  ToolSettingItem,
  ToolSettings,
} from '../../data/types/tool-config';
import { APP_CONFIGS } from '../config';

/**
 * This service is used to persist settings for a tool.
 * Setting values can be accessed from query params or local storage.
 * If setting item appears in query parames, it will be used and local storage will be updated, otherwise local storage will be used and query params will be updated.
 */
@UntilDestroy({ checkProperties: true })
@Injectable({
  providedIn: 'root',
})
export class ToolSettingsService<
  K extends string,
  T extends ToolSettings<K> = ToolSettings<K>
> {
  private rt = inject(Router);
  private art = inject(ActivatedRoute);
  private appConfigs = inject(APP_CONFIGS);
  private storeService = inject(WebStorageServiceService);

  private _defaultSettings?: T;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _temp: any;

  static fromDefaultSettings<K extends string>(
    settingValue: ToolSettings<K>
  ): ToolSettingsService<K> {
    const service = new ToolSettingsService<K>();
    service.InitDefaultSettings(settingValue);
    return service;
  }

  /**
   * @param defaltSettingConfig - Call this after instance just created
   */
  InitDefaultSettings(defaltSettingConfig: T) {
    this.defaultSettingConfig = defaltSettingConfig;
    this.listenToQueryParams();
    return this;
  }

  private listenToQueryParams() {
    this.rt.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        this.reflectAsQueryParameters();
      }
    });

    this.art.queryParams.subscribe((params) => {
      Object.keys(params).forEach((queryKey) => {
        const queryValue = params[queryKey];

        const settingItem = <ToolSettingItem<unknown>>(
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          this.propertToolSettings[queryKey]
        );

        if (queryValue && settingItem.asQueryParams) {
          this.set(queryKey as K, queryValue);
        }
      });
    });
  }

  private set defaultSettingConfig(val: T | undefined) {
    this._defaultSettings = val;
  }

  private get defaultSettingConfig() {
    return this._defaultSettings;
  }

  private get propertToolSettings() {
    const copyOfDefault = {
      ...this.defaultSettingConfig?.settings,
    };
    const storedToolSettings = this.store?.[this.toolConfigKey ?? ''];

    if (storedToolSettings) {
      Object.keys(storedToolSettings).forEach((key) => {
        if (Object.keys(copyOfDefault).includes(key)) {
          // @ts-ignore
          copyOfDefault[key].value = storedToolSettings[key];
        }
      });
    }

    return copyOfDefault;
  }

  private get appConfigKey() {
    return this.appConfigs.ToolsSettingsLocalStoreKey || 'XX';
  }

  private get toolConfigKey() {
    return this.defaultSettingConfig?.key;
  }

  private get store() {
    // init an empty item in this.vault if it doesn't exist
    if (!this.storeService.get(this.appConfigKey)) {
      this.resetDefault();
    }

    if (!this._temp) {
      this._temp = this.storeService.get(this.appConfigKey);
    }
    return this._temp;
  }

  private resetDefault() {
    this._temp = undefined;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const defualtAppConfig: { [key: string]: any } =
      this.storeService.get(this.appConfigKey) ?? {};

    if (!this.toolConfigKey) {
      return;
    }

    defualtAppConfig[this.toolConfigKey] = {};

    Object.keys(this.defaultSettingConfig ?? {}).forEach((key) => {
      //@ts-ignore
      defualtAppConfig[this.toolConfigKey][key] =
        //@ts-ignore
        this.defaultSettingConfig[key].value;
    });

    this.storeService.set(this.appConfigKey, defualtAppConfig);
  }

  private ensureDefaultToolSettings() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const toolConfig = this.store[this.toolConfigKey];
    if (!toolConfig) {
      this.resetDefault();
    }
  }

  reflectAsQueryParameters(params?: { [key: string]: string }) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const queryParamerters: { [key: string]: any } = params ?? {};

    if (this.propertToolSettings) {
      Object.keys(this.propertToolSettings).forEach((key) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const settingItem = this.propertToolSettings[key];

        if (settingItem.asQueryParams) {
          queryParamerters[key] = settingItem.value;
        }
      });
    }
    if (queryParamerters) {
      this.rt.navigate([], {
        relativeTo: this.art,
        queryParams: queryParamerters,
      });
    }
  }

  get(key: string) {
    if (!Object.keys(this.propertToolSettings || {}).includes(key as string)) {
      return;
    }

    if (!this.toolConfigKey) {
      return;
    }

    this.ensureDefaultToolSettings();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    return this.propertToolSettings[key].value;
  }

  set(key: K, value: string) {
    if (!Object.keys(this.propertToolSettings || {}).includes(key as string)) {
      return;
    }

    if (!this.toolConfigKey) {
      return;
    }

    this.ensureDefaultToolSettings();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (this.propertToolSettings[key].asLocalStorageItem) {
      this.store[this.toolConfigKey][key] = value;
      this.storeService.set(this.appConfigKey, this.store);
    }

    this.reflectAsQueryParameters();
  }
}
