export type ToolSettingConfig<V = string | number | boolean> = {
  key: string;
  settings: ToolSettings<V>;
};

export type ToolSettings<V = string | number | boolean> = {
  [key: string]: ToolSettingItem<V>;
};

export type ToolSettingItem<V = string | number | boolean> = {
  asQueryParams: boolean;
  asLocalStorageItem: boolean;
  value: V;
};

export interface FormatterProvider<O = ToolSettings> {
  Format(
    code: string,
    options: {
      settings?: O;
      errorCb?: (err?: Error) => void;
    }
  ): string;
  ProvideSampleCode(lang: string): string;

  // DefaultSettingConfig is used to init settings of current formatter, will be set/override/re-used to localstorage and query prameters
  // NOTE: no need to pass to Format function each time as it's already in above stores
  DefaultSettingConfig?: ToolSettingConfig;
}
