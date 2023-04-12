import type { ModuleWithProviders } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { NzConfig } from 'ng-zorro-antd/core/config';
import { NZ_CONFIG } from 'ng-zorro-antd/core/config';

const ngZorroConfig: NzConfig = {
	theme: {
		primaryColor: '#F5222D',
	},
};

const zorroProvides = [{ provide: NZ_CONFIG, useValue: ngZorroConfig }];

@NgModule({
	declarations: [],
	imports: [CommonModule],
})
export class GlobalConfigModule {
	static forRoot(): ModuleWithProviders<GlobalConfigModule> {
		return {
			ngModule: GlobalConfigModule,
			providers: [...zorroProvides],
		};
	}
}
