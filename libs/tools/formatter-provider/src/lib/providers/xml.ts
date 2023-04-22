/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { FormatterProvider } from '../types/formatter-provider';
import xmlFormat, { XMLFormatterOptions } from 'xml-formatter';
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
    let settings: ToolSettings = options.settings!;
    if (!settings) {
      settings = <ToolSettings>this.DefaultSettingConfig.settings;
    }

    const formatterOptions: Partial<XMLFormatterOptions> = {};

    switch (settings['indentation'].value) {
      case '1t':
        formatterOptions.indentation = '  ';
        break;
      case '1s':
        formatterOptions.indentation = ' ';
        break;
      case '4s':
        formatterOptions.indentation = '    ';
        break;
      case 'mini':
        formatterOptions.indentation = '';
        break;
      default:
        formatterOptions.indentation = '';
    }

    formatterOptions.lineSeparator =
      <string>settings['lineSeperator'].value ?? '\r\n';

    try {
      if (formatterOptions.indentation == 'mini') {
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
