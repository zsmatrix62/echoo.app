import { FormatterJsonComponent } from '../features/tools/formatters/formatter-json/formatter-json.component';
import type { ToolConfig } from './types/tool-config';

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
      {
        title: 'HTML',
        uniqueId: 'html-formatter',
        icon: 'file-html',
        routerLink: ['html'],
        component: FormatterJsonComponent,
      },
    ],
  },
];
