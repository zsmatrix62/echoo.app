/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { Options as PrettierOptions } from 'prettier';
import * as prettier from 'prettier/standalone';
import * as htmlParser from 'prettier/parser-html';
import * as babelParser from 'prettier/parser-babel';
import * as markdownParser from 'prettier/parser-markdown';
import * as yamlParser from 'prettier/parser-yaml';
import * as postcssParser from 'prettier/parser-postcss';
import * as typescriptParser from 'prettier/parser-typescript';
import * as rustParser from 'prettier-plugin-rust';
// @ts-ignore
import * as xmlParser from '@prettier/plugin-xml';
// @ts-ignore
import * as nginxParser from 'prettier-plugin-nginx';
import type {
	CommonFormatterIndention,
	CommonFormatterLineSeperator,
	ToolSettings,
	ToolSettingWidgetConfigItems,
} from '@echoo/types';
import type { FormatterToolProvider } from '../types/formatter-provider';
import type { FormatterAvailableLangConfigsType } from '../types/formatters';
import { SampleCodes } from '../sampleCodes';

const prettierPlugins = [
	htmlParser,
	babelParser,
	markdownParser,
	yamlParser,
	typescriptParser,
	xmlParser,
	nginxParser,
	postcssParser,
	rustParser,
];

type Parsers = 'json' | 'html' | 'babel' | 'markdown' | 'yaml' | 'typescript' | 'sql' | 'nginx' | 'css' | 'jinx-rust';

export type ToolFormatterPrettierOptionsType = {
	indentation?: CommonFormatterIndention;
	endOfLine?: CommonFormatterLineSeperator;
	bracketSpacing?: boolean;
};

export const ToolFormatterPrettierDefaultSettings: ToolSettings<ToolFormatterPrettierOptionsType> = {
	indentation: {
		asQueryParams: true,
		asLocalStorageItem: true,
		value: '1t',
	},
	endOfLine: {
		asQueryParams: true,
		asLocalStorageItem: true,
		value: '\n',
	},
};

export class PrettierFormatterProvider implements FormatterToolProvider<ToolFormatterPrettierOptionsType> {
	parser: Parsers;
	lang: FormatterAvailableLangConfigsType;

	DefaultSettingConfig = {
		key: 'xxx-formatter',
		settings: ToolFormatterPrettierDefaultSettings,
	};

	static WithParser(parser: Parsers, lang: FormatterAvailableLangConfigsType) {
		return new PrettierFormatterProvider(parser, lang);
	}

	SettingsWidgetConfig(): ToolSettingWidgetConfigItems<ToolFormatterPrettierOptionsType> {
		const languageConfig: ToolSettingWidgetConfigItems<ToolFormatterPrettierOptionsType> = [];

		if (['typescript', 'javascript'].includes(this.lang)) {
			languageConfig.push({
				bracketSpacing: {
					key: 'bracketSpacing',
					label: {
						title: 'Bracket Spacing',
					},
					widgetType: 'combo',
					defaultValue: true,
					style: {
						width: '65px',
						fontSize: '12px',
					},
					candidates: [
						{
							value: true,
							label: 'Yes',
						},
						{
							value: false,
							label: 'No',
						},
					],
				},
			});
		}

		if (this.lang == 'json') {
			languageConfig.push({
				indentation: {
					key: 'indentation',
					widgetType: 'combo',
					defaultValue: '1t',
					style: {
						width: '110x',
					},
					candidates: [
						{
							value: '1t',
							label: '1 Tab',
						},
						{
							value: '2s',
							label: '2 Spaces',
						},
						{
							value: '4s',
							label: '4 Spaces',
						},
						{
							value: 'mini',
							label: 'minify',
						},
					],
				},
			});
		}

		const sharedConfigs = [
			{
				indentation: {
					key: 'indentation',
					widgetType: 'combo',
					defaultValue: '1t',
					style: {
						width: '110x',
					},
					candidates: [
						{
							value: '1t',
							label: '1 Tab',
						},
						{
							value: '2s',
							label: '2 Spaces',
						},
						{
							value: '4s',
							label: '4 Spaces',
						},
					],
				},
			},
			{
				endOfLine: {
					key: 'endOfLine',
					widgetType: 'combo',
					defaultValue: '\n',
					style: {
						width: '80px',
					},
					candidates: [
						{
							value: '\r\n',
							label: 'CRLF',
						},
						{
							value: '\r',
							label: 'CR',
						},
						{
							value: '\n',
							label: 'LF',
						},
					],
				},
			},
		];

		// use shared config to updated language config if it has the same key
		// otherwise, add it to the language config

		const sharedConfigKeys = sharedConfigs.map((config) => Object.keys(config)[0]);
		const languageConfigKeys = languageConfig.map((config) => Object.keys(config)[0]);

		sharedConfigKeys.forEach((configKey, idx) => {
			if (!languageConfigKeys.includes(configKey)) {
				// @ts-ignore
				languageConfig.push(sharedConfigs[idx]);
			}
		});

		return languageConfig;
	}

	constructor(parser: Parsers, lang: FormatterAvailableLangConfigsType) {
		this.parser = parser;
		this.lang = lang;

		this.DefaultSettingConfig = {
			key: `${lang}-formatter`,
			settings: ToolFormatterPrettierDefaultSettings,
		};
	}

	Format(
		code: string,
		options: {
			settings?: ToolSettings<ToolFormatterPrettierOptionsType>;
			errorCb?: ((err?: Error | undefined) => void) | undefined;
		},
	): string {
		let outputCode = code;

		const prettierOptions: PrettierOptions = {};

		if (!options.settings) {
			options.settings = this.DefaultSettingConfig.settings;
		}

		// converting settings to prettier options
		if (options.settings) {
			const indentation = options.settings.indentation?.value;
			const endOfLine = options.settings.endOfLine?.value;
			const bracketSpacing = options.settings.bracketSpacing?.value;

			switch (indentation) {
				case '1t':
					prettierOptions.useTabs = true;
					prettierOptions.tabWidth = 1;
					break;
				case '2s':
					prettierOptions.useTabs = false;
					prettierOptions.tabWidth = 2;
					break;
				case '4s':
					prettierOptions.useTabs = false;
					prettierOptions.tabWidth = 4;
					break;
				default:
					if (this.lang == 'json') {
						prettierOptions.useTabs = false;
						prettierOptions.tabWidth = 4;
						if (code) {
							code = JSON.stringify(JSON.parse(code), null, '');
							return code;
						}
					}
			}

			switch (endOfLine) {
				case '\r\n':
					prettierOptions.endOfLine = 'crlf';
					break;
				case '\r':
					prettierOptions.endOfLine = 'cr';
					break;
				case '\n':
					prettierOptions.endOfLine = 'lf';
					break;
				default:
					prettierOptions.endOfLine = 'auto';
			}

			prettierOptions.bracketSpacing = !bracketSpacing;
		}

		try {
			outputCode = prettier.format(code, {
				parser: this.parser,
				plugins: prettierPlugins,
				...prettierOptions,
			});
		} catch (e) {
			options.errorCb?.(e as Error);
		}
		return outputCode;
	}

	ProvideSampleCode(): string {
		return SampleCodes(this.lang);
	}
}
