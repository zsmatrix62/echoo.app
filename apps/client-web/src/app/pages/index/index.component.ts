import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { RouterModule } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ToolsNavSiderComponent } from '../../features/tools-nav-sider/tools-nav-sider.component';
import { NavLogoComponent } from '../../features/nav-logo/nav-logo.component';
import { APP_PROPERTIES } from '../../core/properties';
import { NavExtraActionsComponent } from '../../features/nav-extra-actions/nav-extra-actions.component';

@Component({
  selector: 'echoo-index',
  standalone: true,
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    NzInputModule,
    ToolsNavSiderComponent,
    NavLogoComponent,
    NavExtraActionsComponent,
  ],
})
export class IndexComponent {
  appProps = inject(APP_PROPERTIES, {
    skipSelf: true,
  });
}
