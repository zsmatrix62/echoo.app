import type { FormatterProvider } from '../types/formatter-provider';
import type { XMLFormatterOptions as XMLFormatterOptionsOrig } from 'xml-formatter';
import xmlFormat from 'xml-formatter';

type XMLFormatterOptions = XMLFormatterOptionsOrig;

export class XMLFormatterProvider
  implements FormatterProvider<XMLFormatterOptions>
{
  Format(
    code: string,
    options?: XMLFormatterOptions | undefined,
    errorCb?: ((err?: Error | undefined) => void) | undefined
  ): string {
    try {
      return xmlFormat(code, options);
    } catch (err) {
      errorCb?.(err as Error);
    }
    return code;
  }

  ProvideSampleCode(_lang: string): string {
    return `<root><strong><capital>-782478147</capital><we>opportunity</we><bad>-1990636284</bad><cattle><perhaps>-1714813636</perhaps><section>-1428267151</section><while>handsome</while><stream>without</stream><recognize>-1800816747.1511197</recognize><can>twice</can></cattle><camera>carried</camera><origin>-572598105</origin></strong><my>865939221.2704754</my><nose>native</nose><constantly>1729346751</constantly><dress>-81343418.10572386</dress><silent>orange</silent></root>`;
  }
}
