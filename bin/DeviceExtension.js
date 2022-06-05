"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfluxDeviceExtension = void 0;
const Extension_1 = require("./Extension");
const smart_hut_1 = require("smart-hut");
const influxdb_client_1 = require("@influxdata/influxdb-client");
class InfluxDeviceExtension extends smart_hut_1.DeviceExtension {
    OnPropertyChanged(eventArgs) {
        if (this.Device.HasMetadata(eventArgs.Property, "InfluxLog")) {
            console.log("Log updated data of", eventArgs.Property, "with value", eventArgs.To);
            let propertyMetadata = this.Device.GetMetadata(eventArgs.Property, "InfluxLog");
            let point = new influxdb_client_1.Point(propertyMetadata.Unit);
            point.tag("room", this.Configuration.Room);
            point.tag("name", this.Configuration.Name);
            if (this.Device.HasMetadata(eventArgs.Property, "Tag")) {
                let tagMetadata = this.Device.GetMetadata(eventArgs.Property, "Tag");
                Object.getOwnPropertyNames(tagMetadata)
                    .forEach(tag => {
                    point.tag(tag, tagMetadata[tag]);
                });
            }
            switch (typeof eventArgs.To.value) {
                case 'boolean':
                    point.booleanField(eventArgs.Property, eventArgs.To.value);
                    break;
                case 'number':
                    point.floatField(eventArgs.Property, eventArgs.To.value);
                    break;
                case 'string':
                    point.stringField(eventArgs.Property, eventArgs.To.value);
                    break;
            }
            Extension_1.InfluxExtension.Publish([point]);
        }
    }
}
__decorate([
    (0, smart_hut_1.OnPropertyChanged)('Any')
], InfluxDeviceExtension.prototype, "OnPropertyChanged", null);
exports.InfluxDeviceExtension = InfluxDeviceExtension;
