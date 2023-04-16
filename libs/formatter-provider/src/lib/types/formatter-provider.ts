export type ToolSettingItem<V> = {
  asQueryParams: boolean;
  asLocalStorageItem: boolean;
  value: V;
};

export type ToolSettings<
  K extends string,
  V extends string | number | boolean
> = {
  key: string;
  settings: { [key in K]: ToolSettingItem<V> };
};

export interface FormatterProvider<O> {
  Format(code: string, options?: O, errorCb?: (err?: Error) => void): string;
  ProvideSampleCode(lang: string): string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  DefaultSetting?: ToolSettings<any, any>;
  DefaultSettings?: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: ToolSettings<any, any>;
  };
}
