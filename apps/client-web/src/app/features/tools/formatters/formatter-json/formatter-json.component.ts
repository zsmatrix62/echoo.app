import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
	selector: 'echoo-formatter-json',
	standalone: true,
	imports: [CommonModule, NzGridModule],
	templateUrl: './formatter-json.component.html',
	styleUrls: ['./formatter-json.component.scss'],
})
export class FormatterJsonComponent {}
