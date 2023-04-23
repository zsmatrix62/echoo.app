/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { FormatterToolProvider } from '../types/formatter-provider';
import type { XMLFormatterOptions } from 'xml-formatter';
import xmlFormat from 'xml-formatter';

import type {
	CommonFormatterIndention,
	CommonFormatterLineSeperator,
	ToolSettings,
	ToolSettingWidgetConfigItems,
} from '@echoo/types';

export type ToolFormatterXMLOptionsType = {
	indentation: CommonFormatterIndention;
	lineSeperator: CommonFormatterLineSeperator;
};

export const XMLFormatterDefaultSettings: ToolSettings<ToolFormatterXMLOptionsType> = {
	indentation: {
		asQueryParams: true,
		asLocalStorageItem: true,
		value: '1t',
	},
	lineSeperator: {
		asQueryParams: true,
		asLocalStorageItem: true,
		value: '\r\n',
	},
};

export class XMLFormatterProvider implements FormatterToolProvider<ToolFormatterXMLOptionsType> {
	DefaultSettingConfig = {
		key: 'xml-formatter',
		settings: XMLFormatterDefaultSettings,
	};

	SettingsWidgetConfig(): ToolSettingWidgetConfigItems<ToolFormatterXMLOptionsType> {
		return [
			{
				indentation: {
					key: 'indentation',
					widgetType: 'combo',
					defaultValue: '1t',
					style: {
						width: '100px',
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
				lineSeperator: {
					key: 'lineSeperator',
					widgetType: 'combo',
					defaultValue: '\r',
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
	}

	Format(
		code: string,
		options: {
			errorCb?: (err?: Error) => void;
		},
	): string {
		const settings = this.DefaultSettingConfig.settings;
		const formatterOptions: Partial<XMLFormatterOptions> = {};

		formatterOptions.lineSeparator = settings.lineSeperator.value ?? '\r\n';

		try {
			if (settings.indentation.value === 'mini') {
				return xmlFormat.minify(code, formatterOptions);
			}
			switch (settings.indentation.value) {
				case '1t':
					formatterOptions.indentation = '  ';
					break;
				case '2s':
					formatterOptions.indentation = ' ';
					break;
				case '4s':
					formatterOptions.indentation = '    ';
					break;
				default:
					formatterOptions.indentation = '';
			}

			return xmlFormat(code, formatterOptions);
		} catch (err) {
			options.errorCb?.(err as Error);
		}
		return code;
	}

	ProvideSampleCode(_lang: string): string {
		return `<root><strong><capital>-782478147</capital><we>opportunity</we><bad>-1990636284</bad><cattle><perhaps>-1714813636</perhaps><section>-1428267151</section><while>handsome</while><stream>without</stream><recognize>-1800816747.1511197</recognize><can>twice</can></cattle><camera>carried</camera><origin>-572598105</origin></strong><my>865939221.2704754</my><nose>native</nose><constantly>1729346751</constantly><dress>-81343418.10572386</dress><silent>orange</silent></root>`;
	}
}
