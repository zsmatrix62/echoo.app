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

@Component({
  selector: 'echoo-formatter-base',
  standalone: true,
  imports: [CommonModule, TwoColumnsIoComponent],
  templateUrl: './formatter-base.component.html',
  styleUrls: ['./formatter-base.component.scss'],
})
export class FormatterBaseComponent implements DefaultFormatterActions {
  art = inject(ActivatedRoute);
  lang$ = new BehaviorSubject<FormatterAvailableLangsType | undefined>(
    undefined
  );
  langConfig$ = new BehaviorSubject<FormatterAvailableLangsConfig | undefined>(
    undefined
  );

  inputPlaceholder = '';

  codeInput$ = new BehaviorSubject<string | undefined>(undefined);
  codeOutput$ = new BehaviorSubject<string | undefined>(undefined);

  constructor() {
    this.art.data.subscribe((data) => {
      const langConfig: FormatterAvailableLangsConfig =
        data as FormatterAvailableLangsConfig;
      this.langConfig$.next(langConfig);
      this.inputPlaceholder = `Paste or type ${langConfig.display} code here ...`;
    });
    this.listenInputChange();
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
  }

  onOpenFileClicked() {
    // TODO:
    this.codeInput$.next(undefined);
  }

  async onPasteFromClipboardClicked() {
    const text = await navigator.clipboard.readText();
    this.codeInput$.next(text);
  }

  listenInputChange() {
    combineLatest([this.codeInput$, this.langConfig$]).subscribe(
      ([code, langConfig]) => {
        const outputCode = langConfig?.formatterProvider.Format(code ?? '', {});
        this.codeOutput$.next(outputCode);
      }
    );
  }
}
