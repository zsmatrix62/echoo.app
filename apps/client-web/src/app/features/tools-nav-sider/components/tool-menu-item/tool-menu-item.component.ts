import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import type { ToolConfig } from 'apps/client-web/src/app/data/types/tool-config';
import { RouterModule } from '@angular/router';
import { AsPureTemplateMixinComponent } from '@echoo/client-web/mixins';

@Component({
	selector: 'echoo-tool-menu-item',
	standalone: true,
	imports: [CommonModule, NzMenuModule, NzIconModule, RouterModule],
	templateUrl: './tool-menu-item.component.html',
	styleUrls: ['./tool-menu-item.component.scss'],
})
export class ToolMenuItemComponent extends AsPureTemplateMixinComponent {
	@Input() ParentConfig?: ToolConfig;
	@Input() Config!: ToolConfig;

	get finalRouterLink() {
		return ['tools', ...(this.ParentConfig?.routerLink || []), ...this.Config.routerLink];
	}
}
