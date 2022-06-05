"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log = void 0;
const DeviceExtension_1 = require("./DeviceExtension");
function Log() {
    return function (device, property) {
        if (!device.HasExtension("Influx"))
            device.InstallExtension("Influx", new DeviceExtension_1.InfluxDeviceExtension(device));
        device.DefineMetadata(property, "InfluxLog", null);
    };
}
exports.Log = Log;
