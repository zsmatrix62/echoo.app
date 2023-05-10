import type { EchooIconNames } from '@echoo/components/echoo-icons';
import type { FormatterToolProvider } from './formatter-provider';

export type FormatterAvailableLangConfigsType =
	| 'json'
	| 'html'
	| 'xml'
	| 'javascript'
	| 'typescript'
	| 'css'
	| 'markdown'
	| 'rust'
	| 'yaml'
	| 'sql'
	| 'nginx';

export type ToolFormatterInstanceConfig = {
	langKey: string;
	display: string;
	icon: EchooIconNames;
	formatterProvider: FormatterToolProvider<object>;
};
