import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TwoColumnsIoComponent } from '../../../../shared/tool-layouts/two-columns-io/two-columns-io.component';
import { randCodeSnippet } from '@ngneat/falso';
import { BehaviorSubject } from 'rxjs';
import type { DefaultFormatterActions } from '../../../../data/types/actions';
import { ActivatedRoute } from '@angular/router';
import type { FormatterAvailableLangsType } from '../../../../../app/data/tools';

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

  inputPlaceholder = '';

  codeInput$ = new BehaviorSubject<string | undefined>(undefined);

  constructor() {
    this.art.data.subscribe((data) => {
      const langKey: FormatterAvailableLangsType = data['langKey'];
      const lang = data['lang'];
      if (langKey) {
        this.lang$.next(langKey);
        this.inputPlaceholder = `Paste or type ${lang.display} code here ...`;
      }
    });
  }

  onSampleClicked = () => {
    this.lang$.subscribe((lang) => {
      if (lang) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const code = randCodeSnippet({ lang: lang });
        this.codeInput$.next(code);
      }
    });
  };

  onClearClicked() {
    this.codeInput$.next(undefined);
  }

  async onPasteFromClipboardClicked() {
    const text = await navigator.clipboard.readText();
    this.codeInput$.next(text);
  }
}
