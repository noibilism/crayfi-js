import axios from "axios";
import { Cray } from "../src/Cray";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Modules", () => {
  let cray: Cray;
  // We need to mock the axios instance creation
  const mockAxiosInstance = {
    interceptors: {
      response: { use: jest.fn() },
    },
    request: jest.fn(),
    get: jest.fn(),
    post: jest.fn(),
  };

  beforeEach(() => {
    mockedAxios.create.mockReturnValue(mockAxiosInstance as any);
    cray = new Cray("test_key");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Cards module should call correct endpoint for initiate", async () => {
    const data = { amount: 100 };
    mockAxiosInstance.request.mockResolvedValue({ data: { status: "success" } });

    await cray.cards.initiate(data);

    expect(mockAxiosInstance.request).toHaveBeenCalledWith(
      expect.objectContaining({
        method: "POST",
        url: "/api/v2/initiate",
        data: data,
      })
    );
  });

  it("MoMo module should call correct endpoint for initiate", async () => {
    const data = { amount: 100, provider: "MTN" };
    mockAxiosInstance.request.mockResolvedValue({ data: { status: "success" } });

    await cray.momo.initiate(data);

    expect(mockAxiosInstance.request).toHaveBeenCalledWith(
      expect.objectContaining({
        method: "POST",
        url: "/api/v2/momo/initiate",
        data: data,
      })
    );
  });

  it("Wallets module should call correct endpoint for balances", async () => {
    mockAxiosInstance.request.mockResolvedValue({ data: [] });

    await cray.wallets.balances();

    expect(mockAxiosInstance.request).toHaveBeenCalledWith(
      expect.objectContaining({
        method: "GET",
        url: "/api/balance",
      })
    );
  });

  it("FX module should call correct endpoint for rates", async () => {
    const data = { source: "USD", destination: "NGN" };
    mockAxiosInstance.request.mockResolvedValue({ data: { rate: 700 } });

    await cray.fx.rates(data);

    expect(mockAxiosInstance.request).toHaveBeenCalledWith(
      expect.objectContaining({
        method: "POST",
        url: "/api/rates",
        data: data,
      })
    );
  });

  it("FX module should call correct endpoint for destination rates", async () => {
    const data = { destination_currency: "NGN" };
    mockAxiosInstance.request.mockResolvedValue({ data: { rates: [] } });

    await cray.fx.ratesByDestination(data);

    expect(mockAxiosInstance.request).toHaveBeenCalledWith(
      expect.objectContaining({
        method: "POST",
        url: "/api/rates/destination",
        data: data,
      })
    );
  });

  it("FX module should call correct endpoint for quote", async () => {
    const data = {
      source_currency: "USD",
      destination_currency: "NGN",
      source_amount: 100,
    };
    mockAxiosInstance.request.mockResolvedValue({ data: { quote_id: "quote_123" } });

    await cray.fx.quote(data);

    expect(mockAxiosInstance.request).toHaveBeenCalledWith(
      expect.objectContaining({
        method: "POST",
        url: "/api/quote",
        data: data,
      })
    );
  });

  it("FX module should call correct endpoint for conversion execution", async () => {
    const data = { quote_id: "quote_123" };
    mockAxiosInstance.request.mockResolvedValue({ data: { conversion_id: "conv_123" } });

    await cray.fx.convert(data);

    expect(mockAxiosInstance.request).toHaveBeenCalledWith(
      expect.objectContaining({
        method: "POST",
        url: "/api/conversions",
        data: data,
      })
    );
  });

  it("FX module should call correct endpoint for conversion query", async () => {
    mockAxiosInstance.request.mockResolvedValue({ data: { data: [] } });

    await cray.fx.conversions();

    expect(mockAxiosInstance.request).toHaveBeenCalledWith(
      expect.objectContaining({
        method: "GET",
        url: "/api/conversions",
      })
    );
  });

  it("FX module should call correct endpoint for conversion dispute", async () => {
    const data = { reason: "settlement_mismatch" };
    mockAxiosInstance.request.mockResolvedValue({ data: { status: "submitted" } });

    await cray.fx.disputeConversion("conv_123", data);

    expect(mockAxiosInstance.request).toHaveBeenCalledWith(
      expect.objectContaining({
        method: "POST",
        url: "/api/conversions/conv_123/dispute",
        data: data,
      })
    );
  });

  it("Checkout module should call correct endpoint for initialize", async () => {
    const data = { reference: "checkout_123", amount: 100 };
    mockAxiosInstance.request.mockResolvedValue({ data: { status: "success" } });

    await cray.checkout.initialize(data);

    expect(mockAxiosInstance.request).toHaveBeenCalledWith(
      expect.objectContaining({
        method: "POST",
        url: "/api/checkout/initialize",
        data: data,
      })
    );
  });

  it("Checkout module should call correct endpoint for query", async () => {
    mockAxiosInstance.request.mockResolvedValue({ data: { status: "success" } });

    await cray.checkout.query("checkout_123");

    expect(mockAxiosInstance.request).toHaveBeenCalledWith(
      expect.objectContaining({
        method: "GET",
        url: "/api/checkout/query/checkout_123",
      })
    );
  });

  it("Crypto module should call correct endpoint for supported assets", async () => {
    mockAxiosInstance.request.mockResolvedValue({ data: { data: [] } });

    await cray.crypto.supportedAssets();

    expect(mockAxiosInstance.request).toHaveBeenCalledWith(
      expect.objectContaining({
        method: "GET",
        url: "/api/virtual-accounts/crypto/supported-assets",
      })
    );
  });

  it("Crypto module should call correct endpoint for vault creation", async () => {
    const data = { customer_reference: "customer_123" };
    mockAxiosInstance.request.mockResolvedValue({ data: { status: "success" } });

    await cray.crypto.createVault(data);

    expect(mockAxiosInstance.request).toHaveBeenCalledWith(
      expect.objectContaining({
        method: "POST",
        url: "/api/accounts/crypto/vault",
        data: data,
      })
    );
  });

  it("Virtual accounts module should call correct endpoint for Wema wallet generation", async () => {
    const data = { otp: "123456", customer_email: "customer@example.com" };
    mockAxiosInstance.request.mockResolvedValue({ data: { status: "success" } });

    await cray.virtualAccounts.generateWallet(data);
    await cray.virtualAccounts.submitOtp(data);

    expect(mockAxiosInstance.request).toHaveBeenCalledWith(
      expect.objectContaining({
        method: "POST",
        url: "/api/virtual-accounts/generate-wallet",
        data: data,
      })
    );
    expect(mockAxiosInstance.request).not.toHaveBeenCalledWith(
      expect.objectContaining({
        url: "/api/virtual-accounts/submit-otp",
      })
    );
  });

  it("Crypto payouts module should call correct endpoint for supported assets", async () => {
    mockAxiosInstance.request.mockResolvedValue({ data: { data: [] } });

    await cray.cryptoPayouts.supportedAssets();

    expect(mockAxiosInstance.request).toHaveBeenCalledWith(
      expect.objectContaining({
        method: "GET",
        url: "/api/virtual-accounts/crypto/supported-assets",
      })
    );
  });

  it("Crypto payouts module should call correct endpoint for beneficiary creation", async () => {
    const data = {
      name: "OMU",
      asset: "TRX_USDT_S2UZ",
      wallet_address: "wallet_address",
    };
    mockAxiosInstance.request.mockResolvedValue({ data: { status: "success" } });

    await cray.cryptoPayouts.addBeneficiary(data);

    expect(mockAxiosInstance.request).toHaveBeenCalledWith(
      expect.objectContaining({
        method: "POST",
        url: "/api/payout/crypto/beneficiaries",
        data: data,
      })
    );
  });

  it("Crypto payouts module should call correct endpoint for payout initiation", async () => {
    const data = {
      amount: "2",
      currency: "TRX_USDT_S2UZ",
      address_reference: "beneficiary_123",
      customer_reference: "customer_ref_123",
    };
    mockAxiosInstance.request.mockResolvedValue({ data: { status: "Pending" } });

    await cray.cryptoPayouts.initiatePayout(data);

    expect(mockAxiosInstance.request).toHaveBeenCalledWith(
      expect.objectContaining({
        method: "POST",
        url: "/api/payout/crypto/initiate-payout",
        data: data,
      })
    );
  });

  it("Webhooks module should call correct endpoint for failed payout webhooks", async () => {
    mockAxiosInstance.request.mockResolvedValue({ data: { data: [] } });

    await cray.webhooks.failedPayoutWebhooks();

    expect(mockAxiosInstance.request).toHaveBeenCalledWith(
      expect.objectContaining({
        method: "GET",
        url: "/api/payout/failedWebhook",
      })
    );
  });

  it("Webhooks module should call correct endpoint for failed payout webhook retry", async () => {
    mockAxiosInstance.request.mockResolvedValue({ data: { status: "success" } });

    await cray.webhooks.retryFailedPayoutWebhook("50");

    expect(mockAxiosInstance.request).toHaveBeenCalledWith(
      expect.objectContaining({
        method: "GET",
        url: "/api/payout/failedWebhook/50",
      })
    );
  });
});
