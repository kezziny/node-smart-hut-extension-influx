import { Point } from '@influxdata/influxdb-client';
export { Point };
interface IInfluxExtensionConfig {
    Url: string;
    User: string;
    Token: string;
    Bucket: string;
}
export declare class InfluxExtension {
    static Configuration: IInfluxExtensionConfig;
    static Setup(config: any): Promise<InfluxExtension>;
    private static Client;
    private static User;
    private static Bucket;
    static Connect(token: string, url: string, user: string, bucket: string): Promise<InfluxExtension>;
    static Publish(points: Point[]): void;
}
