import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { GithubButtonComponent } from '@echoo/components/github-button';
import { APP_PROPERTIES } from '../../core/properties';
import { NzSpaceModule } from 'ng-zorro-antd/space';

@Component({
  selector: 'echoo-nav-extra-actions',
  standalone: true,
  imports: [CommonModule, GithubButtonComponent, NzSpaceModule],
  templateUrl: './nav-extra-actions.component.html',
  styleUrls: ['./nav-extra-actions.component.scss'],
})
export class NavExtraActionsComponent {
  appProps = inject(APP_PROPERTIES);
}
