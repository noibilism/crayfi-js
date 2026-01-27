import * as dotenv from "dotenv";
import { HttpClient } from "./HttpClient";
import { Cards } from "./modules/cards";
import { MoMo } from "./modules/momo";
import { Wallets } from "./modules/wallets";
import { FX } from "./modules/fx";
import { Payouts } from "./modules/payouts";
import { Refunds } from "./modules/refunds";
import { CrayAuthenticationException } from "./exceptions";

dotenv.config();

export class Cray {
  private client: HttpClient;

  public cards: Cards;
  public momo: MoMo;
  public wallets: Wallets;
  public fx: FX;
  public payouts: Payouts;
  public refunds: Refunds;

  constructor(
    apiKey?: string,
    env: string = "sandbox",
    timeout: number = 30,
    retries: number = 2
  ) {
    const key = apiKey || process.env.CRAY_API_KEY;
    const environment = env || process.env.CRAY_ENV || "sandbox";
    const timeoutVal = timeout || Number(process.env.CRAY_TIMEOUT) || 30;
    const retriesVal = retries || Number(process.env.CRAY_RETRIES) || 2;

    if (!key) {
      throw new CrayAuthenticationException("API Key is required.");
    }

    const baseUrl =
      environment === "live"
        ? "https://pay.connectramp.com"
        : "https://dev-gateman.v3.connectramp.com";

    this.client = new HttpClient({
      apiKey: key,
      baseUrl: process.env.CRAY_BASE_URL || baseUrl,
      timeout: timeoutVal,
      retries: retriesVal,
    });

    this.cards = new Cards(this.client);
    this.momo = new MoMo(this.client);
    this.wallets = new Wallets(this.client);
    this.fx = new FX(this.client);
    this.payouts = new Payouts(this.client);
    this.refunds = new Refunds(this.client);
  }
}
