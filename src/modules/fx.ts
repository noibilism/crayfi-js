import { HttpClient } from "../HttpClient";

export class FX {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  public async rates(data: any): Promise<any> {
    return this.client.post("/v2/merchant/rates", data);
  }

  public async ratesByDestination(data: any): Promise<any> {
    return this.client.post("/v2/merchant/rates/destination", data);
  }

  public async quote(data: any): Promise<any> {
    return this.client.post("/v2/merchant/quote", data);
  }

  public async convert(data: any): Promise<any> {
    return this.client.post("/v2/merchant/conversions/convert", data);
  }

  public async conversions(): Promise<any> {
    return this.client.get("/v2/merchant/conversions");
  }
}
