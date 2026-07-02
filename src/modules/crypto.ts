import { HttpClient } from "../HttpClient";

export class Crypto {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  public async supportedAssets(): Promise<any> {
    return this.client.get("/api/virtual-accounts/crypto/supported-assets");
  }

  public async createVault(data: any): Promise<any> {
    return this.client.post("/api/accounts/crypto/vault", data);
  }
}
