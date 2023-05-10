import { PrettierFormatterProvider, SQLFormatterProvider, XMLFormatterProvider } from '@echoo/tools/formatter-provider';
import type { ToolFormatterInstanceConfig, FormatterAvailableLangConfigsType } from '@echoo/tools/formatter-provider';
import { FormatterBaseComponent } from '../features/tools/formatters/formatter-base/formatter-base.component';
import type { ToolConfig } from './types/tool-config';

export const ToolFormatterInstanceConfigs: {
	[key in FormatterAvailableLangConfigsType]: ToolFormatterInstanceConfig;
} = {
	json: {
		langKey: 'json',
		display: 'JSON',
		icon: 'file-json',
		formatterProvider: PrettierFormatterProvider.WithParser('json', 'json'),
	},
	rust: {
		langKey: 'rust',
		display: 'Rust',
		icon: 'file-rust',
		formatterProvider: PrettierFormatterProvider.WithParser('jinx-rust', 'rust'),
	},
	html: {
		langKey: 'html',
		display: 'HTML',
		icon: 'file-html',
		formatterProvider: PrettierFormatterProvider.WithParser('html', 'html'),
	},
	xml: {
		langKey: 'xml',
		display: 'XML',
		icon: 'xml',
		formatterProvider: new XMLFormatterProvider(),
	},
	css: {
		langKey: 'css',
		display: 'CSS/SC(LE)SS',
		icon: 'file-css',
		formatterProvider: PrettierFormatterProvider.WithParser('css', 'css'),
	},
	javascript: {
		langKey: 'javascript',
		display: 'JavaScript',
		icon: 'javascript',
		formatterProvider: PrettierFormatterProvider.WithParser('babel', 'javascript'),
	},
	typescript: {
		langKey: 'typescript',
		display: 'TypeScript',
		icon: 'typescript',
		formatterProvider: PrettierFormatterProvider.WithParser('typescript', 'typescript'),
	},
	markdown: {
		langKey: 'markdown',
		display: 'Markdown',
		icon: 'file-markdown',
		formatterProvider: PrettierFormatterProvider.WithParser('markdown', 'markdown'),
	},
	yaml: {
		langKey: 'yaml',
		display: 'YAML',
		icon: 'file-yaml',
		formatterProvider: PrettierFormatterProvider.WithParser('yaml', 'yaml'),
	},
	sql: {
		langKey: 'sql',
		display: 'SQL',
		icon: 'sql',
		formatterProvider: new SQLFormatterProvider(),
	},
	nginx: {
		langKey: 'nginx',
		display: 'Nginx',
		icon: 'nginx-config',
		formatterProvider: PrettierFormatterProvider.WithParser('nginx', 'nginx'),
	},
};

type FormatterToolConfig = ToolConfig & {
	data: ToolFormatterInstanceConfig;
};

const formatterComponentRoutes: FormatterToolConfig[] = Object.keys(ToolFormatterInstanceConfigs).map((langKey) => {
	const key = langKey as FormatterAvailableLangConfigsType;
	const data = ToolFormatterInstanceConfigs[key];
	return {
		title: data.display,
		uniqueId: `${langKey}-formatter`,
		icon: data.icon,
		routerLink: [langKey],
		component: FormatterBaseComponent,
		data: data,
	};
});

export const RegisterdTools: ToolConfig[] = [
	{
		title: 'Formatter',
		uniqueId: 'formatter',
		icon: 'seperate-vertical',
		routerLink: ['formatters'],
		children: [...formatterComponentRoutes],
	},
];
