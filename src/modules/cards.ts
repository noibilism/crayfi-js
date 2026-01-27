import { HttpClient } from "../HttpClient";

export class Cards {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  public async initiate(data: any): Promise<any> {
    return this.client.post("/api/v2/initiate", data);
  }

  public async charge(data: any): Promise<any> {
    return this.client.post("/api/v2/charge", data);
  }

  public async query(customerReference: string): Promise<any> {
    return this.client.get(`/api/query/${customerReference}`);
  }
}
