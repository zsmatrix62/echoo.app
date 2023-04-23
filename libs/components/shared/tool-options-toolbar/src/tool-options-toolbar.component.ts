/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { OnInit } from '@angular/core';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import type {
	ToolSettingWidgetConfigItem,
	ToolSettingWidgetConfigItems,
	ToolSettingWidgetConfigItemValue,
} from '@echoo/types';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzFormModule } from 'ng-zorro-antd/form';
import type { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormsModule } from '@angular/forms';

@Component({
	selector: 'echoo-tool-options-toolbar',
	standalone: true,
	imports: [
		CommonModule,
		NzSpaceModule,
		NzSelectModule,
		FormsModule,
		ReactiveFormsModule,
		NzToolTipModule,
		NzFormModule,
	],
	templateUrl: './tool-options-toolbar.component.html',
	styleUrls: ['./tool-options-toolbar.component.scss'],
})
export class ToolOptionsToolbarComponent implements OnInit {
	@Input() defaultSettings?: ToolSettingWidgetConfigItems<object>;
	@Input() actualSettingValues!: object;
	@Output() readonly settingsChange = new EventEmitter<object>();
	fb = inject(FormBuilder);
	form!: FormGroup;

	get defautlSettingValues(): object {
		const out = {};
		this.defaultSettings?.forEach((setting: ToolSettingWidgetConfigItem<object>) => {
			Object.keys(setting).forEach((settingKey, idx) => {
				const defaultSettingValue = Object.values(setting)[idx];
				// @ts-ignore
				out[settingKey] = defaultSettingValue.defaultValue;
			});
		});
		return out;
	}

	constructor() {
		this.form = this.fb.group({});
		this.form.valueChanges.subscribe((v) => {
			this.settingsChange.emit(v);
		});
	}

	ngOnInit(): void {
		this.initFormControls();
	}

	initFormControls() {
		Object.keys(this.defautlSettingValues).forEach((settingKey) => {
			// @ts-ignore
			const value = this.actualSettingValues[settingKey] || this.defautlSettingValues[settingKey];
			const formCtrl = new FormControl(settingKey);
			// @ts-ignore - set defualt value
			formCtrl.setValue(value);
			this.form.addControl(settingKey, formCtrl, { emitEvent: false });
			console.log(`init settings widget value: settingKey: ${settingKey}, value: ${value}`);
		});
	}

	get configItemValues(): ToolSettingWidgetConfigItemValue<unknown, string>[] {
		if (!this.defaultSettings) return [];
		const out: ToolSettingWidgetConfigItemValue<unknown, string>[] = [];
		this.defaultSettings.forEach((setting: ToolSettingWidgetConfigItem<object>) => {
			Object.keys(setting).forEach((_settingKey, idx) => {
				const defaultSettingObj = Object.values(setting)[idx];
				// @ts-ignore
				out.push(defaultSettingObj);
			});
		});

		return out;
	}
}
