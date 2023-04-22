/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { FormatterToolProvider } from '../types/formatter-provider';
import xmlFormat, { XMLFormatterOptions } from 'xml-formatter';

import type {
  CommonFormatterIndention,
  CommonFormatterLineSeperator,
  ToolSettings,
} from '@echoo/types';

export type ToolFormatterXMLOptionsType = {
  intentation: CommonFormatterIndention;
  lineSeperator: CommonFormatterLineSeperator;
};

export const XMLFormatterDefaultSettings: ToolSettings<ToolFormatterXMLOptionsType> =
  {
    intentation: {
      asQueryParams: true,
      asLocalStorageItem: true,
      value: '1t',
    },
    lineSeperator: {
      asQueryParams: true,
      asLocalStorageItem: true,
      value: '\r\n',
    },
  };

export class XMLFormatterProvider
  implements FormatterToolProvider<ToolFormatterXMLOptionsType>
{
  DefaultSettingConfig = {
    key: 'xml-formatter',
    settings: XMLFormatterDefaultSettings,
  };

  Format(
    code: string,
    options: {
      errorCb?: (err?: Error) => void;
    }
  ): string {
    const settings = this.DefaultSettingConfig.settings;
    const formatterOptions: Partial<XMLFormatterOptions> = {};

    switch (settings.intentation.value) {
      case '1t':
        formatterOptions.indentation = '  ';
        break;
      case '2s':
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

    formatterOptions.lineSeparator = settings.lineSeperator.value ?? '\r\n';

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
