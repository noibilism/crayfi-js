import { HttpClient } from "../HttpClient";

export class Payouts {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  public async paymentMethods(countryCode: string): Promise<any> {
    return this.client.get(`/payout/payment-methods/${countryCode}`);
  }

  public async banks(countryCode?: string): Promise<any> {
    const params = countryCode ? { countryCode } : null;
    return this.client.get("/payout/banks", params);
  }

  public async validateAccount(data: any): Promise<any> {
    return this.client.post("/payout/accounts/validate", data);
  }

  public async disburse(data: any): Promise<any> {
    return this.client.post("/payout/disburse", data);
  }

  public async requery(transactionId: string): Promise<any> {
    return this.client.get(`/payout/requery/${transactionId}`);
  }
}
