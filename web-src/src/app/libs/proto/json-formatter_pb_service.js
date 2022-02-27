// package: devutils.json_formatter
// file: json-formatter.proto

var json_formatter_pb = require("./json-formatter_pb");
var google_protobuf_empty_pb = require("google-protobuf/google/protobuf/empty_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var JsonFormatterService = (function () {
    function JsonFormatterService() {
    }

    JsonFormatterService.serviceName = "devutils.json_formatter.JsonFormatterService";
    return JsonFormatterService;
}());

JsonFormatterService.GetRandomJson = {
    methodName: "GetRandomJson",
    service: JsonFormatterService,
    requestStream: false,
    responseStream: false,
    requestType: google_protobuf_empty_pb.Empty,
    responseType: json_formatter_pb.OutGetRandomJson
};

JsonFormatterService.ValidateJson = {
    methodName: "ValidateJson",
    service: JsonFormatterService,
    requestStream: false,
    responseStream: false,
    requestType: json_formatter_pb.InValidateJson,
    responseType: json_formatter_pb.OutValidateJson
};

exports.JsonFormatterService = JsonFormatterService;

function JsonFormatterServiceClient(serviceHost, options) {
    this.serviceHost = serviceHost;
    this.options = options || {};
}

JsonFormatterServiceClient.prototype.getRandomJson = function getRandomJson(requestMessage, metadata, callback) {
    if (arguments.length === 2) {
        callback = arguments[1];
    }
    var client = grpc.unary(JsonFormatterService.GetRandomJson, {
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

JsonFormatterServiceClient.prototype.validateJson = function validateJson(requestMessage, metadata, callback) {
    if (arguments.length === 2) {
        callback = arguments[1];
    }
    var client = grpc.unary(JsonFormatterService.ValidateJson, {
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

exports.JsonFormatterServiceClient = JsonFormatterServiceClient;

