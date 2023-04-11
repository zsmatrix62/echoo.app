import type {IconDefinition} from '@ant-design/icons-angular';

export type EchooIconNames = 'seperate-vertial' | 'file-json' | 'file-html' | 'css-file' | 'nginx-config';

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
	{
		name: 'file-html',
		icon: `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256"><path fill="currentColor" d="M128 152a8 8 0 0 1-8 8h-8v48a8 8 0 0 1-16 0v-48h-8a8 8 0 0 1 0-16h32a8 8 0 0 1 8 8Zm-64-8a8 8 0 0 0-8 8v20H40v-20a8 8 0 0 0-16 0v56a8 8 0 0 0 16 0v-20h16v20a8 8 0 0 0 16 0v-56a8 8 0 0 0-8-8Zm176 56h-12v-48a8 8 0 0 0-16 0v56a8 8 0 0 0 8 8h20a8 8 0 0 0 0-16Zm-45.86-55.71a8 8 0 0 0-9 3.59L168 176.45l-17.14-28.57A8 8 0 0 0 136 152v56a8 8 0 0 0 16 0v-27.12l9.14 15.24a8 8 0 0 0 13.72 0l9.14-15.24V208a8 8 0 0 0 16 0v-56a8 8 0 0 0-5.86-7.71ZM208 120a8 8 0 0 1-8-8V96h-48a8 8 0 0 1-8-8V40H56v72a8 8 0 0 1-16 0V40a16 16 0 0 1 16-16h96a8 8 0 0 1 5.66 2.34l56 56A8 8 0 0 1 216 88v24a8 8 0 0 1-8 8Zm-19.31-40L160 51.31V80Z"/></svg>`,
		theme: 'outline',
	},
	{
		name: 'css-file',
		icon: `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256"><path fill="currentColor" d="M48 180c0 11 7.18 20 16 20a14.24 14.24 0 0 0 10.22-4.66a8 8 0 1 1 11.55 11.06A30 30 0 0 1 64 216c-17.65 0-32-16.15-32-36s14.35-36 32-36a30 30 0 0 1 21.77 9.6a8 8 0 1 1-11.55 11.06A14.24 14.24 0 0 0 64 160c-8.82 0-16 9-16 20Zm79.6-8.69c-4-1.16-8.14-2.35-10.45-3.84c-1.26-.81-1.23-1-1.12-1.9a4.54 4.54 0 0 1 2-3.67c4.6-3.12 15.34-1.73 19.83-.56a8 8 0 0 0 4.07-15.48c-2.12-.55-21-5.22-32.83 2.76a20.55 20.55 0 0 0-9 14.95c-2 15.88 13.64 20.41 23 23.11c12.07 3.49 13.13 4.92 12.78 7.59c-.31 2.41-1.26 3.34-2.14 3.93c-4.6 3.06-15.17 1.56-19.55.36a8 8 0 0 0-4.3 15.41a61.23 61.23 0 0 0 15.18 2c5.83 0 12.3-1 17.49-4.46a20.82 20.82 0 0 0 9.19-15.23c2.25-17.28-14.27-22.11-24.15-24.97Zm64 0c-4-1.16-8.14-2.35-10.45-3.84c-1.25-.81-1.23-1-1.12-1.9a4.54 4.54 0 0 1 2-3.67c4.6-3.12 15.34-1.73 19.82-.56a8 8 0 0 0 4.07-15.48c-2.11-.55-21-5.22-32.83 2.76a20.58 20.58 0 0 0-8.95 14.95c-2 15.88 13.65 20.41 23 23.11c12.06 3.49 13.12 4.92 12.78 7.59c-.31 2.41-1.26 3.34-2.15 3.93c-4.6 3.06-15.16 1.56-19.54.36a8 8 0 0 0-4.3 15.44a61.34 61.34 0 0 0 15.19 2c5.82 0 12.3-1 17.49-4.46a20.81 20.81 0 0 0 9.18-15.23c2.21-17.31-14.31-22.14-24.2-25ZM40 112V40a16 16 0 0 1 16-16h96a8 8 0 0 1 5.66 2.34l56 56A8 8 0 0 1 216 88v24a8 8 0 1 1-16 0V96h-48a8 8 0 0 1-8-8V40H56v72a8 8 0 0 1-16 0Zm120-32h28.68L160 51.31Z"/></svg>`,
		theme: 'outline',
	},
	{
		name: 'nginx-config',
		icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M7.62.102a.757.757 0 0 1 .76 0l6.246 3.625a.75.75 0 0 1 .374.648v7.25a.75.75 0 0 1-.374.648L8.38 15.898a.757.757 0 0 1-.76 0l-6.246-3.625A.75.75 0 0 1 1 11.625v-7.25a.75.75 0 0 1 .374-.648L7.62.102ZM2.508 4.806v6.388L8 14.382l5.492-3.188V4.806L8 1.618L2.508 4.806Zm2.475-.249a.757.757 0 0 1 .822.163l4.241 4.22V5.25c0-.414.338-.75.754-.75s.754.336.754.75v5.5a.75.75 0 0 1-.466.693a.757.757 0 0 1-.821-.163L6.026 7.06v3.69c0 .414-.338.75-.754.75a.752.752 0 0 1-.754-.75v-5.5a.75.75 0 0 1 .465-.693Z"/></svg>`,
		theme: 'outline',
	},
];
