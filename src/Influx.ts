import { Point } from '@influxdata/influxdb-client';
import { Reflection } from 'reflection';
import { Device, DeviceExtension, Property, PropertyChangeEventArgs } from 'smart-hut';
import { InfluxExtension } from './Extension';


export class Influx extends DeviceExtension {
    private static readonly LogKey = "Log";

	@Property.OnChanged('Any')
	public OnPropertyChanged(eventArgs: PropertyChangeEventArgs) {
		if (this.Device.HasPropertyMetadata(eventArgs.Property, Influx.LogKey)) {
			console.log("Log updated data of", eventArgs.Property, "with value", eventArgs.To);

            let point = new Point(this.Device[eventArgs.Property].Unit);
            point.tag("room", this.Configuration.Room);
            point.tag("name", this.Configuration.Name);

            if (this.Device.HasPropertyMetadata(eventArgs.Property, "Tag")) {
                let tagMetadata = this.Device.GetPropertyMetadata(eventArgs.Property, "Tag");
                Object.getOwnPropertyNames(tagMetadata)
                    .forEach( tag => {
                        point.tag(tag, tagMetadata[tag]);
                    });
            }

            switch (typeof eventArgs.To.value) {
                case 'boolean': point.booleanField(eventArgs.Property, eventArgs.To.value); break;
                case 'number': point.floatField(eventArgs.Property, eventArgs.To.value); break;
                case 'string': console.log("string type"); point.stringField(eventArgs.Property, eventArgs.To.value); break;
            }

            InfluxExtension.Publish([point]);
		}
	}


    public static Extension<T extends { new (...args: any[]): Device }>(constructor: T) {
		return class extends constructor {
			constructor(...args:any[]) {
				super(args);
				this.Extensions.push(new Influx(this));
			}
		};
	}

    public static Log(device: Device, property: string) {
        Reflection.SetPropertyMetadata(device, property, Influx.LogKey, null);
    }
}