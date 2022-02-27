// package: devutils.json_formatter
// file: json-formatter.proto

import * as json_formatter_pb from "./json-formatter_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
import {grpc} from "@improbable-eng/grpc-web";

type JsonFormatterServiceGetRandomJson = {
  readonly methodName: string;
  readonly service: typeof JsonFormatterService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof google_protobuf_empty_pb.Empty;
  readonly responseType: typeof json_formatter_pb.OutGetRandomJson;
};

type JsonFormatterServiceValidateJson = {
  readonly methodName: string;
  readonly service: typeof JsonFormatterService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof json_formatter_pb.InValidateJson;
  readonly responseType: typeof json_formatter_pb.OutValidateJson;
};

export class JsonFormatterService {
  static readonly serviceName: string;
  static readonly GetRandomJson: JsonFormatterServiceGetRandomJson;
  static readonly ValidateJson: JsonFormatterServiceValidateJson;
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

export class JsonFormatterServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);

  getRandomJson(
      requestMessage: google_protobuf_empty_pb.Empty,
      metadata: grpc.Metadata,
      callback: (error: ServiceError | null, responseMessage: json_formatter_pb.OutGetRandomJson | null) => void
  ): UnaryResponse;
  getRandomJson(
      requestMessage: google_protobuf_empty_pb.Empty,
      callback: (error: ServiceError | null, responseMessage: json_formatter_pb.OutGetRandomJson | null) => void
  ): UnaryResponse;

  validateJson(
      requestMessage: json_formatter_pb.InValidateJson,
      metadata: grpc.Metadata,
      callback: (error: ServiceError | null, responseMessage: json_formatter_pb.OutValidateJson | null) => void
  ): UnaryResponse;
  validateJson(
      requestMessage: json_formatter_pb.InValidateJson,
      callback: (error: ServiceError | null, responseMessage: json_formatter_pb.OutValidateJson | null) => void
  ): UnaryResponse;
}

