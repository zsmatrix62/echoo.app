export interface FormatterProvider<O> {
  Format(code: string, options?: O, errorCb?: (err?: Error) => void): string;
}
