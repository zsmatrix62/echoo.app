import type { EchooIconNames } from '@echoo/echoo-icons';
import { PrettierFormatterProvider } from '../providers/prettier';
import type { FormatterProvider } from './formatter-provider';
import { SQLFormatterProvider } from '../providers/sql';

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
  javascript: {
    langKey: 'javascript',
    display: 'JavaScript',
    icon: 'file-javascript',
    formatterProvider: PrettierFormatterProvider.WithParser(
      'babel',
      'javascript'
    ),
  },
  typescript: {
    langKey: 'typescript',
    display: 'Typescript',
    icon: 'file-typescript',
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
    icon: 'file-sql',
    formatterProvider: new SQLFormatterProvider(),
  },
};
