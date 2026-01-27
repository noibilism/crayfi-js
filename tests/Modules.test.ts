import axios from "axios";
import { Cray } from "../src/Cray";
import { Cards } from "../src/modules/cards";

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
        url: "/momo/api/v1/momo/initiate",
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
        url: "/wallet/api/v1/wallet/balances",
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
        url: "/v2/merchant/rates",
        data: data,
      })
    );
  });
});
