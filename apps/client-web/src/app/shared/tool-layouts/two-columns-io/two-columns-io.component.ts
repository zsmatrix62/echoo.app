import type { OnChanges, SimpleChanges } from '@angular/core';
import { Component, inject, Input } from '@angular/core';
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
import { NzSelectModule } from 'ng-zorro-antd/select';
import { BehaviorSubject } from 'rxjs';
import { ClipboardModule } from 'ngx-clipboard';
import {
  NzMessageService,
  NzMessageServiceModule,
} from 'ng-zorro-antd/message';
import { NzDrawerServiceModule, NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { WindowEventsService } from '../../../core/services/window-events.service';
import { MonacoEditorOptions } from '../../../data/monacoEditorOptions';
import type { ButtonClickAction } from '../../../data/types/actions';
import type { FormatterAvailableLangsType } from '@echoo/formatter-provider';

@UntilDestroy()
@Component({
  selector: 'echoo-two-columns-io',
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
  ],
  templateUrl: './two-columns-io.component.html',
  styleUrls: ['./two-columns-io.component.scss'],
  providers: [WindowEventsService, NzMessageService, NzDrawerService],
})
export class TwoColumnsIoComponent implements OnChanges {
  @Input() inputPlaceholder = '';

  @Input() codeInput$!: BehaviorSubject<string | undefined>;
  @Input() codeOutput$!: BehaviorSubject<string | undefined>;

  @Input() actionInputSample?: ButtonClickAction;
  @Input() actionInputClear?: ButtonClickAction;
  @Input() actionInputPasteFromClipboard?: ButtonClickAction;

  @Input() monacoEditorLang: FormatterAvailableLangsType | null | undefined =
    undefined;

  messageService = inject(NzMessageService);

  editorOptions = MonacoEditorOptions.ReadOnly('json');

  inputError$ = new BehaviorSubject<string | undefined>(undefined);

  ngOnChanges(changes: SimpleChanges): void {
    const langChange = changes['monacoEditorLang'];
    if (langChange && langChange.currentValue) {
      console.debug(
        `lang for monaco editor changed to ${langChange.currentValue}`
      );
      this.editorOptions = MonacoEditorOptions.ReadOnly(
        langChange.currentValue
      );
    }
  }

  onCopied() {
    this.messageService.success('Copied to clipboard');
  }
}
