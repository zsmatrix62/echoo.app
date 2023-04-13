import { bootstrapApplication } from '@angular/platform-browser';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { appRoutes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { EchooIconsModule } from '@echoo/echoo-icons';
import { WebStorageServiceService } from '@echoo/web-storage-service';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { GlobalConfigModule } from './app/global-config.module';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    importProvidersFrom(BrowserAnimationsModule, HttpClientModule),
    importProvidersFrom(MonacoEditorModule.forRoot()),
    importProvidersFrom(EchooIconsModule),
    importProvidersFrom(WebStorageServiceService),
    importProvidersFrom(GlobalConfigModule.forRoot()),
  ],
}).catch((err) => console.error(err));
