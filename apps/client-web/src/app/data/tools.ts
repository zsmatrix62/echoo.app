import type { EchooIconNames } from '@echoo/echoo-icons';
import { FormatterBaseComponent } from '../features/tools/formatters/formatter-base/formatter-base.component';
import { FormatterJsonComponent } from '../features/tools/formatters/formatter-json/formatter-json.component';
import type { ToolConfig } from './types/tool-config';

export const FormatterAvailableLangs: {
  [key: string]: {
    display: string;
    icon: EchooIconNames;
  };
} = {
  html: {
    display: 'HTML',
    icon: 'file-html',
  },
  go: {
    display: 'Go',
    icon: 'file-golang',
  },
  javascript: {
    display: 'JavaScript',
    icon: 'file-javascript',
  },
  python: {
    display: 'Python',
    icon: 'file-python',
  },
  sql: {
    display: 'SQL',
    icon: 'file-sql',
  },
};

export type FormatterAvailableLangsType = keyof typeof FormatterAvailableLangs;

const formatterComponentRoutes: ToolConfig[] = Object.keys(
  FormatterAvailableLangs
).map((langKey) => {
  return {
    title: langKey.toUpperCase(),
    uniqueId: `${langKey}-formatter`,
    icon: FormatterAvailableLangs[langKey].icon,
    routerLink: [langKey],
    component: FormatterBaseComponent,
    data: {
      langKey: langKey,
      lang: FormatterAvailableLangs[langKey],
    },
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
