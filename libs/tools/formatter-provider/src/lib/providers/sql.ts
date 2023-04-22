import { ToolSettings } from '@echoo/types';
import type { FormatOptions, KeywordCase } from 'sql-formatter';
import { format } from 'sql-formatter';
import { FormatterToolProvider } from '../types/formatter-provider';

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

export type ToolFormatterSQLOptionsType = {
  language: SqlFormatterLanguages;
  tabWidth: number;
  useTabs: boolean;
  keywordCase: KeywordCase;
};

export const SQLFormatterDefaultSettings: ToolSettings<ToolFormatterSQLOptionsType> =
  {
    language: {
      asLocalStorageItem: true,
      asQueryParams: true,
      value: 'sql',
    },
    tabWidth: {
      asLocalStorageItem: true,
      asQueryParams: true,
      value: 1,
    },
    useTabs: {
      asLocalStorageItem: true,
      asQueryParams: true,
      value: true,
    },
    keywordCase: {
      asLocalStorageItem: true,
      asQueryParams: true,
      value: 'upper',
    },
  };

export class SQLFormatterProvider
  implements FormatterToolProvider<ToolFormatterSQLOptionsType>
{
  DefaultSettingConfig = {
    key: 'sql-formatter',
    settings: SQLFormatterDefaultSettings,
  };

  Format(
    code: string,
    options: {
      settings?: ToolSettings<ToolFormatterSQLOptionsType>;
      errorCb?: (err?: Error) => void;
    }
  ): string {
    const settings = options.settings ?? this.DefaultSettingConfig?.settings;
    const formatOptions: Partial<FormatOptions> = {
      useTabs: settings.useTabs.value,
      tabWidth: settings.tabWidth.value,
      keywordCase: settings.keywordCase.value,
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
