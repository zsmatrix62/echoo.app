import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { UntilDestroy } from '@ngneat/until-destroy';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { FormsModule } from '@angular/forms';
import { FitterElementDirective, SyncStyleWithElementDirective } from '@echoo/fitter-element';
import { WindowEventsService } from '../../../../core/services/window-events.service';

@UntilDestroy()
@Component({
	selector: 'echoo-formatter-json',
	standalone: true,
	imports: [
		CommonModule,
		FormsModule,
		NzGridModule,
		NzInputModule,
		NzButtonModule,
		NzSpaceModule,
		NzIconModule,
		FitterElementDirective,
		SyncStyleWithElementDirective,
		MonacoEditorModule,
	],
	templateUrl: './formatter-json.component.html',
	styleUrls: ['./formatter-json.component.scss'],
	providers: [WindowEventsService],
})
export class FormatterJsonComponent {
	editorOptions = {
		theme: 'vs-light',
		language: 'javascript',
		automaticLayout: true,
		lineNumbers: 'off',
		minimap: { enabled: false },
		scrollBeyondLastLine: false,
	};
	code = 'function x() {\nconsole.log("Hello world!");\n}';
}
