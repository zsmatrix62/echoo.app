import type { IconDefinition } from '@ant-design/icons-angular';

export type EchooIconNames =
  | 'seperate-vertical'
  | 'file-json'
  | 'file-html'
  | 'file-css'
  | 'file-markdown'
  | 'file-php'
  | 'file-yaml'
  | 'file-xml'
  | 'file-javascript'
  | 'file-typescript'
  | 'file-sql'
  | 'file-python'
  | 'file-golang'
  | 'xml'
  | 'sql'
  | 'typescript'
  | 'javascript'
  | 'paste-go'
  | 'nginx-config'
  | 'sandbox'
  | 'help-circle'
  | 'github'
  | 'compress'
  | 'clipboard-copy'
  | 'arrows-random'
  | 'random'
  | 'broom'
  | 'thunder'
  | 'open-file-folder'
  | 'trash';

export type EchooIconDefinitionOutline = IconDefinition & {
  name: EchooIconNames;
  theme: 'outline';
};

export const outlineIcons: EchooIconDefinitionOutline[] = [
  {
    name: 'thunder',
    theme: 'outline',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M11 15H6l7-14v8h5l-7 14v-8Z"/></svg>`,
  },
  {
    name: 'open-file-folder',
    theme: 'outline',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M4.08 5A3.08 3.08 0 0 0 1 8.08v17.935c0 .755.17 1.576.504 2.28a1 1 0 0 0 .073.176a4.783 4.783 0 0 0 4.498 2.531h17.927a3.033 3.033 0 0 0 2.887-2.15l3.957-11.82l.005-.016A3.085 3.085 0 0 0 28 13v-1c0-1.701-1.299-3-3-3h-8.167a1.09 1.09 0 0 1-.759-.318L13.626 6.19l-.008-.009A4.06 4.06 0 0 0 10.755 5H4.08ZM26 13H10.886a4.679 4.679 0 0 0-4.404 3.102l-.003.008C4.62 21.439 3.583 24.273 3 25.768V8.08C3 7.484 3.484 7 4.08 7h6.675a2.06 2.06 0 0 1 1.449.596l2.448 2.492l.009.009a3.09 3.09 0 0 0 2.172.903H25c.596 0 1 .404 1 1v1ZM4.445 28.657a2.779 2.779 0 0 1-.425-.292l.042-.061c.047-.073.091-.152.132-.23c.082-.16.182-.38.31-.684c.507-1.21 1.569-4.043 3.862-10.618A2.68 2.68 0 0 1 10.886 15h17.025a1.087 1.087 0 0 1 1.036 1.406l-3.96 11.826a.493.493 0 0 0-.005.017l-.004.015a1.034 1.034 0 0 1-.984.738H6.045c-.021 0-.043 0-.065.002a2.783 2.783 0 0 1-1.535-.347Z"/></svg>`,
  },
  {
    name: 'broom',
    theme: 'outline',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m19.36 2.72l1.42 1.42l-5.72 5.71c1.07 1.54 1.22 3.39.32 4.59L9.06 8.12c1.2-.9 3.05-.75 4.59.32l5.71-5.72M5.93 17.57c-2.01-2.01-3.24-4.41-3.58-6.65l4.88-2.09l7.44 7.44l-2.09 4.88c-2.24-.34-4.64-1.57-6.65-3.58Z"/></svg>`,
  },
  {
    name: 'seperate-vertical',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v18M8 8l-4 4l4 4m8 0l4-4l-4-4"/></svg>`,
    theme: 'outline',
  },
  {
    name: 'file-json',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><path d="M14 2v6h6m-10 4a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1a1 1 0 0 1 1 1v1a1 1 0 0 0 1 1m4 0a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1a1 1 0 0 1-1-1v-1a1 1 0 0 0-1-1"/></g></svg>`,
    theme: 'outline',
  },
  {
    name: 'file-html',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256"><path fill="currentColor" d="M128 152a8 8 0 0 1-8 8h-8v48a8 8 0 0 1-16 0v-48h-8a8 8 0 0 1 0-16h32a8 8 0 0 1 8 8Zm-64-8a8 8 0 0 0-8 8v20H40v-20a8 8 0 0 0-16 0v56a8 8 0 0 0 16 0v-20h16v20a8 8 0 0 0 16 0v-56a8 8 0 0 0-8-8Zm176 56h-12v-48a8 8 0 0 0-16 0v56a8 8 0 0 0 8 8h20a8 8 0 0 0 0-16Zm-45.86-55.71a8 8 0 0 0-9 3.59L168 176.45l-17.14-28.57A8 8 0 0 0 136 152v56a8 8 0 0 0 16 0v-27.12l9.14 15.24a8 8 0 0 0 13.72 0l9.14-15.24V208a8 8 0 0 0 16 0v-56a8 8 0 0 0-5.86-7.71ZM208 120a8 8 0 0 1-8-8V96h-48a8 8 0 0 1-8-8V40H56v72a8 8 0 0 1-16 0V40a16 16 0 0 1 16-16h96a8 8 0 0 1 5.66 2.34l56 56A8 8 0 0 1 216 88v24a8 8 0 0 1-8 8Zm-19.31-40L160 51.31V80Z"/></svg>`,
    theme: 'outline',
  },
  {
    name: 'file-css',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256"><path fill="currentColor" d="M48 180c0 11 7.18 20 16 20a14.24 14.24 0 0 0 10.22-4.66a8 8 0 1 1 11.55 11.06A30 30 0 0 1 64 216c-17.65 0-32-16.15-32-36s14.35-36 32-36a30 30 0 0 1 21.77 9.6a8 8 0 1 1-11.55 11.06A14.24 14.24 0 0 0 64 160c-8.82 0-16 9-16 20Zm79.6-8.69c-4-1.16-8.14-2.35-10.45-3.84c-1.26-.81-1.23-1-1.12-1.9a4.54 4.54 0 0 1 2-3.67c4.6-3.12 15.34-1.73 19.83-.56a8 8 0 0 0 4.07-15.48c-2.12-.55-21-5.22-32.83 2.76a20.55 20.55 0 0 0-9 14.95c-2 15.88 13.64 20.41 23 23.11c12.07 3.49 13.13 4.92 12.78 7.59c-.31 2.41-1.26 3.34-2.14 3.93c-4.6 3.06-15.17 1.56-19.55.36a8 8 0 0 0-4.3 15.41a61.23 61.23 0 0 0 15.18 2c5.83 0 12.3-1 17.49-4.46a20.82 20.82 0 0 0 9.19-15.23c2.25-17.28-14.27-22.11-24.15-24.97Zm64 0c-4-1.16-8.14-2.35-10.45-3.84c-1.25-.81-1.23-1-1.12-1.9a4.54 4.54 0 0 1 2-3.67c4.6-3.12 15.34-1.73 19.82-.56a8 8 0 0 0 4.07-15.48c-2.11-.55-21-5.22-32.83 2.76a20.58 20.58 0 0 0-8.95 14.95c-2 15.88 13.65 20.41 23 23.11c12.06 3.49 13.12 4.92 12.78 7.59c-.31 2.41-1.26 3.34-2.15 3.93c-4.6 3.06-15.16 1.56-19.54.36a8 8 0 0 0-4.3 15.44a61.34 61.34 0 0 0 15.19 2c5.82 0 12.3-1 17.49-4.46a20.81 20.81 0 0 0 9.18-15.23c2.21-17.31-14.31-22.14-24.2-25ZM40 112V40a16 16 0 0 1 16-16h96a8 8 0 0 1 5.66 2.34l56 56A8 8 0 0 1 216 88v24a8 8 0 1 1-16 0V96h-48a8 8 0 0 1-8-8V40H56v72a8 8 0 0 1-16 0Zm120-32h28.68L160 51.31Z"/></svg>`,
    theme: 'outline',
  },
  {
    name: 'nginx-config',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M7.62.102a.757.757 0 0 1 .76 0l6.246 3.625a.75.75 0 0 1 .374.648v7.25a.75.75 0 0 1-.374.648L8.38 15.898a.757.757 0 0 1-.76 0l-6.246-3.625A.75.75 0 0 1 1 11.625v-7.25a.75.75 0 0 1 .374-.648L7.62.102ZM2.508 4.806v6.388L8 14.382l5.492-3.188V4.806L8 1.618L2.508 4.806Zm2.475-.249a.757.757 0 0 1 .822.163l4.241 4.22V5.25c0-.414.338-.75.754-.75s.754.336.754.75v5.5a.75.75 0 0 1-.466.693a.757.757 0 0 1-.821-.163L6.026 7.06v3.69c0 .414-.338.75-.754.75a.752.752 0 0 1-.754-.75v-5.5a.75.75 0 0 1 .465-.693Z"/></svg>`,
    theme: 'outline',
  },

  {
    name: 'sandbox',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="m7.5 4.21l4.5 2.6l4.5-2.6m-9 15.58V14.6L3 12m18 0l-4.5 2.6v5.19M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"/></g></svg>`,
    theme: 'outline',
  },
  {
    name: 'trash',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>`,
    theme: 'outline',
  },
  {
    name: 'compress',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M4 9v2h16V9H4zm12-5l-1.41-1.41L13 4.17V1h-2v3.19L9.39 2.61L8 4l4 4l4-4zM4 14h16v-2H4v2zm4 5l1.39 1.39L11 18.81V22h2v-3.17l1.59 1.59L16 19l-4-4l-4 4z"/></svg>`,
    theme: 'outline',
  },
  {
    name: 'clipboard-copy',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2M16 4h2a2 2 0 0 1 2 2v4m1 4H11"/><path d="m15 10l-4 4l4 4"/></g></svg>`,
    theme: 'outline',
  },

  {
    name: 'help-circle',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3m.08 4h.01"/></g></svg>`,
    theme: 'outline',
  },
  {
    name: 'arrows-random',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 21h-4v-4m0 4l5-5M6.5 9.504l-3.5-2L5 4M3 7.504l6.83-1.87M4 16l4-1l1 4m-1-4l-3.5 6M21 5l-.5 4l-4-.5m4 .5L16 3.5"/></svg>`,
    theme: 'outline',
  },
  {
    name: 'random',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="520" height="472" viewBox="0 0 520 472"><path fill="currentColor" d="M70 365q74 0 118-57q0-4-5-7l-19-38q-13 27-38.5 43.5T70 323H21q-8 0-14.5 6.5T0 344t6.5 14.5T21 365h49zM442 9q-16-14-30 0q-15 15 0 30l27 28h-83q-73 0-117 57q0 3 4 7l19 38q13-27 38.5-43.5T356 109h83l-27 28q-15 15 0 30q6 6 15 6q7 0 15-6l64-64q13-15 0-30zm0 256q-16-14-30 0q-15 15 0 30l27 28h-83q-30 0-56-16.5T260 263l-23-47l-24-47l-10-19q-18-38-54-60.5T70 67H21q-8 0-14.5 6.5T0 88t6.5 14.5T21 109h49q64 0 96 60l24 47l23 47l11 19q20 38 55.5 60.5T358 365h84l-28 28q-15 15 0 30q6 6 15 6q8 0 15-6l64-64q13-15 0-30z"/></svg>`,
    theme: 'outline',
  },
  {
    name: 'github',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59c.4.07.55-.17.55-.38c0-.19-.01-.82-.01-1.49c-2.01.37-2.53-.49-2.69-.94c-.09-.23-.48-.94-.82-1.13c-.28-.15-.68-.52-.01-.53c.63-.01 1.08.58 1.23.82c.72 1.21 1.87.87 2.33.66c.07-.52.28-.87.51-1.07c-1.78-.2-3.64-.89-3.64-3.95c0-.87.31-1.59.82-2.15c-.08-.2-.36-1.02.08-2.12c0 0 .67-.21 2.2.82c.64-.18 1.32-.27 2-.27c.68 0 1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82c.44 1.1.16 1.92.08 2.12c.51.56.82 1.27.82 2.15c0 3.07-1.87 3.75-3.65 3.95c.29.25.54.73.54 1.48c0 1.07-.01 1.93-.01 2.2c0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>`,
    theme: 'outline',
  },
  {
    name: 'file-javascript',
    theme: 'outline',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v2a.75.75 0 0 1-1.5 0v-2a.25.25 0 0 0-.25-.25H1.75a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h13.5a.75.75 0 0 1 0 1.5H1.75A1.75 1.75 0 0 1 0 14.25V1.75Zm8.25 4A.75.75 0 0 1 9 6.5v4c0 1.005-.276 1.758-.845 2.232c-.543.453-1.201.518-1.655.518a.75.75 0 0 1 0-1.5c.346 0 .563-.06.695-.17c.106-.088.305-.335.305-1.08v-4a.75.75 0 0 1 .75-.75Zm3.026.83c.418-.498 1.075-.83 1.974-.83c.835 0 1.465.286 1.89.735a.75.75 0 0 1-1.09 1.03c-.11-.116-.33-.265-.8-.265c-.5 0-.72.168-.826.295A.767.767 0 0 0 12.25 8c0 .104.043.3.174.455c.107.127.325.295.826.295c.076 0 .149.011.218.032c.663.094 1.164.39 1.506.798c.394.47.526 1.024.526 1.42c0 .396-.132.95-.526 1.42c-.418.498-1.075.83-1.974.83c-.835 0-1.465-.286-1.89-.735a.75.75 0 0 1 1.09-1.03c.11.116.33.265.8.265c.5 0 .72-.168.826-.295A.767.767 0 0 0 14 11c0-.104-.043-.3-.174-.455c-.107-.127-.325-.295-.826-.295a.748.748 0 0 1-.218-.032c-.663-.095-1.164-.39-1.506-.798A2.263 2.263 0 0 1 10.75 8c0-.396.132-.95.526-1.42Z"/></svg>`,
  },
  {
    name: 'file-typescript',
    theme: 'outline',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v2a.75.75 0 0 1-1.5 0v-2a.25.25 0 0 0-.25-.25H1.75a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h13.5a.75.75 0 0 1 0 1.5H1.75A1.75 1.75 0 0 1 0 14.25V1.75ZM4.75 6.5a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5h-1v5.25a.75.75 0 0 1-1.5 0V7.25H5.5a.75.75 0 0 1-.75-.75Zm6.526.08c.418-.498 1.075-.83 1.974-.83c.835 0 1.465.286 1.89.735a.75.75 0 0 1-1.09 1.03c-.11-.116-.33-.265-.8-.265c-.5 0-.72.168-.826.295A.767.767 0 0 0 12.25 8c0 .104.043.3.174.455c.107.127.325.295.826.295c.076 0 .149.011.218.032c.663.094 1.164.39 1.506.798c.394.47.526 1.024.526 1.42c0 .396-.132.95-.526 1.42c-.418.498-1.075.83-1.974.83c-.835 0-1.465-.286-1.89-.735a.75.75 0 0 1 1.09-1.03c.11.116.33.265.8.265c.5 0 .72-.168.826-.295A.767.767 0 0 0 14 11c0-.104-.043-.3-.174-.455c-.107-.127-.325-.295-.826-.295a.748.748 0 0 1-.218-.032c-.663-.095-1.164-.39-1.506-.798A2.263 2.263 0 0 1 10.75 8c0-.396.132-.95.526-1.42Z"/></svg>`,
  },
  {
    name: 'file-python',
    theme: 'outline',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19.14 7.5A2.86 2.86 0 0 1 22 10.36v3.78A2.86 2.86 0 0 1 19.14 17H12c0 .39.32.96.71.96H17v1.68a2.86 2.86 0 0 1-2.86 2.86H9.86A2.86 2.86 0 0 1 7 19.64v-3.75a2.85 2.85 0 0 1 2.86-2.85h5.25a2.85 2.85 0 0 0 2.85-2.86V7.5h1.18m-4.28 11.79c-.4 0-.72.3-.72.89c0 .59.32.71.72.71a.71.71 0 0 0 .71-.71c0-.59-.32-.89-.71-.89m-10-1.79A2.86 2.86 0 0 1 2 14.64v-3.78A2.86 2.86 0 0 1 4.86 8H12c0-.39-.32-.96-.71-.96H7V5.36A2.86 2.86 0 0 1 9.86 2.5h4.28A2.86 2.86 0 0 1 17 5.36v3.75a2.85 2.85 0 0 1-2.86 2.85H8.89a2.85 2.85 0 0 0-2.85 2.86v2.68H4.86M9.14 5.71c.4 0 .72-.3.72-.89c0-.59-.32-.71-.72-.71c-.39 0-.71.12-.71.71s.32.89.71.89Z"/></svg>`,
  },
  {
    name: 'file-sql',
    theme: 'outline',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256"><path fill="currentColor" d="M48 120a8 8 0 0 0 8-8V40h88v48a8 8 0 0 0 8 8h48v16a8 8 0 0 0 16 0V88a8 8 0 0 0-2.34-5.66l-56-56A8 8 0 0 0 152 24H56a16 16 0 0 0-16 16v72a8 8 0 0 0 8 8Zm112-68.69L188.69 80H160ZM228 208a8 8 0 0 1-8 8h-28a8 8 0 0 1-8-8v-56a8 8 0 0 1 16 0v48h20a8 8 0 0 1 8 8ZM91.82 196.31a20.82 20.82 0 0 1-9.19 15.23C77.44 215 71 216 65.14 216A60.72 60.72 0 0 1 50 214a8 8 0 0 1 4.3-15.41c4.38 1.2 14.95 2.7 19.55-.36c.89-.59 1.83-1.52 2.14-3.93c.35-2.67-.71-4.1-12.78-7.59c-9.35-2.7-25-7.23-23-23.11a20.55 20.55 0 0 1 9-14.95c11.84-8 30.72-3.31 32.83-2.76a8 8 0 0 1-4.08 15.48c-4.49-1.17-15.22-2.56-19.82.56a4.54 4.54 0 0 0-2 3.67c-.12.9-.14 1.08 1.12 1.9c2.31 1.49 6.44 2.68 10.45 3.84c9.79 2.83 26.35 7.66 24.11 24.97Zm71 3.23A39.05 39.05 0 0 0 168 180c0-19.85-14.35-36-32-36s-32 16.15-32 36s14.35 36 32 36a29.18 29.18 0 0 0 15.9-4.78l2.44 2.44a8 8 0 0 0 11.31-11.32ZM136 200c-8.82 0-16-9-16-20s7.18-20 16-20s16 9 16 20a24.41 24.41 0 0 1-1.18 7.51l-1.17-1.17a8 8 0 1 0-11.31 11.32l1.68 1.67a12.93 12.93 0 0 1-4.02.67Z"/></svg>`,
  },
  {
    name: 'file-golang',
    theme: 'outline',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="512" viewBox="0 0 640 512"><path fill="currentColor" d="M400.1 194.8c-10.9 2.8-19.9 4.3-29.1 7.6c-7.3 1.9-14.7 3.9-23.2 6.1l-.6.1c-4.2 1.2-4.6 1.3-8.5-3.2c-4.7-5.3-8.1-8.7-14.6-11.9c-19.7-9.6-38.7-6.8-56.4 4.7c-21.2 13.7-32.1 34-31.8 59.2c.3 25 17.4 45.5 41.2 48.9c22 2.8 39.8-4.6 53.8-20.5c2.1-2.6 4-5.3 6.1-8.3c.8-1 1.5-2.1 2.3-3.3h-60.1c-6.5 0-8.1-4-5.9-9.3c4-9.7 11.5-25.9 15.9-34c.9-1.8 3.1-5.8 6.9-5.8h101.1c4.5-13.4 11.8-26.9 21.6-39.7c22.7-29.9 49.3-45.5 87.2-52c31.8-5.6 61.7-2.5 88.9 15.9c24.6 16.8 39.8 39.6 43.9 69.5c5.3 42.1-6.9 76.3-36.7 105.6c-19.7 20.9-44.9 34-73.9 39.9c-5.6 1-11.1 1.5-16.5 2c-2.9.2-5.7.5-8.5.8c-28.3-.6-54.2-8.7-76-27.4c-15.3-13.3-25.9-29.6-31.1-48.5c-3.7 7.3-8 14.4-14 21.1c-21.6 29.6-50.9 48-87.9 52.9c-30.6 4.1-58.9-1.8-83.9-20.5c-23-17.5-36.1-40.5-39.5-69.2c-4.1-34 5.9-65.4 26.4-91.3c22.2-29 51.5-47.4 87.3-53.9c29.3-6.2 57.3-1.9 82.6 15.3c16.5 10.9 28.3 25.8 36.1 43.9c1.9 2.8.6 4.4-3.1 5.3zm-351.8 5.6c-1.25 0-1.56-.6-.94-1.6l6.55-8.4c.62-.9 2.18-1.5 3.43-1.5H168.6c1.2 0 1.5.9.9 1.8l-5.3 8.1c-.6 1-2.2 1.9-3.1 1.9l-112.8-.3zM1.246 229.1c-1.246 0-1.558-.7-.934-1.6l6.543-8.4c.624-.9 2.182-1.6 3.425-1.6H152.4c1.2 0 1.8 1 1.5 1.9l-2.5 7.5c-.3 1.2-1.5 1.9-2.8 1.9l-147.354.3zm74.474 26.8c-.62.9-.31 1.8.93 1.8l67.95.3c.9 0 2.2-.9 2.2-2.1l.6-7.5c0-1.3-.6-2.2-1.9-2.2H83.2c-1.25 0-2.49.9-3.12 1.9l-4.36 7.8zm501.48-18c-.2-2.6-.3-4.8-.7-7c-5.6-30.8-34-48.3-63.6-41.4c-29 6.5-47.7 24.9-54.5 54.2c-5.6 24.3 6.2 48.9 28.6 58.9c17.2 7.5 34.3 6.6 50.8-1.9c24.6-13.6 38-32.7 39.6-59.5c-.1-1.2-.1-2.3-.2-3.3z"/></svg>`,
  },
  {
    name: 'paste-go',
    theme: 'outline',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M5 21q-.825 0-1.413-.588T3 19V5q0-.825.588-1.413T5 3h4.175q.275-.875 1.075-1.438T12 1q1 0 1.788.563T14.85 3H19q.825 0 1.413.588T21 5v6h-2V5h-2v3H7V5H5v14h5v2H5Zm13 0l-1.4-1.425L18.175 18H12v-2h6.175L16.6 14.4L18 13l4 4l-4 4ZM12 5q.425 0 .713-.288T13 4q0-.425-.288-.713T12 3q-.425 0-.713.288T11 4q0 .425.288.713T12 5Z"/></svg>`,
  },
  {
    name: 'file-markdown',
    theme: 'outline',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15"><path fill="currentColor" d="m2.5 5.5l.354-.354A.5.5 0 0 0 2 5.5h.5Zm2 2l-.354.354l.354.353l.354-.353L4.5 7.5Zm2-2H7a.5.5 0 0 0-.854-.354L6.5 5.5Zm4 4l-.354.354l.354.353l.354-.353L10.5 9.5ZM1.5 3h12V2h-12v1Zm12.5.5v8h1v-8h-1Zm-.5 8.5h-12v1h12v-1ZM1 11.5v-8H0v8h1Zm.5.5a.5.5 0 0 1-.5-.5H0A1.5 1.5 0 0 0 1.5 13v-1Zm12.5-.5a.5.5 0 0 1-.5.5v1a1.5 1.5 0 0 0 1.5-1.5h-1ZM13.5 3a.5.5 0 0 1 .5.5h1A1.5 1.5 0 0 0 13.5 2v1Zm-12-1A1.5 1.5 0 0 0 0 3.5h1a.5.5 0 0 1 .5-.5V2ZM3 10V5.5H2V10h1Zm-.854-4.146l2 2l.708-.708l-2-2l-.708.708Zm2.708 2l2-2l-.708-.708l-2 2l.708.708ZM6 5.5V10h1V5.5H6Zm4-.5v4.5h1V5h-1ZM8.146 7.854l2 2l.708-.708l-2-2l-.708.708Zm2.708 2l2-2l-.708-.708l-2 2l.708.708Z"/></svg>`,
  },
  {
    name: 'file-yaml',
    theme: 'outline',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M14 4.5V14a2 2 0 0 1-2 2v-1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM2.133 15.849v-1.535l1.339-2.464h-.856l-.855 1.696h-.032L.876 11.85H0l1.339 2.479v1.52h.794Zm2.287 0v-2.66h.038l.952 2.159h.516l.946-2.16h.038v2.661h.715V11.85h-.8l-1.14 2.596H5.66L4.52 11.85h-.805v3.999h.706Zm4.71-.674h1.696v.674H8.338V11.85h.791v3.325Z"/></svg>`,
  },
  {
    name: 'file-xml',
    theme: 'outline',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M14 4.5V14a2 2 0 0 1-2 2v-1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM3.527 11.85h-.893l-.823 1.439h-.036L.943 11.85H.012l1.227 1.983L0 15.85h.861l.853-1.415h.035l.85 1.415h.908l-1.254-1.992l1.274-2.007Zm.954 3.999v-2.66h.038l.952 2.159h.516l.946-2.16h.038v2.661h.715V11.85h-.8l-1.14 2.596h-.025L4.58 11.85h-.806v3.999h.706Zm4.71-.674h1.696v.674H8.4V11.85h.791v3.325Z"/></svg>`,
  },
  {
    name: 'file-php',
    theme: 'outline',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M9.349 13.609H8.088l-.687 3.531h1.12c.739 0 1.291-.14 1.656-.421c.359-.276.604-.745.729-1.396c.124-.625.067-1.068-.161-1.328c-.235-.255-.699-.385-1.396-.385zM16 7.584C7.161 7.584 0 11.355 0 16s7.161 8.416 16 8.416S32 20.645 32 16s-7.161-8.416-16-8.416zm-4.349 9.937a3.199 3.199 0 0 1-1.219.733c-.448.141-1.02.219-1.713.219H7.14l-.432 2.24H4.869l1.641-8.432h3.531c1.063 0 1.839.276 2.328.833c.485.557.636 1.339.437 2.339a3.818 3.818 0 0 1-.405 1.131a3.827 3.827 0 0 1-.751.937zm5.37.952l.724-3.733c.083-.423.052-.713-.095-.871c-.14-.151-.448-.229-.916-.229h-1.453l-.937 4.833h-1.828l1.64-8.437h1.823l-.437 2.245h1.625c1.027 0 1.729.177 2.115.531c.391.36.505.937.355 1.735l-.767 3.927zm10.124-3.02a3.683 3.683 0 0 1-.405 1.131a3.823 3.823 0 0 1-.745.937a3.282 3.282 0 0 1-1.224.733c-.448.141-1.021.219-1.713.219h-1.573l-.437 2.24h-1.839l1.641-8.432h3.531c1.063 0 1.839.276 2.328.839c.485.552.636 1.333.437 2.333zm-3.457-1.844h-1.256l-.687 3.531h1.115c.744 0 1.296-.14 1.656-.421c.364-.276.609-.745.735-1.396c.124-.625.067-1.068-.168-1.328c-.228-.255-.697-.385-1.395-.385z"/></svg>`,
  },
  {
    name: 'xml',
    theme: 'outline',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M24 21V9h-2v14h8v-2h-6zM18 9l-1.52 5l-.48 1.98l-.46-1.98L14 9h-2v14h2v-8l-.16-2l.58 2L16 19.63L17.58 15l.58-2l-.16 2v8h2V9h-2zm-8 0H8l-2 6l-2-6H2l2.75 7L2 23h2l2-6l2 6h2l-2.75-7L10 9z"/></svg>`,
  },
  {
    name: 'sql',
    theme: 'outline',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M24 21V9h-2v14h8v-2h-6zM18 9h-4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h1v2a2 2 0 0 0 2 2h2v-2h-2v-2h1a2 2 0 0 0 2-2V11a2 2 0 0 0-2-2zm-4 12V11h4v10zm-6 2H2v-2h6v-4H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h6v2H4v4h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2z"/></svg>`,
  },
  {
    name: 'javascript',
    theme: 'outline',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v2a.75.75 0 0 1-1.5 0v-2a.25.25 0 0 0-.25-.25H1.75a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h13.5a.75.75 0 0 1 0 1.5H1.75A1.75 1.75 0 0 1 0 14.25V1.75Zm8.25 4A.75.75 0 0 1 9 6.5v4c0 1.005-.276 1.758-.845 2.232c-.543.453-1.201.518-1.655.518a.75.75 0 0 1 0-1.5c.346 0 .563-.06.695-.17c.106-.088.305-.335.305-1.08v-4a.75.75 0 0 1 .75-.75Zm3.026.83c.418-.498 1.075-.83 1.974-.83c.835 0 1.465.286 1.89.735a.75.75 0 0 1-1.09 1.03c-.11-.116-.33-.265-.8-.265c-.5 0-.72.168-.826.295A.767.767 0 0 0 12.25 8c0 .104.043.3.174.455c.107.127.325.295.826.295c.076 0 .149.011.218.032c.663.094 1.164.39 1.506.798c.394.47.526 1.024.526 1.42c0 .396-.132.95-.526 1.42c-.418.498-1.075.83-1.974.83c-.835 0-1.465-.286-1.89-.735a.75.75 0 0 1 1.09-1.03c.11.116.33.265.8.265c.5 0 .72-.168.826-.295A.767.767 0 0 0 14 11c0-.104-.043-.3-.174-.455c-.107-.127-.325-.295-.826-.295a.748.748 0 0 1-.218-.032c-.663-.095-1.164-.39-1.506-.798A2.263 2.263 0 0 1 10.75 8c0-.396.132-.95.526-1.42Z"/></svg>`,
  },
  {
    name: 'typescript',
    theme: 'outline',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="#007acc" d="M23.827 8.243a4.424 4.424 0 0 1 2.223 1.281a5.853 5.853 0 0 1 .852 1.143c.011.045-1.534 1.083-2.471 1.662c-.034.023-.169-.124-.322-.35a2.014 2.014 0 0 0-1.67-1c-1.077-.074-1.771.49-1.766 1.433a1.3 1.3 0 0 0 .153.666c.237.49.677.784 2.059 1.383c2.544 1.095 3.636 1.817 4.31 2.843a5.158 5.158 0 0 1 .416 4.333a4.764 4.764 0 0 1-3.932 2.815a10.9 10.9 0 0 1-2.708-.028a6.531 6.531 0 0 1-3.616-1.884a6.278 6.278 0 0 1-.926-1.371a2.655 2.655 0 0 1 .327-.208c.158-.09.756-.434 1.32-.761l1.024-.6l.214.312a4.771 4.771 0 0 0 1.35 1.292a3.3 3.3 0 0 0 3.458-.175a1.545 1.545 0 0 0 .2-1.974c-.276-.395-.84-.727-2.443-1.422a8.8 8.8 0 0 1-3.349-2.055a4.687 4.687 0 0 1-.976-1.777a7.116 7.116 0 0 1-.062-2.268a4.332 4.332 0 0 1 3.644-3.374a9 9 0 0 1 2.691.084Zm-8.343 1.483l.011 1.454h-4.63v13.148H7.6V11.183H2.97V9.755a13.986 13.986 0 0 1 .04-1.466c.017-.023 2.832-.034 6.245-.028l6.211.017Z"/></svg>`,
  },
];
