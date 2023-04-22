import {
  PrettierFormatterProvider,
  SQLFormatterProvider,
  XMLFormatterProvider,
} from '@echoo/tools/formatter-provider';
import type {
  ToolFormatterInstanceConfig,
  FormatterAvailableLangConfigsType,
} from '@echoo/tools/formatter-provider';
import { FormatterBaseComponent } from '../features/tools/formatters/formatter-base/formatter-base.component';
import { FormatterJsonComponent } from '../features/tools/formatters/formatter-json/formatter-json.component';
import type { ToolConfig } from './types/tool-config';

export const ToolFormatterInstanceConfigs: {
  [key in FormatterAvailableLangConfigsType]: ToolFormatterInstanceConfig;
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

type FormatterToolConfig = ToolConfig & {
  data: ToolFormatterInstanceConfig;
};

const formatterComponentRoutes: FormatterToolConfig[] = Object.keys(
  ToolFormatterInstanceConfigs
).map((langKey) => {
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
    children: [
      {
        title: 'JSON',
        uniqueId: 'json-formatter',
        icon: 'file-json',
        routerLink: ['json'],
        component: FormatterJsonComponent,
      },
      ...formatterComponentRoutes,
    ],
  },
];
