import type { OnInit } from '@angular/core';
import { inject } from '@angular/core';
import { Component } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
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
import { NzSelectModule } from 'ng-zorro-antd/select';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { MonacoEditorOptions } from '../../../../data/monacoEditorOptions';
import { randJSON } from '@ngneat/falso';
import { ClipboardModule } from 'ngx-clipboard';
import { NzMessageModule, NzMessageService, NzMessageServiceModule } from 'ng-zorro-antd/message';
import { JSONPath } from 'jsonpath-plus';

@UntilDestroy()
@Component({
	selector: 'echoo-formatter-json',
	standalone: true,
	imports: [
		CommonModule,
		FormsModule,
		NzGridModule,
		NzSelectModule,
		NzInputModule,
		NzButtonModule,
		NzSpaceModule,
		NzIconModule,
		FitterElementDirective,
		SyncStyleWithElementDirective,
		ClipboardModule,
		NzMessageServiceModule,
		MonacoEditorModule,
	],
	templateUrl: './formatter-json.component.html',
	styleUrls: ['./formatter-json.component.scss'],
	providers: [WindowEventsService, NzMessageService],
})
export class FormatterJsonComponent implements OnInit {
	editorOptions = MonacoEditorOptions.ReadOnly('json');

	code$ = new BehaviorSubject<string | undefined>(undefined);
	codeOutput$ = new BehaviorSubject<string | undefined>(undefined);

	jsonPath$ = new BehaviorSubject<string | undefined>(undefined);

	indention = '1t';
	indention$ = new BehaviorSubject(this.indention);

	document = inject(DOCUMENT);
	notify = inject(NzMessageService);

	ngOnInit(): void {
		this.listenSubjects();
	}

	listenSubjects() {
		combineLatest([this.code$, this.indention$, this.jsonPath$]).subscribe(([code, indention, jsonPath]) => {
			const jsonObj = JSON.parse(code ?? '{}');

			let indentionValue = '';
			switch (indention) {
				case '1t':
					indentionValue = '	';
					break;
				case '2s':
					indentionValue = '  ';
					break;
				case '4s':
					indentionValue = '    ';
					break;

				default:
					break;
			}
			const result = JSONPath({ path: jsonPath || '$', json: jsonObj, wrap: false }) ?? {};
			this.codeOutput$.next(JSON.stringify(result, null, indentionValue));
		});

		this.indention$.subscribe((indention) => {
			this.indention = indention;
		});
	}

	onCompressClicked() {
		this.indention$.next('mini');
	}

	onIndentionChanged(indention: string) {
		this.indention$.next(indention);
	}

	onCodeChanged(code: string) {
		this.code$.next(code);
	}

	onSampleClicked() {
		this.onClearClicked();
		const json = randJSON({
			minKeys: 5,
			maxKeys: 10,
		});
		this.code$.next(JSON.stringify(json));
	}

	onClearClicked() {
		this.jsonPath$.next(undefined);
		this.code$.next(undefined);
	}

	onJsonPathInutChanged(jsonPath: string) {
		this.jsonPath$.next(jsonPath);
	}

	onCopied() {
		this.notify.success('Copied to clipboard', {});
	}
}
