// package: devutils.tiny_img
// file: tiny-img.proto

var tiny_img_pb = require("./tiny-img_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var TinyImageService = (function () {
    function TinyImageService() {
    }

    TinyImageService.serviceName = "devutils.tiny_img.TinyImageService";
    return TinyImageService;
}());

TinyImageService.CompressImage = {
    methodName: "CompressImage",
    service: TinyImageService,
    requestStream: false,
    responseStream: false,
    requestType: tiny_img_pb.InCompressImage,
    responseType: tiny_img_pb.OutCompressImage
};

exports.TinyImageService = TinyImageService;

function TinyImageServiceClient(serviceHost, options) {
    this.serviceHost = serviceHost;
    this.options = options || {};
}

TinyImageServiceClient.prototype.compressImage = function compressImage(requestMessage, metadata, callback) {
    if (arguments.length === 2) {
        callback = arguments[1];
    }
    var client = grpc.unary(TinyImageService.CompressImage, {
        request: requestMessage,
        host: this.serviceHost,
        metadata: metadata,
        transport: this.options.transport,
        debug: this.options.debug,
        onEnd: function (response) {
            if (callback) {
                if (response.status !== grpc.Code.OK) {
                    var err = new Error(response.statusMessage);
                    err.code = response.status;
                    err.metadata = response.trailers;
                    callback(err, null);
                } else {
                    callback(null, response.message);
                }
            }
        }
    });
    return {
        cancel: function () {
            callback = null;
            client.close();
        }
    };
};

exports.TinyImageServiceClient = TinyImageServiceClient;

