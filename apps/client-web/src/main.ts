import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withEnabledBlockingInitialNavigation } from '@angular/router';
import { appRoutes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { EchooIconsModule } from '@echoo/echoo-icons';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import type { NzConfig } from 'ng-zorro-antd/core/config';
import { NZ_CONFIG } from 'ng-zorro-antd/core/config';

const ngZorroConfig: NzConfig = {
	theme: {
		primaryColor: '#F5222D',
	},
};

bootstrapApplication(AppComponent, {
	providers: [
		{
			provide: NZ_CONFIG,
			useValue: ngZorroConfig,
		},
		provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
		importProvidersFrom(BrowserAnimationsModule, HttpClientModule),
		importProvidersFrom(MonacoEditorModule.forRoot()),
		importProvidersFrom(EchooIconsModule),
	],
}).catch((err) => console.error(err));
