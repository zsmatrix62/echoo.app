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
} from '@echoo/directives/fitter-element';
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
import { JsonPathGuideComponent } from './json-path-guide.component';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { JsonFormatterDefaultSettings } from './settings';
import type {
  JsonFormatterIndention,
  JsonFormatterSettingsType,
} from './settings';
import { ToolSettingsService } from '../../../../../app/core/services/tool-settings.service';
import { JsonFormatterProvider } from '@echoo/tools/formatter-provider';

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
        const formatter = new JsonFormatterProvider();
        this.codeOutput$.next(
          formatter.Format(code ?? '', {
            settings: {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-ignore
              indent: indention,
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-ignore
              jsonPath: jsonPath ?? '$',
            },
            errorCb: (err) => {
              if (code) {
                this.error$.next(err?.message);
              }
            },
          })
        );
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
