// package: devutils.tiny_img
// file: tiny-img.proto

import * as jspb from "google-protobuf";

export class InCompressImage extends jspb.Message {
  getData(): Uint8Array | string;
  getData_asU8(): Uint8Array;
  getData_asB64(): string;

  setData(value: Uint8Array | string): void;

  getExt(): string;

  setExt(value: string): void;

  getQuality(): number;

  setQuality(value: number): void;

  serializeBinary(): Uint8Array;

  toObject(includeInstance?: boolean): InCompressImage.AsObject;

  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };

  static toObject(includeInstance: boolean, msg: InCompressImage): InCompressImage.AsObject;

  static serializeBinaryToWriter(message: InCompressImage, writer: jspb.BinaryWriter): void;

  static deserializeBinary(bytes: Uint8Array): InCompressImage;

  static deserializeBinaryFromReader(message: InCompressImage, reader: jspb.BinaryReader): InCompressImage;
}

export namespace InCompressImage {
  export type AsObject = {
    data: Uint8Array | string,
    ext: string,
    quality: number,
  }
}

export class OutCompressImage extends jspb.Message {
  getData(): Uint8Array | string;
  getData_asU8(): Uint8Array;
  getData_asB64(): string;

  setData(value: Uint8Array | string): void;

  getExt(): string;

  setExt(value: string): void;

  getSize(): number;

  setSize(value: number): void;

  serializeBinary(): Uint8Array;

  toObject(includeInstance?: boolean): OutCompressImage.AsObject;

  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };

  static toObject(includeInstance: boolean, msg: OutCompressImage): OutCompressImage.AsObject;

  static serializeBinaryToWriter(message: OutCompressImage, writer: jspb.BinaryWriter): void;

  static deserializeBinary(bytes: Uint8Array): OutCompressImage;

  static deserializeBinaryFromReader(message: OutCompressImage, reader: jspb.BinaryReader): OutCompressImage;
}

export namespace OutCompressImage {
  export type AsObject = {
    data: Uint8Array | string,
    ext: string,
    size: number,
  }
}

