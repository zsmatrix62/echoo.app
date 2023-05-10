import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppSharedInfoService } from '../../core/services/app-shared-info.service';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

@Component({
	selector: 'echoo-nav-tool-info-brand',
	standalone: true,
	imports: [CommonModule, NzSpaceModule, NzTypographyModule],
	templateUrl: './nav-tool-info-brand.component.html',
	styleUrls: ['./nav-tool-info-brand.component.scss'],
	providers: [AppSharedInfoService],
})
export class NavToolInfoBrandComponent {
	appSharedInfo = inject(AppSharedInfoService, { skipSelf: true });
}
