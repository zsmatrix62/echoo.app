import {bootstrapApplication} from '@angular/platform-browser';
import {provideRouter, withEnabledBlockingInitialNavigation} from '@angular/router';
import {appRoutes} from './app/app.routes';
import {AppComponent} from './app/app.component';
import {importProvidersFrom} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {EchooIconsModule} from '@echoo/echoo-icons';

bootstrapApplication(AppComponent, {
	providers: [
		provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
		importProvidersFrom(BrowserAnimationsModule, HttpClientModule),
		importProvidersFrom(EchooIconsModule),
	],
}).catch((err) => console.error(err));
