import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ToolSettingWidgetConfigItem,
  ToolSettingWidgetConfigItems,
  ToolSettingWidgetConfigItemValue,
} from '@echoo/types';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'echoo-tool-options-toolbar',
  standalone: true,
  imports: [CommonModule, NzSpaceModule, NzSelectModule, FormsModule],
  templateUrl: './tool-options-toolbar.component.html',
  styleUrls: ['./tool-options-toolbar.component.scss'],
})
export class ToolOptionsToolbarComponent implements OnInit {
  @Input() settings?: ToolSettingWidgetConfigItems<object>;

  ngOnInit(): void {}

  get configItemValues(): ToolSettingWidgetConfigItemValue<unknown>[] {
    if (!this.settings) return [];
    const out: ToolSettingWidgetConfigItemValue<unknown>[] = [];
    this.settings.forEach((setting: ToolSettingWidgetConfigItem<object>) => {
      const v = Object.values(setting)[0];
      // @ts-ignore
      out.push(v);
    });

    return out;
  }
}
