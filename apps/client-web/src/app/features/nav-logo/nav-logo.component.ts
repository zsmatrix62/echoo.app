import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

@Component({
	selector: 'echoo-nav-logo',
	standalone: true,
	imports: [CommonModule, NzTypographyModule],
	templateUrl: './nav-logo.component.html',
	styleUrls: ['./nav-logo.component.scss'],
})
export class NavLogoComponent {}
