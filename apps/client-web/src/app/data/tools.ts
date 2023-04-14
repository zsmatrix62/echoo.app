import {
  FormatterAvailableLangs,
  FormatterAvailableLangsConfig,
} from '@echoo/formatter-provider';
import { FormatterBaseComponent } from '../features/tools/formatters/formatter-base/formatter-base.component';
import { FormatterJsonComponent } from '../features/tools/formatters/formatter-json/formatter-json.component';
import type { ToolConfig } from './types/tool-config';

type FormatterToolConfig = ToolConfig & {
  data: FormatterAvailableLangsConfig;
};

const formatterComponentRoutes: FormatterToolConfig[] = Object.keys(
  FormatterAvailableLangs
).map((langKey) => {
  return {
    title: langKey.toUpperCase(),
    uniqueId: `${langKey}-formatter`,
    icon: FormatterAvailableLangs[langKey].icon,
    routerLink: [langKey],
    component: FormatterBaseComponent,
    data: FormatterAvailableLangs[langKey],
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
