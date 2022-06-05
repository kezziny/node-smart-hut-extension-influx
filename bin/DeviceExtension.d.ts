import { DeviceExtension, IDeviceConfig, IStateChange } from 'smart-hut';
export interface IMqttDeviceConfig extends IDeviceConfig {
    Topic: {
        [key: string]: string;
    };
}
export declare class InfluxDeviceExtension extends DeviceExtension {
    OnPropertyChanged(eventArgs: IStateChange): void;
}
