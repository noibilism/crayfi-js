import { HttpClient } from "../HttpClient";

export class MoMo {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  public async initiate(data: any): Promise<any> {
    return this.client.post("/momo/api/v1/momo/initiate", data);
  }

  public async requery(customerReference: string): Promise<any> {
    return this.client.get(`/momo/api/v1/momo/requery/${customerReference}`);
  }
}
