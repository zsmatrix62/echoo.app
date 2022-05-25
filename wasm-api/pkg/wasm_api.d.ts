/* tslint:disable */
/* eslint-disable */
/**
* @returns {string}
*/
export function get_random_json(): string;
/**
* @param {string} in_json
* @returns {ValidationError | undefined}
*/
export function validate_json(in_json: string): ValidationError | undefined;
/**
*/
export class ValidationError {
  free(): void;
/**
*/
  code: string;
/**
*/
  description: string;
/**
*/
  index_end: BigInt;
/**
*/
  index_start: BigInt;
}
