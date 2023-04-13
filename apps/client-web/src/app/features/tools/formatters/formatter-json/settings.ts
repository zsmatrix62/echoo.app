import type {
  ToolSettingItem,
  ToolSettings,
} from '../../../..//data/types/tool-config';

export type JsonFormatterIndention = '1t' | '2s' | '4s' | 'mini';

type JsonFormatterSettingsType = {
  indention: JsonFormatterIndention;
};

export const JsonFormatterDefaultSettings: ToolSettings<
  keyof JsonFormatterSettingsType
> = {
  key: 'json-formatter',
  settings: {
    indention: <ToolSettingItem<JsonFormatterIndention>>{
      asLocalStorageItem: true,
      asQueryParams: true,
      value: '2s',
    },
  },
};
