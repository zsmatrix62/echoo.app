/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { Options as PrettierOptions } from 'prettier';
import { randCodeSnippet } from '@ngneat/falso';
import * as prettier from 'prettier/standalone';
import * as htmlParser from 'prettier/parser-html';
import * as babelParser from 'prettier/parser-babel';
import * as markdownParser from 'prettier/parser-markdown';
import * as yamlParser from 'prettier/parser-yaml';
import * as typescriptParser from 'prettier/parser-typescript';
// @ts-ignore
import * as xmlParser from '@prettier/plugin-xml';
// @ts-ignore
import * as nginxParser from 'prettier-plugin-nginx';
import type { ToolSettings } from '@echoo/types';
import type { FormatterToolProvider } from '../types/formatter-provider';
import type { FormatterAvailableLangConfigsType } from '../types/formatters';

type Parsers = 'html' | 'babel' | 'markdown' | 'yaml' | 'typescript' | 'sql' | 'nginx';

export type ToolFormatterPrettierOptionsType = Partial<PrettierOptions>;

export const ToolFormatterPrettierDefaultSettings: ToolSettings<ToolFormatterPrettierOptionsType> = {};

export class PrettierFormatterProvider implements FormatterToolProvider<ToolFormatterPrettierOptionsType> {
	parser: Parsers;
	lang: FormatterAvailableLangConfigsType;

	constructor(parser: Parsers, lang: FormatterAvailableLangConfigsType) {
		this.parser = parser;
		this.lang = lang;
	}

	static WithParser(parser: Parsers, lang: FormatterAvailableLangConfigsType) {
		return new PrettierFormatterProvider(parser, lang);
	}

	Format(
		code: string,
		options: {
			settings?: ToolSettings<ToolFormatterPrettierOptionsType>;
			errorCb?: ((err?: Error | undefined) => void) | undefined;
		},
	): string {
		let outputCode = code;

		try {
			outputCode = prettier.format(code, {
				parser: this.parser,
				plugins: [htmlParser, babelParser, markdownParser, yamlParser, typescriptParser, xmlParser, nginxParser],
				...options,
			});
		} catch (e) {
			options.errorCb?.(e as Error);
		}
		return outputCode;
	}

	ProvideSampleCode(): string {
		if (this.lang === 'html') {
			return '<html><body><h1>Hello World!</h1></body></html>';
		}

		if (this.lang == 'javascript') {
			return randCodeSnippet('javascript').join('\n');
		}

		if (this.lang == 'typescript') {
			return `var carInsuranceCompany = {	name: "Geico",market_capital: "$34.9 billion", }; var carInsuranceCompanyObj = JSON.stringify(obj); document.getElementById("insurance").innerHTML = carInsuranceCompanyObj;`;
		}

		if (this.lang == 'markdown') {
			return `# MarkDown Sample
============================

   Actor|Movie|Insurance
   --|:--:|--:
   Tom Cruise|MI5|Geico
  Arnold|Ture Lies|AllState
`;
		}

		if (this.lang == 'yaml') {
			return `CarInsurance:
        - Company: {name: State Farm, foundedin: 1922, website: www.statefarm.com }
        - Company: {name: Geico, foundedin: 1936, website: www.geico.com }
`;
		}
		if (this.lang == 'nginx') {
			return `server {
# server definition
listen 443 ssl; listen [::]:443 ssl;
server_name example.com;
location / { proxy_pass http://proxy; proxy_set_header Host $http_host;
proxy_set_header X-Real-IP $remote_addr; proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
proxy_set_header X-Forwarded-Proto $scheme;
proxy_read_timeout 1000; }
# end server definition
}`;
		}

		return '(No sample code available)';
	}
}
