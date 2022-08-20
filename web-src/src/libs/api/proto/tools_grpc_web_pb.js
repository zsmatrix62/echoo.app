/**
 * @fileoverview gRPC-Web generated client stub for tools
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.tools = require('./tools_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.tools.ToolsClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'binary';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.tools.ToolsPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'binary';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.tools.InSayHello,
 *   !proto.tools.OutSayHello>}
 */
const methodDescriptor_Tools_SayHello = new grpc.web.MethodDescriptor(
  '/tools.Tools/SayHello',
  grpc.web.MethodType.UNARY,
  proto.tools.InSayHello,
  proto.tools.OutSayHello,
  /**
   * @param {!proto.tools.InSayHello} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.tools.OutSayHello.deserializeBinary
);


/**
 * @param {!proto.tools.InSayHello} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.tools.OutSayHello)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.tools.OutSayHello>|undefined}
 *     The XHR Node Readable Stream
 */
proto.tools.ToolsClient.prototype.sayHello =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/tools.Tools/SayHello',
      request,
      metadata || {},
      methodDescriptor_Tools_SayHello,
      callback);
};


/**
 * @param {!proto.tools.InSayHello} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.tools.OutSayHello>}
 *     Promise that resolves to the response
 */
proto.tools.ToolsPromiseClient.prototype.sayHello =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/tools.Tools/SayHello',
      request,
      metadata || {},
      methodDescriptor_Tools_SayHello);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.tools.InCompressImage,
 *   !proto.tools.OutCompressImage>}
 */
const methodDescriptor_Tools_CompressImage = new grpc.web.MethodDescriptor(
  '/tools.Tools/CompressImage',
  grpc.web.MethodType.UNARY,
  proto.tools.InCompressImage,
  proto.tools.OutCompressImage,
  /**
   * @param {!proto.tools.InCompressImage} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.tools.OutCompressImage.deserializeBinary
);


/**
 * @param {!proto.tools.InCompressImage} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.tools.OutCompressImage)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.tools.OutCompressImage>|undefined}
 *     The XHR Node Readable Stream
 */
proto.tools.ToolsClient.prototype.compressImage =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/tools.Tools/CompressImage',
      request,
      metadata || {},
      methodDescriptor_Tools_CompressImage,
      callback);
};


/**
 * @param {!proto.tools.InCompressImage} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.tools.OutCompressImage>}
 *     Promise that resolves to the response
 */
proto.tools.ToolsPromiseClient.prototype.compressImage =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/tools.Tools/CompressImage',
      request,
      metadata || {},
      methodDescriptor_Tools_CompressImage);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.tools.InDownloadPioBinary,
 *   !proto.tools.OutDownloadPioBinary>}
 */
const methodDescriptor_Tools_DownloadPioBinary = new grpc.web.MethodDescriptor(
  '/tools.Tools/DownloadPioBinary',
  grpc.web.MethodType.UNARY,
  proto.tools.InDownloadPioBinary,
  proto.tools.OutDownloadPioBinary,
  /**
   * @param {!proto.tools.InDownloadPioBinary} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.tools.OutDownloadPioBinary.deserializeBinary
);


/**
 * @param {!proto.tools.InDownloadPioBinary} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.tools.OutDownloadPioBinary)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.tools.OutDownloadPioBinary>|undefined}
 *     The XHR Node Readable Stream
 */
proto.tools.ToolsClient.prototype.downloadPioBinary =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/tools.Tools/DownloadPioBinary',
      request,
      metadata || {},
      methodDescriptor_Tools_DownloadPioBinary,
      callback);
};


/**
 * @param {!proto.tools.InDownloadPioBinary} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.tools.OutDownloadPioBinary>}
 *     Promise that resolves to the response
 */
proto.tools.ToolsPromiseClient.prototype.downloadPioBinary =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/tools.Tools/DownloadPioBinary',
      request,
      metadata || {},
      methodDescriptor_Tools_DownloadPioBinary);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.tools.InTryPioBinary,
 *   !proto.tools.OutTryPioBinary>}
 */
const methodDescriptor_Tools_TryPioBinary = new grpc.web.MethodDescriptor(
  '/tools.Tools/TryPioBinary',
  grpc.web.MethodType.UNARY,
  proto.tools.InTryPioBinary,
  proto.tools.OutTryPioBinary,
  /**
   * @param {!proto.tools.InTryPioBinary} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.tools.OutTryPioBinary.deserializeBinary
);


/**
 * @param {!proto.tools.InTryPioBinary} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.tools.OutTryPioBinary)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.tools.OutTryPioBinary>|undefined}
 *     The XHR Node Readable Stream
 */
proto.tools.ToolsClient.prototype.tryPioBinary =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/tools.Tools/TryPioBinary',
      request,
      metadata || {},
      methodDescriptor_Tools_TryPioBinary,
      callback);
};


/**
 * @param {!proto.tools.InTryPioBinary} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.tools.OutTryPioBinary>}
 *     Promise that resolves to the response
 */
proto.tools.ToolsPromiseClient.prototype.tryPioBinary =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/tools.Tools/TryPioBinary',
      request,
      metadata || {},
      methodDescriptor_Tools_TryPioBinary);
};


module.exports = proto.tools;

