/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { FormatterProvider } from '../types/formatter-provider';
import type { XMLFormatterOptions } from 'xml-formatter';
import xmlFormat from 'xml-formatter';
import type {
  CommonFormatterIndention,
  CommonFormatterLineSeperator,
} from '../types/common';
import type {
  ToolSettingItem,
  ToolSettings,
} from '../types/formatter-provider';

export const XMLFormatterDefaultSettings: ToolSettings = {
  indentation: <ToolSettingItem<CommonFormatterIndention>>{
    asQueryParams: true,
    asLocalStorageItem: true,
    value: '1t',
  },
  lineSeperator: <ToolSettingItem<CommonFormatterLineSeperator>>{
    asQueryParams: true,
    asLocalStorageItem: true,
    value: '\r\n',
  },
};

export class XMLFormatterProvider<O = typeof XMLFormatterDefaultSettings>
  implements FormatterProvider<O>
{
  DefaultSettingConfig = {
    key: 'xml-formatter',
    settings: XMLFormatterDefaultSettings,
  };

  Format(
    code: string,
    options: {
      settings?: O;
      errorCb?: (err?: Error) => void;
    }
  ): string {
    const formatterOptions: Partial<XMLFormatterOptions> = {
      // @ts-ignore
      indentation: <string>options.settings?.['indentation'].value,
      // @ts-ignore
      lineSeperator: <string>options.settings?.['lineSeperator'].value,
    };

    try {
      if (this.DefaultSettingConfig?.settings['indentation'].value == 'mini') {
        return xmlFormat.minify(code, formatterOptions);
      }
      return xmlFormat(code, formatterOptions);
    } catch (err) {
      options.errorCb?.(err as Error);
    }
    return code;
  }

  ProvideSampleCode(_lang: string): string {
    return `<root><strong><capital>-782478147</capital><we>opportunity</we><bad>-1990636284</bad><cattle><perhaps>-1714813636</perhaps><section>-1428267151</section><while>handsome</while><stream>without</stream><recognize>-1800816747.1511197</recognize><can>twice</can></cattle><camera>carried</camera><origin>-572598105</origin></strong><my>865939221.2704754</my><nose>native</nose><constantly>1729346751</constantly><dress>-81343418.10572386</dress><silent>orange</silent></root>`;
  }
}
