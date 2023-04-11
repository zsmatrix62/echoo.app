import type { Type } from '@angular/core';
import { EchooIconNames } from 'libs/angular/echoo-icons/src/lib/types';

export interface ToolConfig {
	title: string;
	icon?: EchooIconNames;
	routerLink: string[];
	component?: Type<unknown>;
	children?: ToolConfig[];
}
