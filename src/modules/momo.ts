import { HttpClient } from "../HttpClient";

export class MoMo {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  public async initiate(data: any): Promise<any> {
    return this.client.post("/api/v2/momo/initiate", data);
  }

  public async requery(customerReference: string): Promise<any> {
    return this.client.get(`/api/v2/momo/requery/${customerReference}`);
  }
}
