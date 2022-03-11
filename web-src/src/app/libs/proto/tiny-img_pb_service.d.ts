// package: devutils.tiny_img
// file: tiny-img.proto

import * as tiny_img_pb from "./tiny-img_pb";
import {grpc} from "@improbable-eng/grpc-web";

type TinyImageServiceCompressImage = {
  readonly methodName: string;
  readonly service: typeof TinyImageService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof tiny_img_pb.InCompressImage;
  readonly responseType: typeof tiny_img_pb.OutCompressImage;
};

export class TinyImageService {
  static readonly serviceName: string;
  static readonly CompressImage: TinyImageServiceCompressImage;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}

interface ResponseStream<T> {
  cancel(): void;

  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;

  on(type: 'end', handler: (status?: Status) => void): ResponseStream<T>;

  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}

interface RequestStream<T> {
  write(message: T): RequestStream<T>;

  end(): void;

  cancel(): void;

  on(type: 'end', handler: (status?: Status) => void): RequestStream<T>;

  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}

interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;

  end(): void;

  cancel(): void;

  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;

  on(type: 'end', handler: (status?: Status) => void): BidirectionalStream<ReqT, ResT>;

  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class TinyImageServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);

  compressImage(
      requestMessage: tiny_img_pb.InCompressImage,
      metadata: grpc.Metadata,
      callback: (error: ServiceError | null, responseMessage: tiny_img_pb.OutCompressImage | null) => void
  ): UnaryResponse;
  compressImage(
      requestMessage: tiny_img_pb.InCompressImage,
      callback: (error: ServiceError | null, responseMessage: tiny_img_pb.OutCompressImage | null) => void
  ): UnaryResponse;
}

