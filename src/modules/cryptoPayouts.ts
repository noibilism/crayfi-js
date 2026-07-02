import { HttpClient } from "../HttpClient";

export class CryptoPayouts {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  public async supportedAssets(): Promise<any> {
    return this.client.get("/api/virtual-accounts/crypto/supported-assets");
  }

  public async addBeneficiary(data: any): Promise<any> {
    return this.client.post("/api/payout/crypto/beneficiaries", data);
  }

  public async initiatePayout(data: any): Promise<any> {
    return this.client.post("/api/payout/crypto/initiate-payout", data);
  }
}
