import type { Route } from '@angular/router';

export const appRoutes: Route[] = [
	{
		path: 'tools',
		loadChildren: () => import('./data/tools-routes').then((m) => m.ToolsRoutes),
	},
];
