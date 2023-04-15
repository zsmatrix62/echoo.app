import type { AfterViewInit } from '@angular/core';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TwoColumnsIoComponent } from '../../../../shared/tool-layouts/two-columns-io/two-columns-io.component';
import { BehaviorSubject, combineLatest } from 'rxjs';
import type { DefaultFormatterActions } from '../../../../data/types/actions';
import { ActivatedRoute } from '@angular/router';
import type {
  FormatterAvailableLangsConfig,
  FormatterAvailableLangsType,
} from '@echoo/formatter-provider';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'echoo-formatter-base',
  standalone: true,
  imports: [CommonModule, TwoColumnsIoComponent, NzButtonModule],
  templateUrl: './formatter-base.component.html',
  styleUrls: ['./formatter-base.component.scss'],
})
export class FormatterBaseComponent
  extends TwoColumnsIoComponent
  implements DefaultFormatterActions, AfterViewInit
{
  art = inject(ActivatedRoute);
  lang$ = new BehaviorSubject<FormatterAvailableLangsType | undefined>(
    undefined
  );
  langConfig$ = new BehaviorSubject<FormatterAvailableLangsConfig | undefined>(
    undefined
  );

  override inputPlaceholder = '';

  override codeInput$ = new BehaviorSubject<string | undefined>(undefined);
  override codeOutput$ = new BehaviorSubject<string | undefined>(undefined);
  override inputError$ = new BehaviorSubject<string | undefined>(undefined);

  constructor() {
    super();
    this.art.data.subscribe((data) => {
      const langConfig: FormatterAvailableLangsConfig =
        data as FormatterAvailableLangsConfig;
      this.langConfig$.next(langConfig);
      this.inputPlaceholder = `Paste or type ${langConfig.display} code here ...`;
    });
    this.listenInputChange();
  }

  ngAfterViewInit(): void {
    this.fileInputRef.nativeElement.addEventListener('change', (e: Event) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const text = e.target?.result as string;
          this.codeInput$.next(text);
        };
        reader.readAsText(file);
      }
    });
  }

  onSampleClicked = () => {
    this.langConfig$.subscribe((langConfig) => {
      if (langConfig) {
        this.codeInput$.next(
          langConfig.formatterProvider.ProvideSampleCode(langConfig.langKey)
        );
      }
    });
  };

  onClearClicked() {
    this.codeInput$.next(undefined);
    this.inputError$.next(undefined);
  }

  onOpenFileClicked = () => {
    this.fileInputRef.nativeElement.click();
  };

  onFileOpen(inputEl: HTMLInputElement) {
    console.log(inputEl.files);
  }

  async onPasteFromClipboardClicked() {
    const text = await navigator.clipboard.readText();
    this.codeInput$.next(text);
  }

  listenInputChange() {
    combineLatest([this.codeInput$, this.langConfig$]).subscribe(
      ([code, langConfig]) => {
        this.inputError$.next(undefined);
        const outputCode = langConfig?.formatterProvider.Format(
          code ?? '',
          {},
          (err) => {
            this.inputError$.next(err?.message);
          }
        );
        this.codeOutput$.next(outputCode);
      }
    );
  }
}
