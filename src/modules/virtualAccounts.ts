import { HttpClient } from "../HttpClient";

export class VirtualAccounts {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  public async create(data: any): Promise<any> {
    return this.client.post("/api/virtual-accounts/create", data);
  }

  public async initiate(data: any): Promise<any> {
    return this.client.post("/api/virtual-accounts/initiate", data);
  }

  public async list(): Promise<any> {
    return this.client.get("/api/virtual-accounts/list");
  }

  public async providers(): Promise<any> {
    return this.client.get("/api/virtual-accounts/providers");
  }

  public async generateWallet(data: any): Promise<any> {
    return this.client.post("/api/virtual-accounts/generate-wallet", data);
  }

  public async submitOtp(data: any): Promise<any> {
    return this.generateWallet(data);
  }
}
