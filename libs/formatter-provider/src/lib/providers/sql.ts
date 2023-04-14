import type { FormatterProvider } from '../types/formatter-provider';
import type { FormatOptions } from 'sql-formatter';
import { format } from 'sql-formatter';

type SQLFormatterOptions = FormatOptions;

export class SQLFormatterProvider
  implements FormatterProvider<SQLFormatterOptions>
{
  Format(
    code: string,
    options?: SQLFormatterOptions | undefined,
    errorCb?: ((err?: Error | undefined) => void) | undefined
  ): string {
    try {
      return format(code, options);
    } catch (err) {
      errorCb?.(err as Error);
    }
    return code;
  }

  ProvideSampleCode(_lang: string): string {
    // TODO: Add more sample code for different sql dialects
    return `CREATE TABLE MortgageCompanies (ID INTEGER PRIMARY KEY, NAME CHAR(30)); INSERT INTO MortgageCompanies VALUES (1, 'Quicken Loans'); INSERT INTO MortgageCompanies VALUES (2, 'Wells Fargo Bank'); INSERT INTO MortgageCompanies VALUES (3, 'JPMorgan Chase Bank'); SELECT * FROM MortgageCompanies;`;
  }
}
