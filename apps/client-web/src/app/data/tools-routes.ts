import type { Route } from '@angular/router';
import { RegisterdTools } from './tools';
import type { ToolConfig } from './types/tool-config';

const ToolsRoutes: Route[] = [];

function appendRoute(parentRoutes: string[], configs: ToolConfig[]) {
	for (const config of configs) {
		const newRoutes = [...parentRoutes, ...config.routerLink];
		if (config.children) {
			if (config.component) {
				ToolsRoutes.push({
					path: newRoutes.join('/'),
					component: config.component,
				});
			} else {
				ToolsRoutes.push({
					path: newRoutes.join('/'),
					redirectTo: newRoutes.join('/') + '/' + config.children[0].routerLink.join('/'),
				});
			}

			appendRoute(newRoutes, config.children);
		} else {
			ToolsRoutes.push({
				path: newRoutes.join('/'),
				component: config.component,
			});
		}
	}
}

appendRoute([], RegisterdTools);

export { ToolsRoutes };
