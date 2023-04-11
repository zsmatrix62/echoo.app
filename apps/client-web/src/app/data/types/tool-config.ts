import type { Type } from '@angular/core';

export interface ToolConfig {
	title: string;
	icon?: string;
	routerLink: string[];
	component?: Type<unknown>;
	children?: ToolConfig[];
}
