import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { AsPureTemplateMixinComponent } from '../../mixins/index';
import { RegisterdTools } from '../../data/tools';
import { ToolMenuItemComponent } from './components/tool-menu-item/tool-menu-item.component';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'echoo-tools-nav-sider',
	standalone: true,
	imports: [
		CommonModule,
		NzLayoutModule,
		NzMenuModule,
		NzIconModule,
		ToolMenuItemComponent,
		NzSpaceModule,
		NzInputModule,
		FormsModule,
	],
	templateUrl: './tools-nav-sider.component.html',
	styleUrls: ['./tools-nav-sider.component.scss'],
})
export class ToolsNavSiderComponent extends AsPureTemplateMixinComponent {
	registeredTools = RegisterdTools;
}
