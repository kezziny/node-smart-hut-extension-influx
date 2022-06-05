"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfluxExtension = exports.Point = void 0;
const influxdb_client_1 = require("@influxdata/influxdb-client");
Object.defineProperty(exports, "Point", { enumerable: true, get: function () { return influxdb_client_1.Point; } });
class InfluxExtension {
    static Setup(config) {
        console.log("Setup mqtt extension");
        InfluxExtension.Configuration = config;
        return InfluxExtension.Connect(config.Token, config.Url, config.User, config.Bucket);
    }
    static Connect(token, url, user, bucket) {
        return __awaiter(this, void 0, void 0, function* () {
            InfluxExtension.Client = new influxdb_client_1.InfluxDB({ url: url, token: token });
            return InfluxExtension.Client;
        });
    }
    static Publish(points) {
        if (!InfluxExtension.Client)
            return;
        let writer = InfluxExtension.Client.getWriteApi(InfluxExtension.Configuration.User, InfluxExtension.Configuration.Bucket);
        points.forEach(point => {
            writer.writePoint(point);
        });
        writer.close().then(() => { });
    }
}
exports.InfluxExtension = InfluxExtension;
InfluxExtension.Client = null;
