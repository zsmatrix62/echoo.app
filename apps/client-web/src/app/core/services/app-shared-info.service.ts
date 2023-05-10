import { Injectable } from '@angular/core';
import type { ToolBrandInfo } from '@echoo/types';

@Injectable({
	providedIn: 'root',
})
export class AppSharedInfoService {
	toolBrandInfo?: ToolBrandInfo;
}
