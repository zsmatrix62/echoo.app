import type { EchooIconNames } from '@echoo/components/echoo-icons';
import { PrettierFormatterProvider } from '../providers/prettier';
import type { FormatterProvider } from './formatter-provider';
import { SQLFormatterProvider } from '../providers/sql';
import { XMLFormatterProvider } from '../providers/xml';

export type FormatterAvailableLangsType = keyof typeof FormatterAvailableLangs;

export type FormatterAvailableLangsConfig = {
  langKey: string;
  display: string;
  icon: EchooIconNames;
  formatterProvider: FormatterProvider<unknown>;
};

export const FormatterAvailableLangs: {
  [key: string]: FormatterAvailableLangsConfig;
} = {
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
  javascript: {
    langKey: 'javascript',
    display: 'JavaScript',
    icon: 'javascript',
    formatterProvider: PrettierFormatterProvider.WithParser(
      'babel',
      'javascript'
    ),
  },
  typescript: {
    langKey: 'typescript',
    display: 'TypeScript',
    icon: 'typescript',
    formatterProvider: PrettierFormatterProvider.WithParser(
      'typescript',
      'typescript'
    ),
  },
  markdown: {
    langKey: 'markdown',
    display: 'Markdown',
    icon: 'file-markdown',
    formatterProvider: PrettierFormatterProvider.WithParser(
      'markdown',
      'markdown'
    ),
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
