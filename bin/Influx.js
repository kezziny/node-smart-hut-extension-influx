"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Influx = void 0;
const influxdb_client_1 = require("@influxdata/influxdb-client");
const reflection_1 = require("@kezziny/reflection");
const smart_hut_1 = require("@kezziny/smart-hut");
const Extension_1 = require("./Extension");
class Influx extends smart_hut_1.DeviceExtension {
    OnPropertyChanged(eventArgs) {
        if (this.Device.HasPropertyMetadata(eventArgs.Property, Influx.LogKey)) {
            console.log("Log updated data of", eventArgs.Property, "with value", eventArgs.To);
            let point = new influxdb_client_1.Point(this.Device[eventArgs.Property].Unit);
            point.tag("room", this.Configuration.Room);
            point.tag("name", this.Configuration.Name);
            if (this.Device.HasPropertyMetadata(eventArgs.Property, "Tag")) {
                let tagMetadata = this.Device.GetPropertyMetadata(eventArgs.Property, "Tag");
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
                    console.log("string type");
                    point.stringField(eventArgs.Property, eventArgs.To.value);
                    break;
            }
            Extension_1.InfluxExtension.Publish([point]);
        }
    }
    static Extension(constructor) {
        return class extends constructor {
            constructor(...args) {
                super(args);
                this.Extensions.push(new Influx(this));
            }
        };
    }
    static Log(device, property) {
        reflection_1.Reflection.SetPropertyMetadata(device, property, Influx.LogKey, null);
    }
}
Influx.LogKey = "Log";
__decorate([
    smart_hut_1.Property.OnChanged('Any')
], Influx.prototype, "OnPropertyChanged", null);
exports.Influx = Influx;
