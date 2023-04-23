/* eslint-disable @typescript-eslint/ban-ts-comment */
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
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl } from '@angular/forms';
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
export class ToolOptionsToolbarComponent {
	@Input() defaultSettings?: ToolSettingWidgetConfigItems<object>;

	// returns {key: value}
	@Output() readonly settingsChange = new EventEmitter<object>();

	fb = inject(FormBuilder);

	form!: FormGroup;

	constructor() {
		this.form = this.fb.group({});
		this.form.valueChanges.subscribe((v) => {
			this.settingsChange.emit(v);
		});
	}

	get configItemValues(): ToolSettingWidgetConfigItemValue<unknown, string>[] {
		if (!this.defaultSettings) return [];
		const out: ToolSettingWidgetConfigItemValue<unknown, string>[] = [];
		this.defaultSettings.forEach((setting: ToolSettingWidgetConfigItem<object>) => {
			const settingKey = Object.keys(setting)[0];
			const settingValue = Object.values(setting)[0];
			const formCtrl = new FormControl(settingKey);
			// @ts-ignore - set defualt value
			formCtrl.setValue(settingValue.defaultValue);
			this.form.addControl(settingKey, formCtrl, { emitEvent: false });
			// @ts-ignore
			out.push(settingValue);
		});

		return out;
	}
}
