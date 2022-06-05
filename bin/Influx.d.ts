import { Device, DeviceExtension, PropertyChangeEventArgs } from 'smart-hut';
export declare class Influx extends DeviceExtension {
    private static readonly LogKey;
    OnPropertyChanged(eventArgs: PropertyChangeEventArgs): void;
    static Extension<T extends {
        new (...args: any[]): Device;
    }>(constructor: T): {
        new (...args: any[]): {
            Extensions: DeviceExtension[];
            Configuration: import("smart-hut").IDeviceConfig;
            Configure(config: import("smart-hut").IDeviceConfig): void;
            GetMethodsWithMetadata(key: string): import("reflection").IMethodInfo[];
            ExecuteCallback(callback: any, ...args: any[]): void;
            GetProperties(): string[];
            GetMethods(): string[];
            HasClassMetadata(key: string): any;
            GetClassMetadata(key: string): any;
            HasPropertyMetadata(property: string, key: string): any;
            GetPropertyMetadata(property: string, key: string): any;
            GetPropertiesWithMetadata(key: string): import("reflection").IMethodInfo[];
            CallMethodsWithMetadata(key: string, ...args: any[]): void;
        };
    } & T;
    static Log(device: Device, property: string): void;
}
