// package: devutils.json_formatter
// file: json-formatter.proto

import * as jspb from "google-protobuf";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";

export class OutGetRandomJson extends jspb.Message {
  getInputsample(): string;
  setInputsample(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): OutGetRandomJson.AsObject;
  static toObject(includeInstance: boolean, msg: OutGetRandomJson): OutGetRandomJson.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: OutGetRandomJson, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): OutGetRandomJson;
  static deserializeBinaryFromReader(message: OutGetRandomJson, reader: jspb.BinaryReader): OutGetRandomJson;
}

export namespace OutGetRandomJson {
  export type AsObject = {
    inputsample: string,
  }
}

export class InValidateJson extends jspb.Message {
  getInput(): string;
  setInput(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): InValidateJson.AsObject;
  static toObject(includeInstance: boolean, msg: InValidateJson): InValidateJson.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: InValidateJson, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): InValidateJson;
  static deserializeBinaryFromReader(message: InValidateJson, reader: jspb.BinaryReader): InValidateJson;
}

export namespace InValidateJson {
  export type AsObject = {
    input: string,
  }
}

export class OutValidateJson extends jspb.Message {
  clearErrorsList(): void;
  getErrorsList(): Array<OutValidateJson.ValidationError>;
  setErrorsList(value: Array<OutValidateJson.ValidationError>): void;
  addErrors(value?: OutValidateJson.ValidationError, index?: number): OutValidateJson.ValidationError;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): OutValidateJson.AsObject;
  static toObject(includeInstance: boolean, msg: OutValidateJson): OutValidateJson.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: OutValidateJson, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): OutValidateJson;
  static deserializeBinaryFromReader(message: OutValidateJson, reader: jspb.BinaryReader): OutValidateJson;
}

export namespace OutValidateJson {
  export type AsObject = {
    errorsList: Array<OutValidateJson.ValidationError.AsObject>,
  }

  export class ValidationError extends jspb.Message {
    getCode(): string;
    setCode(value: string): void;

    getDescription(): string;
    setDescription(value: string): void;

    getIndexstart(): number;
    setIndexstart(value: number): void;

    getIndexend(): number;
    setIndexend(value: number): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ValidationError.AsObject;
    static toObject(includeInstance: boolean, msg: ValidationError): ValidationError.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ValidationError, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ValidationError;
    static deserializeBinaryFromReader(message: ValidationError, reader: jspb.BinaryReader): ValidationError;
  }

  export namespace ValidationError {
    export type AsObject = {
      code: string,
      description: string,
      indexstart: number,
      indexend: number,
    }
  }
}

