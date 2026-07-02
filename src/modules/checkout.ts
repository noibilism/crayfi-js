import { HttpClient } from "../HttpClient";

export class Checkout {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  public async initialize(data: any): Promise<any> {
    return this.client.post("/api/checkout/initialize", data);
  }

  public async query(reference: string): Promise<any> {
    return this.client.get(`/api/checkout/query/${reference}`);
  }
}
