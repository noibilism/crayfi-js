import { HttpClient } from "../HttpClient";

export class Refunds {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  public async initiate(data: any): Promise<any> {
    return this.client.post("/api/v2/refund/initiate", data);
  }

  public async query(reference: string): Promise<any> {
    return this.client.get(`/api/v2/refund/query/${reference}`);
  }
}
