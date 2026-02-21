import { HttpClient } from "../HttpClient";

export class FX {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  public async rates(data: any): Promise<any> {
    return this.client.post("/api/rates", data);
  }

  public async ratesByDestination(data: any): Promise<any> {
    return this.client.post("/api/rates/destination", data);
  }

  public async quote(data: any): Promise<any> {
    return this.client.post("/api/quote", data);
  }

  public async convert(data: any): Promise<any> {
    return this.client.post("/api/conversions", data);
  }

  public async conversions(): Promise<any> {
    return this.client.get("/api/conversions");
  }

  public async disputeConversion(conversionId: string, data: any): Promise<any> {
    return this.client.post(`/api/conversions/${conversionId}/dispute`, data);
  }
}
