import { IconDefinition } from '@ant-design/icons-angular';

export type EchooIconNames = 'seperate-vertial' | 'file-json';

export type EchooIconDefinitionOutline = IconDefinition & {
  name: EchooIconNames;
  theme: 'outline';
};

export const outlineIcons: EchooIconDefinitionOutline[] = [
  {
    name: 'seperate-vertial',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v18M8 8l-4 4l4 4m8 0l4-4l-4-4"/></svg>`,
    theme: 'outline',
  },
  {
    name: 'file-json',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><path d="M14 2v6h6m-10 4a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1a1 1 0 0 1 1 1v1a1 1 0 0 0 1 1m4 0a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1a1 1 0 0 1-1-1v-1a1 1 0 0 0-1-1"/></g></svg>`,
    theme: 'outline',
  },
];
