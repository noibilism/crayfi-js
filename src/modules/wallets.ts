import { HttpClient } from "../HttpClient";

export class Wallets {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  public async balances(): Promise<any> {
    return this.client.get("/api/balance");
  }

  public async subaccounts(): Promise<any> {
    return this.client.get("/api/get-subaccount");
  }
}
