import type { FormatterAvailableLangConfigsConfig } from '@echoo/tools/formatter-provider';
import { FormatterAvailableLangConfigs } from '@echoo/tools/formatter-provider';
import { FormatterBaseComponent } from '../features/tools/formatters/formatter-base/formatter-base.component';
import { FormatterJsonComponent } from '../features/tools/formatters/formatter-json/formatter-json.component';
import type { ToolConfig } from './types/tool-config';

type FormatterToolConfig = ToolConfig & {
  data: FormatterAvailableLangConfigsConfig;
};

const formatterComponentRoutes: FormatterToolConfig[] = Object.keys(
  FormatterAvailableLangConfigs
).map((langKey) => {
  return {
    title: FormatterAvailableLangConfigs[langKey].display,
    uniqueId: `${langKey}-formatter`,
    icon: FormatterAvailableLangConfigs[langKey].icon,
    routerLink: [langKey],
    component: FormatterBaseComponent,
    data: FormatterAvailableLangConfigs[langKey],
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
