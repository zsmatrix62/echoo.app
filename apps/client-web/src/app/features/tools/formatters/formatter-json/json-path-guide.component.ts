import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';

@Component({
	selector: 'echoo-json-path-guide',
	standalone: true,
	imports: [CommonModule, NzTableModule],
	templateUrl: './json-path-guide.component.html',
})
export class JsonPathGuideComponent {}
