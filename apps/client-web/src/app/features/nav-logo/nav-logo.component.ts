import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { APP_PROPERTIES } from '../../core/properties';
import { NzSpaceModule } from 'ng-zorro-antd/space';

@Component({
  selector: 'echoo-nav-logo',
  standalone: true,
  imports: [CommonModule, NzTypographyModule, NzSpaceModule],
  templateUrl: './nav-logo.component.html',
  styleUrls: ['./nav-logo.component.scss'],
})
export class NavLogoComponent {
  appProps = inject(APP_PROPERTIES, {
    skipSelf: true,
  });
}
