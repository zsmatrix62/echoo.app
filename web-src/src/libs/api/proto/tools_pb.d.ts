import * as jspb from 'google-protobuf'



export class InSayHello extends jspb.Message {
  getName(): string;
  setName(value: string): InSayHello;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): InSayHello.AsObject;
  static toObject(includeInstance: boolean, msg: InSayHello): InSayHello.AsObject;
  static serializeBinaryToWriter(message: InSayHello, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): InSayHello;
  static deserializeBinaryFromReader(message: InSayHello, reader: jspb.BinaryReader): InSayHello;
}

export namespace InSayHello {
  export type AsObject = {
    name: string,
  }
}

export class OutSayHello extends jspb.Message {
  getMessage(): string;
  setMessage(value: string): OutSayHello;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): OutSayHello.AsObject;
  static toObject(includeInstance: boolean, msg: OutSayHello): OutSayHello.AsObject;
  static serializeBinaryToWriter(message: OutSayHello, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): OutSayHello;
  static deserializeBinaryFromReader(message: OutSayHello, reader: jspb.BinaryReader): OutSayHello;
}

export namespace OutSayHello {
  export type AsObject = {
    message: string,
  }
}

export class InCompressImage extends jspb.Message {
  getContent(): Uint8Array | string;
  getContent_asU8(): Uint8Array;
  getContent_asB64(): string;
  setContent(value: Uint8Array | string): InCompressImage;

  getQuality(): number;
  setQuality(value: number): InCompressImage;

  getFormat(): string;
  setFormat(value: string): InCompressImage;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): InCompressImage.AsObject;
  static toObject(includeInstance: boolean, msg: InCompressImage): InCompressImage.AsObject;
  static serializeBinaryToWriter(message: InCompressImage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): InCompressImage;
  static deserializeBinaryFromReader(message: InCompressImage, reader: jspb.BinaryReader): InCompressImage;
}

export namespace InCompressImage {
  export type AsObject = {
    content: Uint8Array | string,
    quality: number,
    format: string,
  }
}

export class OutCompressImage extends jspb.Message {
  getContent(): Uint8Array | string;
  getContent_asU8(): Uint8Array;
  getContent_asB64(): string;
  setContent(value: Uint8Array | string): OutCompressImage;

  getISize(): number;
  setISize(value: number): OutCompressImage;

  getOSize(): number;
  setOSize(value: number): OutCompressImage;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): OutCompressImage.AsObject;
  static toObject(includeInstance: boolean, msg: OutCompressImage): OutCompressImage.AsObject;
  static serializeBinaryToWriter(message: OutCompressImage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): OutCompressImage;
  static deserializeBinaryFromReader(message: OutCompressImage, reader: jspb.BinaryReader): OutCompressImage;
}

export namespace OutCompressImage {
  export type AsObject = {
    content: Uint8Array | string,
    iSize: number,
    oSize: number,
  }
}

export class InDownloadPioBinary extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): InDownloadPioBinary.AsObject;
  static toObject(includeInstance: boolean, msg: InDownloadPioBinary): InDownloadPioBinary.AsObject;
  static serializeBinaryToWriter(message: InDownloadPioBinary, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): InDownloadPioBinary;
  static deserializeBinaryFromReader(message: InDownloadPioBinary, reader: jspb.BinaryReader): InDownloadPioBinary;
}

export namespace InDownloadPioBinary {
  export type AsObject = {
  }
}

export class OutDownloadPioBinary extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): OutDownloadPioBinary.AsObject;
  static toObject(includeInstance: boolean, msg: OutDownloadPioBinary): OutDownloadPioBinary.AsObject;
  static serializeBinaryToWriter(message: OutDownloadPioBinary, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): OutDownloadPioBinary;
  static deserializeBinaryFromReader(message: OutDownloadPioBinary, reader: jspb.BinaryReader): OutDownloadPioBinary;
}

export namespace OutDownloadPioBinary {
  export type AsObject = {
  }
}

export class InTryPioBinary extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): InTryPioBinary.AsObject;
  static toObject(includeInstance: boolean, msg: InTryPioBinary): InTryPioBinary.AsObject;
  static serializeBinaryToWriter(message: InTryPioBinary, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): InTryPioBinary;
  static deserializeBinaryFromReader(message: InTryPioBinary, reader: jspb.BinaryReader): InTryPioBinary;
}

export namespace InTryPioBinary {
  export type AsObject = {
  }
}

export class OutTryPioBinary extends jspb.Message {
  getOk(): boolean;
  setOk(value: boolean): OutTryPioBinary;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): OutTryPioBinary.AsObject;
  static toObject(includeInstance: boolean, msg: OutTryPioBinary): OutTryPioBinary.AsObject;
  static serializeBinaryToWriter(message: OutTryPioBinary, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): OutTryPioBinary;
  static deserializeBinaryFromReader(message: OutTryPioBinary, reader: jspb.BinaryReader): OutTryPioBinary;
}

export namespace OutTryPioBinary {
  export type AsObject = {
    ok: boolean,
  }
}

