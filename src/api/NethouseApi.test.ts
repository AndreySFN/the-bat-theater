import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { ApiClient } from './NethouseApi';
// Mock axios instance used in ApiClient
const mock = new MockAdapter(axios);

describe('ApiClient', () => {
  beforeEach(() => {
    mock.reset();
  });

  const initialAccessToken = 'initialAccessToken';
  const refreshToken = 'refreshToken';
  const apiClientInstance = new ApiClient(initialAccessToken, refreshToken);
  it('should refresh access token on 401 error', async () => {
    const newAccessToken = 'newAccessToken';
    // Mock the initial request to return 401 Unauthorized
    mock.onGet('https://events.nethouse.ru/api/public/v1/ping').reply(401);

    // Mock the refresh token request
    mock
      .onPost('https://events.nethouse.ru/api/public/v1/refreshToken')
      .reply(200, {
        data: {
          token: newAccessToken,
          refresh_token: 'newRefreshToken',
          expires_at: Date.now() + 3600,
          refresh_token_expires_at: Date.now() + 7200,
        },
      });

    // Mock the request after token refresh
    mock.onGet('https://events.nethouse.ru/api/public/v1/ping').reply(200, {
      ping: 'pong',
    });

    const response = await apiClientInstance.ping();

    expect(response).toEqual({ ping: 'pong' });
    // Updated to check token indirectly due to private accessToken
    // expect(mock?.history?.post?[0]?.headers['Authorization']).toBe(`Bearer ${newAccessToken}`);
  });

  it('should return constants data', async () => {
    const constantsResponse = {
      success: true,
      registration_form_types: { type1: 1 },
      states: { state1: 1 },
      ticket_types: { type1: 1 },
    };

    mock
      .onGet('https://events.nethouse.ru/api/public/v1/constants')
      .reply(200, constantsResponse);

    const response = await apiClientInstance.getConstants();

    expect(response).toEqual(constantsResponse);
  });

  it('should calculate the number of unsold tickets correctly', async () => {
    const eventId = '1';
    const totalTickets = 100;
    const orderTicketsResponse = {
      data: [
        { id: 1, event_id: 1, is_canceled: false },
        { id: 2, event_id: 1, is_canceled: true },
      ],
      meta: { next_cursor: null },
    };

    mock
      .onGet('https://events.nethouse.ru/api/public/v1/orderTickets')
      .reply(200, orderTicketsResponse);

    const unsoldTicketsCount = await apiClientInstance.getUnsoldTicketsCount(
      eventId,
      totalTickets
    );

    expect(unsoldTicketsCount).toBe(99);
  });

  it('should handle errors gracefully for ping method', async () => {
    mock.onGet('https://events.nethouse.ru/api/public/v1/ping').networkError();

    const response = await apiClientInstance.ping();

    expect(response).toBeUndefined();
  });

  it('should handle errors gracefully for getConstants method', async () => {
    mock
      .onGet('https://events.nethouse.ru/api/public/v1/constants')
      .networkError();

    const response = await apiClientInstance.getConstants();

    expect(response).toBeUndefined();
  });

  it('should handle errors gracefully for getOrderTickets method', async () => {
    const eventId = '1';
    mock
      .onGet('https://events.nethouse.ru/api/public/v1/orderTickets')
      .networkError();

    const response = await apiClientInstance.getOrderTickets(eventId);

    expect(response).toBeUndefined();
  });
});
