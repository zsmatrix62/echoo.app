import * as grpcWeb from 'grpc-web';

import * as tools_pb from './tools_pb';


export class ToolsClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  sayHello(
    request: tools_pb.InSayHello,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: tools_pb.OutSayHello) => void
  ): grpcWeb.ClientReadableStream<tools_pb.OutSayHello>;

  compressImage(
    request: tools_pb.InCompressImage,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: tools_pb.OutCompressImage) => void
  ): grpcWeb.ClientReadableStream<tools_pb.OutCompressImage>;

  downloadPioBinary(
    request: tools_pb.InDownloadPioBinary,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: tools_pb.OutDownloadPioBinary) => void
  ): grpcWeb.ClientReadableStream<tools_pb.OutDownloadPioBinary>;

  tryPioBinary(
    request: tools_pb.InTryPioBinary,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: tools_pb.OutTryPioBinary) => void
  ): grpcWeb.ClientReadableStream<tools_pb.OutTryPioBinary>;

}

export class ToolsPromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  sayHello(
    request: tools_pb.InSayHello,
    metadata?: grpcWeb.Metadata
  ): Promise<tools_pb.OutSayHello>;

  compressImage(
    request: tools_pb.InCompressImage,
    metadata?: grpcWeb.Metadata
  ): Promise<tools_pb.OutCompressImage>;

  downloadPioBinary(
    request: tools_pb.InDownloadPioBinary,
    metadata?: grpcWeb.Metadata
  ): Promise<tools_pb.OutDownloadPioBinary>;

  tryPioBinary(
    request: tools_pb.InTryPioBinary,
    metadata?: grpcWeb.Metadata
  ): Promise<tools_pb.OutTryPioBinary>;

}

