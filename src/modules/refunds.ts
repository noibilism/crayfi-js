import { HttpClient } from "../HttpClient";

export class Refunds {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  public async initiate(data: any): Promise<any> {
    return this.client.post("/api/refunds/initiate", data);
  }

  public async query(reference: string): Promise<any> {
    return this.client.get(`/api/refunds/query/${reference}`);
  }
}
