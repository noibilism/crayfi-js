import { HttpClient } from "../HttpClient";

export class Webhooks {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  public async failedPayoutWebhooks(): Promise<any> {
    return this.client.get("/api/payout/failedWebhook");
  }

  public async retryFailedPayoutWebhook(webhookId: string): Promise<any> {
    return this.client.get(`/api/payout/failedWebhook/${webhookId}`);
  }
}
