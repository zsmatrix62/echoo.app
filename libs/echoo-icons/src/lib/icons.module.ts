import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { outlineIcons } from './types';

@NgModule({
  imports: [CommonModule, NzIconModule.forRoot(outlineIcons)],
})
export class EchooIconsModule {}
