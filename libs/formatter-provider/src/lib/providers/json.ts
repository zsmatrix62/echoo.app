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
    options?: JsonFormatterOptions,
    errorCb?: (err?: Error) => void
  ): string {
    let jsonObj: object;
    let outputCode = code;
    try {
      jsonObj = JSON.parse(code ?? '{}');
    } catch (err: unknown) {
      if (errorCb) {
        errorCb(err as Error);
      }
      return code;
    }

    let indentionValue = '';
    switch (options?.indent ?? '1t') {
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
        path: options?.jsonPath || '$',
        json: jsonObj,
        wrap: false,
      }) ?? {};
    outputCode = JSON.stringify(result, null, indentionValue);
    if (errorCb) {
      errorCb();
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
