/* eslint-disable @typescript-eslint/ban-ts-comment */
import { JSONPath } from 'jsonpath-plus';
import type { FormatterProvider } from '../types/formatter-provider';
import { randJSON } from '@ngneat/falso';

type JsonFormatterOptions = {
  indent: '1t' | '2s' | '4s' | 'mini';
  jsonPath: string;
};

class JsonFormatterProvider implements FormatterProvider<JsonFormatterOptions> {
  Format(
    code: string,
    options: {
      settings?: JsonFormatterOptions;
      errorCb?: (err?: Error) => void;
    }
  ): string {
    let jsonObj: object;
    let outputCode = code;
    try {
      jsonObj = JSON.parse(code ?? '{}');
    } catch (err: unknown) {
      options.errorCb?.(err as Error);
      return code;
    }

    const settings = options?.settings ?? {};

    let indentionValue = '';
    // @ts-ignore
    switch (settings?.['indent'] ?? '1t') {
      case '1t':
        indentionValue = '	';
        break;
      case '2s':
        indentionValue = '  ';
        break;
      case '4s':
        indentionValue = '    ';
        break;

      default:
        break;
    }
    const result =
      JSONPath({
        // @ts-ignore
        path: settings['jsonPath'] || '$',
        json: jsonObj,
        wrap: false,
      }) ?? {};
    outputCode = JSON.stringify(result, null, indentionValue);
    if (options.errorCb) {
      options.errorCb();
    }
    return outputCode;
  }

  ProvideSampleCode(_: string): string {
    return JSON.stringify(
      randJSON({
        minKeys: 5,
        maxKeys: 10,
      }) ?? ''
    );
  }
}

export { JsonFormatterOptions, JsonFormatterProvider };
