import { ToolSettingWidgetConfigItems, ToolSettings } from '@echoo/types';
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
	keywordCase: KeywordCase;
};

export const SQLFormatterDefaultSettings: ToolSettings<ToolFormatterSQLOptionsType> = {
	language: {
		asLocalStorageItem: true,
		asQueryParams: true,
		value: 'sql',
	},
	keywordCase: {
		asLocalStorageItem: true,
		asQueryParams: true,
		value: 'upper',
	},
};

export class SQLFormatterProvider implements FormatterToolProvider<ToolFormatterSQLOptionsType> {
	DefaultSettingConfig = {
		key: 'sql-formatter',
		settings: SQLFormatterDefaultSettings,
	};

	SettingsWidgetConfig(): ToolSettingWidgetConfigItems<ToolFormatterSQLOptionsType> {
		return [
			{
				language: {
					key: 'language',
					widgetType: 'combo',
					defaultValue: 'mysql',
					style: {
						width: '100px',
					},
					candidates: [
						{ value: 'mysql', label: 'MySQL' },
						{ value: 'mariadb', label: 'MariaDB' },
						{ value: 'postgresql', label: 'PostgreSQL' },
						{ value: 'sqlite', label: 'SQLite' },
					],
				},
			},
			{
				keywordCase: {
					key: 'keywordCase',
					widgetType: 'combo',
					defaultValue: 'upper',
					style: {
						width: '100px',
					},
					candidates: [
						{ value: 'upper', label: 'Upper' },
						{ value: 'lower', label: 'Lower' },
						{ value: 'preserve', label: 'Preserve' },
					],
				},
			},
		];
	}

	Format(
		code: string,
		options: {
			settings?: ToolSettings<ToolFormatterSQLOptionsType>;
			errorCb?: (err?: Error) => void;
		},
	): string {
		const settings = options.settings ?? this.DefaultSettingConfig?.settings;
		const formatOptions: Partial<FormatOptions> = {
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
