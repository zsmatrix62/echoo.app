import { PrettierFormatterProvider, SQLFormatterProvider, XMLFormatterProvider } from '@echoo/tools/formatter-provider';
import type { ToolFormatterInstanceConfig, FormatterAvailableLangConfigsType } from '@echoo/tools/formatter-provider';
import { FormatterBaseComponent } from '../features/tools/formatters/formatter-base/formatter-base.component';
import type { ToolConfig } from './types/tool-config';

const subtitle1 = 'Minify and Beautify';
const subtitle2 = 'Beautify Codes';

export const ToolFormatterInstanceConfigs: {
	[key in FormatterAvailableLangConfigsType]: ToolFormatterInstanceConfig;
} = {
	json: {
		langKey: 'json',
		display: 'JSON',
		icon: 'file-json',
		formatterProvider: PrettierFormatterProvider.WithParser('json', 'json'),
		brandInfo: {
			title: 'JSON Formatter',
			subtitle: subtitle1,
		},
	},
	rust: {
		langKey: 'rust',
		display: 'Rust',
		icon: 'file-rust',
		formatterProvider: PrettierFormatterProvider.WithParser('jinx-rust', 'rust'),
		brandInfo: {
			title: 'Rust Formatter',
			subtitle: subtitle2,
		},
	},
	html: {
		langKey: 'html',
		display: 'HTML',
		icon: 'file-html',
		formatterProvider: PrettierFormatterProvider.WithParser('html', 'html'),
		brandInfo: {
			title: 'HTML / Angular / JSX Formatter',
			subtitle: subtitle2,
		},
	},
	xml: {
		langKey: 'xml',
		display: 'XML',
		icon: 'xml',
		formatterProvider: new XMLFormatterProvider(),
		brandInfo: {
			title: 'XML / SVG Formatter',
			subtitle: subtitle1,
		},
	},
	css: {
		langKey: 'css',
		display: 'CSS/SC(LE)SS',
		icon: 'file-css',
		formatterProvider: PrettierFormatterProvider.WithParser('css', 'css'),
		brandInfo: {
			title: 'CSS / SCSS / LESS Formatter',
			subtitle: subtitle2,
		},
	},
	javascript: {
		langKey: 'javascript',
		display: 'JavaScript',
		icon: 'javascript',
		formatterProvider: PrettierFormatterProvider.WithParser('babel', 'javascript'),
		brandInfo: {
			title: 'Javascript Formatter',
			subtitle: subtitle2,
		},
	},
	typescript: {
		langKey: 'typescript',
		display: 'TypeScript',
		icon: 'typescript',
		formatterProvider: PrettierFormatterProvider.WithParser('typescript', 'typescript'),
		brandInfo: {
			title: 'TypeScript Formatter',
			subtitle: subtitle2,
		},
	},
	markdown: {
		langKey: 'markdown',
		display: 'Markdown',
		icon: 'file-markdown',
		formatterProvider: PrettierFormatterProvider.WithParser('markdown', 'markdown'),
		brandInfo: {
			title: 'Markdown Formatter',
			subtitle: subtitle2,
		},
	},
	yaml: {
		langKey: 'yaml',
		display: 'YAML',
		icon: 'file-yaml',
		formatterProvider: PrettierFormatterProvider.WithParser('yaml', 'yaml'),
		brandInfo: {
			title: 'YAML Formatter',
			subtitle: subtitle2,
		},
	},
	sql: {
		langKey: 'sql',
		display: 'SQL',
		icon: 'sql',
		formatterProvider: new SQLFormatterProvider(),
		brandInfo: {
			title: 'SQL Formatter',
			subtitle: subtitle2,
		},
	},
	nginx: {
		langKey: 'nginx',
		display: 'Nginx',
		icon: 'nginx-config',
		formatterProvider: PrettierFormatterProvider.WithParser('nginx', 'nginx'),
		brandInfo: {
			title: 'Nginx Configuration Formatter',
			subtitle: subtitle2,
		},
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
