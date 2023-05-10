import type { AfterViewInit } from '@angular/core';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TwoColumnsIoComponent } from '../../../../shared/tool-layouts/two-columns-io/two-columns-io.component';
import { BehaviorSubject, combineLatest } from 'rxjs';
import type { DefaultFormatterActions } from '../../../../data/types/actions';
import { ActivatedRoute } from '@angular/router';
import type {
	FormatterAvailableLangConfigsType,
	ToolFormatterInstanceConfig,
	ToolFormatterXMLOptionsType,
} from '@echoo/tools/formatter-provider';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ToolSettingsService } from '../../../../core/services/tool-settings.service';
import type { ToolSettingWidgetConfigItems } from '@echoo/types';
import { EchooIconsModule } from '@echoo/components/echoo-icons';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { AppSharedInfoService } from '../../../../core/services/app-shared-info.service';

@Component({
	selector: 'echoo-formatter-base',
	standalone: true,
	imports: [CommonModule, TwoColumnsIoComponent, NzButtonModule, NzIconModule, EchooIconsModule],
	templateUrl: './formatter-base.component.html',
	styleUrls: ['./formatter-base.component.scss'],
	providers: [ToolSettingsService, AppSharedInfoService],
})
export class FormatterBaseComponent extends TwoColumnsIoComponent implements DefaultFormatterActions, AfterViewInit {
	art = inject(ActivatedRoute);
	appSharedInfo = inject(AppSharedInfoService, { skipSelf: true });
	lang$ = new BehaviorSubject<FormatterAvailableLangConfigsType | undefined>(undefined);
	langConfig$ = new BehaviorSubject<ToolFormatterInstanceConfig | undefined>(undefined);
	langConfig?: ToolFormatterInstanceConfig;

	override inputPlaceholder = '';
	override codeInput$ = new BehaviorSubject<string | undefined>(undefined);
	override codeOutput$ = new BehaviorSubject<string | undefined>(undefined);
	override inputError$ = new BehaviorSubject<string | undefined>(undefined);

	ToolbarOptions$ = new BehaviorSubject<ToolSettingWidgetConfigItems<ToolFormatterXMLOptionsType> | undefined>(
		undefined,
	);

	constructor() {
		super();
		this.art.data.subscribe((data) => {
			const langConfig: ToolFormatterInstanceConfig = data as ToolFormatterInstanceConfig;
			this.langConfig = langConfig;
			this.langConfig$.next(langConfig);
			this.inputPlaceholder = `Paste or type ${langConfig.display} code here ...`;
			// init setting service
			this.settingService = inject(ToolSettingsService).InitDefaultSettings(
				this.langConfig.formatterProvider.DefaultSettingConfig,
			);
			if (this.appSharedInfo) {
				this.appSharedInfo.toolBrandInfo = this.langConfig.brandInfo;
			}
		});
		this.listenInputChange();
	}

	ngAfterViewInit(): void {
		this.fileInputRef.nativeElement.onchange = (e: Event) => {
			const file = (e.target as HTMLInputElement).files?.[0];

			if (file) {
				const reader = new FileReader();
				reader.onload = (e) => {
					const text = e.target?.result as string;
					this.codeInput$.next(text);
				};
				reader.readAsText(file);
				this.fileInputRef.nativeElement.value = '';
			}
		};
	}

	onSampleClicked = () => {
		this.langConfig$.subscribe((langConfig) => {
			if (langConfig) {
				this.codeInput$.next(langConfig.formatterProvider.ProvideSampleCode(langConfig.langKey));
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

	async onPasteFromClipboardClicked() {
		const text = await navigator.clipboard.readText();
		this.codeInput$.next(text);
	}

	listenInputChange() {
		combineLatest([this.codeInput$, this.langConfig$]).subscribe(([code, langConfig]) => {
			if (langConfig?.formatterProvider.SettingsWidgetConfig) {
				this.ToolbarOptions$.next(langConfig.formatterProvider.SettingsWidgetConfig());
			}
			this.inputError$.next(undefined);
			const outputCode = langConfig?.formatterProvider.Format(code ?? '', {
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				errorCb: (err: Error) => {
					if (code) {
						this.inputError$.next(err?.message);
					}
				},
			});
			this.codeOutput$.next(outputCode);
		});
	}
}
