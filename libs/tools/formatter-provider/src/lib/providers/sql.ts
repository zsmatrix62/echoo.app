/* eslint-disable @typescript-eslint/ban-ts-comment */
import type {
  FormatterProvider,
  ToolSettingItem,
  ToolSettings,
} from '../types/formatter-provider';
import type { FormatOptions, KeywordCase } from 'sql-formatter';
import { format } from 'sql-formatter';

type SqlFormatterLanguages =
  | 'sql'
  | 'bigquery'
  | 'db2'
  | 'hive'
  | 'mariadb'
  | 'mysql'
  | 'n1ql'
  | 'plsql'
  | 'postgresql'
  | 'redshift'
  | 'singlestoredb'
  | 'snowflake'
  | 'spark'
  | 'sqlite'
  | 'transactsql'
  | 'tsql'
  | 'trino';

export const SQLFormatterDefaultSettings: ToolSettings = {
  language: <ToolSettingItem<SqlFormatterLanguages>>{
    asLocalStorageItem: true,
    asQueryParams: true,
    value: 'sql',
  },
  tabWidth: <ToolSettingItem<number>>{
    asLocalStorageItem: true,
    asQueryParams: true,
    value: 2,
  },
  useTabs: <ToolSettingItem<boolean>>{
    asLocalStorageItem: true,
    asQueryParams: true,
    value: false,
  },
  keywordCase: <ToolSettingItem<KeywordCase>>{
    asLocalStorageItem: true,
    asQueryParams: true,
    value: 'preserve',
  },
};

export class SQLFormatterProvider<O = typeof SQLFormatterDefaultSettings>
  implements FormatterProvider<O>
{
  DefaultSettingConfig = {
    key: 'sql-formatter',
    settings: SQLFormatterDefaultSettings,
  };

  Format(
    code: string,
    options: {
      settings?: O;
      errorCb?: (err?: Error) => void;
    }
  ): string {
    const settings = options.settings ?? this.DefaultSettingConfig?.settings;
    const formatOptions: Partial<FormatOptions> = {
      // @ts-ignore
      useTabs: <boolean>settings?.['useTabs'].value,
      // @ts-ignore
      tabWidth: <number>settings?.['tabWidth'].value,
      // @ts-ignore
      keywordCase: <KeywordCase>settings?.['keywordCase'].value,
    };

    try {
      return format(code, formatOptions);
    } catch (err) {
      options.errorCb?.(err as Error);
    }
    return code;
  }

  ProvideSampleCode(_lang: string): string {
    // TODO: Add more sample code for different sql dialects
    return `CREATE TABLE MortgageCompanies (ID INTEGER PRIMARY KEY, NAME CHAR(30)); INSERT INTO MortgageCompanies VALUES (1, 'Quicken Loans'); INSERT INTO MortgageCompanies VALUES (2, 'Wells Fargo Bank'); INSERT INTO MortgageCompanies VALUES (3, 'JPMorgan Chase Bank'); SELECT * FROM MortgageCompanies;`;
  }
}
