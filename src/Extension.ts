import {InfluxDB, Point} from '@influxdata/influxdb-client'

export { Point };

interface IInfluxExtensionConfig {
	Url: string
	User: string
	Token: string
	Bucket: string
}

export class InfluxExtension {
	public static Configuration: IInfluxExtensionConfig;

	public static Setup(config: IInfluxExtensionConfig): Promise<InfluxExtension> {
        console.log("Setup mqtt extension");
        
        InfluxExtension.Configuration = config;
        return InfluxExtension.Connect(config.Token, config.Url, config.User, config.Bucket);
    }


	private static Client: any = null;

	private static User;
	private static Bucket;

	public static async Connect(token: string, url: string, user: string, bucket: string): Promise<InfluxExtension>
	{
		InfluxExtension.Client = new InfluxDB({url: url, token: token});
		return InfluxExtension.Client;
	}

	public static Publish(points: Point[])
	{
		if (!InfluxExtension.Client) return;
		
		let writer = InfluxExtension.Client.getWriteApi(InfluxExtension.Configuration.User, InfluxExtension.Configuration.Bucket);
		points.forEach(point => {
			writer.writePoint(point);
		});
		writer.close().then(() => {});
	}
}