import type { OnInit, TemplateRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { inject } from '@angular/core';
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
import {
  FitterElementDirective,
  SyncStyleWithElementDirective,
} from '@echoo/fitter-element';
import { WindowEventsService } from '../../../../core/services/window-events.service';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { MonacoEditorOptions } from '../../../../data/monacoEditorOptions';
import { randJSON } from '@ngneat/falso';
import { ClipboardModule } from 'ngx-clipboard';
import {
  NzMessageService,
  NzMessageServiceModule,
} from 'ng-zorro-antd/message';
import { NzDrawerServiceModule, NzDrawerService } from 'ng-zorro-antd/drawer';
import { JSONPath } from 'jsonpath-plus';
import { JsonPathGuideComponent } from './json-path-guide.component';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { JsonFormatterDefaultSettings } from './settings';
import type {
  JsonFormatterIndention,
  JsonFormatterSettingsType,
} from './settings';
import { ToolSettingsService } from '../../../../../app/core/services/tool-settings.service';

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
    NzAlertModule,
    FitterElementDirective,
    SyncStyleWithElementDirective,
    ClipboardModule,
    NzMessageServiceModule,
    MonacoEditorModule,
    NzDrawerServiceModule,
    JsonPathGuideComponent,
  ],
  templateUrl: './formatter-json.component.html',
  styleUrls: ['./formatter-json.component.scss'],
  providers: [
    WindowEventsService,
    NzMessageService,
    NzDrawerService,
    {
      provide: ToolSettingsService,
      useFactory: () => {
        return ToolSettingsService.fromDefaultSettings<
          keyof JsonFormatterSettingsType
        >(JsonFormatterDefaultSettings);
      },
    },
  ],
})
export class FormatterJsonComponent implements OnInit {
  @ViewChild('jsonPathHelp') jsonPathHelp?: TemplateRef<unknown>;

  editorOptions = MonacoEditorOptions.ReadOnly('json');

  code$ = new BehaviorSubject<string | undefined>(undefined);
  codeOutput$ = new BehaviorSubject<string | undefined>(undefined);

  jsonPath$ = new BehaviorSubject<string | undefined>(undefined);

  indention$: BehaviorSubject<JsonFormatterIndention>;

  drawer = inject(NzDrawerService);
  notify = inject(NzMessageService);

  settings: ToolSettingsService<keyof JsonFormatterSettingsType> =
    inject(ToolSettingsService);

  error$ = new BehaviorSubject<string | undefined>(undefined);

  constructor() {
    this.indention$ = new BehaviorSubject(this.settings.get('indention'));
    this.jsonPath$.next(this.settings.get('jsonPath'));
  }

  ngOnInit(): void {
    this.listenSubjects();
  }

  listenSubjects() {
    combineLatest([this.code$, this.indention$, this.jsonPath$]).subscribe(
      ([code, indention, jsonPath]) => {
        let jsonObj: object;
        try {
          jsonObj = JSON.parse(code ?? '{}');
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
          console.log(err);
          this.codeOutput$.next(code);
          this.error$.next(err.message);
          return;
        }

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
        const result =
          JSONPath({ path: jsonPath || '$', json: jsonObj, wrap: false }) ?? {};
        this.codeOutput$.next(JSON.stringify(result, null, indentionValue));
        this.error$.next(undefined);
      }
    );

    this.indention$.subscribe((indention) => {
      this.settings.set('indention', indention);
    });
  }

  onCompressClicked() {
    this.indention$.next('mini');
  }

  onIndentionChanged(indention: JsonFormatterIndention) {
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
    this.error$.next(undefined);
  }

  onJsonPathInutChanged(jsonPath: string) {
    this.jsonPath$.next(jsonPath);
  }

  onCopied() {
    this.notify.success('Copied to clipboard', {});
  }

  onJsonPathHelpClicked() {
    if (this.jsonPathHelp) {
      this.drawer.create({
        nzTitle: 'JSON Path Syntax',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        nzContent: this.jsonPathHelp,
        nzWidth: '50%',
        nzPlacement: 'right',
        nzClosable: true,
        nzMaskClosable: true,
        nzMask: true,
      });
    }
  }
}
