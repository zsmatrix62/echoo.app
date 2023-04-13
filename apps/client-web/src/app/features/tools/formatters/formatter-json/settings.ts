import type { ToolSettings } from '../../../..//data/types/tool-config';

export type JsonFormatterIndention = '1t' | '2s' | '4s' | 'mini';

type JsonFormatterSettingsPayload = {
  sample: boolean;
  indention: JsonFormatterIndention;
};

export type JsonFormatterSettingsKeys = keyof JsonFormatterSettingsPayload;

export const JsonFormatterDefaultSettings: ToolSettings = {
  asQueryParams: true,
  storeInLocalStorageKey: 'json-formatter',
  payload: <JsonFormatterSettingsPayload>{
    sample: true,
    indention: '4s',
  },
};
