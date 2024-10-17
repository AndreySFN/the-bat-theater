// lib/apiClient.ts

import axios, { AxiosInstance, AxiosResponse } from 'axios';

/**
 * Ответ на запрос обновления токена.
 */
interface TokenResponse {
  data: {
    token: string;
    expires_at: number;
    refresh_token: string;
    refresh_token_expires_at: number;
  };
}

/**
 * Структура события.
 */
interface Event {
  id: number;
  name: string;
  dates: string;
  state: number;
  url_public: string;
  url_admin: string;
}

/**
 * Ответ на запрос списка событий.
 */
interface EventsResponse {
  data: Event[];
  meta: {
    next_cursor: string | null;
  };
}

/**
 * Структура заказа.
 */
interface Order {
  id: number;
  event_id: number;
  external_id: string | null;
  buyer_email: string;
  buyer_name: string | null;
  discount: {
    amount: number;
    currency: string;
  };
  total: {
    amount: number;
    currency: string;
  };
  pay_until: number | null;
  is_bill: boolean;
  is_canceled: boolean;
  is_completed: boolean;
  completed_at: number | null;
  created_at: number;
  updated_at: number | null;
  deleted_at: number | null;
}

/**
 * Ответ на запрос списка заказов.
 */
interface OrdersResponse {
  data: Order[];
  meta: {
    next_cursor: string | null;
  };
}

/**
 * Структура билета.
 */
interface Ticket {
  id: number;
  event_id: number;
  name: string;
  price: number;
  type: number;
  deleted_at: number | null;
}

/**
 * Ответ на запрос списка билетов.
 */
interface TicketsResponse {
  data: Ticket[];
  meta: {
    next_cursor: string | null;
  };
}

/**
 * Структура опции билета.
 */
interface Option {
  id: number;
  event_id: number;
  ticket_id: number;
  name: string;
  price: number;
  deleted: boolean;
}

/**
 * Ответ на запрос списка опций билетов.
 */
interface OptionsResponse {
  data: Option[];
  meta: {
    next_cursor: string | null;
  };
}

/**
 * Структура поля регистрационной формы.
 */
interface FormField {
  id: number;
  type: string;
  name: string;
  is_custom: boolean;
  is_required: boolean;
  variants: string[] | null;
}

/**
 * Ответ на запрос списка полей регистрационной формы.
 */
interface FormsResponse {
  data: FormField[];
  meta: {
    next_cursor: string | null;
  };
}

/**
 * Структура участника события.
 */
interface OrderTicket {
  id: number;
  event_id: number;
  order_id: number;
  ticket_id: number;
  external_id: string | null;
  price: {
    amount: number;
    currency: string;
  };
  discount: {
    amount: number;
    currency: string;
  };
  sum: {
    amount: number;
    currency: string;
  };
  fields: Record<string, string>;
  hall: {
    hall: string;
    group: string;
    place: string;
  };
  key: string | null;
  options: Record<string, boolean>;
  person: {
    full_name: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    email: string;
    phone: string;
    city: string | null;
  };
  promocode: {
    id: number;
    name: string;
  } | null;
  session: {
    id: number;
    name: string;
    datetime: number;
  } | null;
  is_canceled: boolean;
  created_at: number;
  updated_at: number;
  deleted_at: number | null;
  canceled_at: number | null;
  expires_at: number | null;
  visited_at: number[] | null;
}

/**
 * Ответ на запрос списка участников события.
 */
interface OrderTicketsResponse {
  data: OrderTicket[];
  meta: {
    next_cursor: string | null;
  };
}

/**
 * Структура данных контрагента при оплате заказа по счёту.
 */
interface PaymentCashless {
  id: number;
  amount: {
    amount: number;
    currency: string;
  };
  account_number: string;
  bank_bic: string;
  bank_corr_account: string | null;
  bank_name: string;
  inn: string;
  kpp: string | null;
  name: string;
  document_number: string;
  payment_date: number;
  payment_purpose: string;
  created_at: number;
}

/**
 * Ответ на запрос данных контрагента при оплате заказа по счёту.
 */
interface PaymentCashlessResponse {
  data: PaymentCashless;
}

/**
 * Ответ на запрос проверки связи с сервером.
 */
interface PingResponse {
  ping: string;
}

/**
 * Ответ на запрос списка констант и справочников.
 */
interface ConstantsResponse {
  success: boolean;
  registration_form_types: Record<string, number>;
  states: Record<string, number>;
  ticket_types: Record<string, number>;
}

/**
 * Класс ApiClient для взаимодействия с API сервиса Nethouse.События.
 */
class ApiClient {
  private client: AxiosInstance;
  /**
   * Приватный конструктор для предотвращения создания экземпляров извне.
   * @param accessToken - Токен доступа к API.
   * @param refreshToken - Токен для обновления основного токена доступа.
   */
  constructor(private accessToken: string, private refreshToken: string) {
    this.client = axios.create({
      baseURL: 'https://events.nethouse.ru/api/public/v1/',
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        Accept: 'application/json',
      },
    });

    // Обработка обновления токена при истечении
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response && error.response.status === 401) {
          try {
            await this.refreshAccessToken();
            error.config.headers['Authorization'] =
              `Bearer ${this.accessToken}`;
            return this.client.request(error.config);
          } catch (refreshError) {
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );
  }

  /**
   * Метод для обновления токена доступа.
   * @private
   */
  private async refreshAccessToken(): Promise<void> {
    const response: AxiosResponse<TokenResponse> =
      await axios.post<TokenResponse>(
        'https://events.nethouse.ru/api/public/v1/refreshToken',
        null,
        {
          headers: {
            Authorization: `Bearer ${this.refreshToken}`,
            Accept: 'application/json',
          },
        }
      );

    const { data } = response.data;
    this.accessToken = data.token;
    this.refreshToken = data.refresh_token;
    this.client.defaults.headers['Authorization'] =
      `Bearer ${this.accessToken}`;
  }

  /**
   * Проверка связи с сервером по токену.
   * @returns Результат проверки.
   */
  async ping(): Promise<PingResponse> {
    const response = await this.client.get<PingResponse>('/ping');
    return response.data;
  }

  /**
   * Получение списка констант и справочников для работы с записями.
   * @returns Список констант и справочников.
   */
  async getConstants(): Promise<ConstantsResponse> {
    const response = await this.client.get<ConstantsResponse>('/constants');
    return response.data;
  }

  /**
   * Получение списка событий.
   * @param eventId - (Необязательный) Идентификатор события для фильтрации.
   * @param limit - (Необязательный) Количество записей на страницу.
   * @returns Список событий.
   */
  async getEvents(
    eventId?: number,
    limit: number = 30
  ): Promise<EventsResponse> {
    const params: Record<string, string | number> = {};
    if (eventId) params.event_id = eventId;
    if (limit) params.limit = limit;

    const response = await this.client.get<EventsResponse>('/events', {
      params,
    });
    return response.data;
  }

  /**
   * Получение списка билетов события.
   * @param eventId - (Необязательный) Идентификатор события для фильтрации.
   * @param limit - (Необязательный) Количество записей на страницу.
   * @returns Список билетов.
   */
  async getTickets(
    eventId?: number,
    limit: number = 30
  ): Promise<TicketsResponse> {
    const params: Record<string, string | number> = {};
    if (eventId) params.event_id = eventId;
    if (limit) params.limit = limit;

    const response = await this.client.get<TicketsResponse>('/tickets', {
      params,
    });
    return response.data;
  }

  /**
   * Получение списка опций билетов события.
   * @param eventId - (Необязательный) Идентификатор события для фильтрации.
   * @param limit - (Необязательный) Количество записей на страницу.
   * @returns Список опций билетов.
   */
  async getOptions(
    eventId?: number,
    limit: number = 30
  ): Promise<OptionsResponse> {
    const params: Record<string, string | number> = {};
    if (eventId) params.event_id = eventId;
    if (limit) params.limit = limit;

    const response = await this.client.get<OptionsResponse>('/options', {
      params,
    });
    return response.data;
  }

  /**
   * Получение списка полей регистрационной формы.
   * @param eventId - (Необязательный) Идентификатор события для фильтрации.
   * @param limit - (Необязательный) Количество записей на страницу.
   * @returns Список полей регистрационной формы.
   */
  async getForms(eventId?: number, limit: number = 30): Promise<FormsResponse> {
    const params: Record<string, string | number> = {};
    if (eventId) params.event_id = eventId;
    if (limit) params.limit = limit;

    const response = await this.client.get<FormsResponse>('/forms', { params });
    return response.data;
  }

  /**
   * Получение списка заказов.
   * @param eventId - (Необязательный) Идентификатор события для фильтрации.
   * @param orderId - (Необязательный) Идентификатор заказа для фильтрации.
   * @param updatedFrom - (Необязательный) Показать заказы, обновленные начиная с указанной даты (timestamp).
   * @param limit - (Необязательный) Количество записей на страницу.
   * @param cursor - (Необязательный) Курсор для получения следующей страницы результатов.
   * @returns Список заказов.
   */
  async getOrders(
    eventId?: number,
    orderId?: number,
    updatedFrom?: number,
    limit: number = 30,
    cursor?: string
  ): Promise<OrdersResponse> {
    const params: Record<string, string | number> = {};
    if (eventId) params.event_id = eventId;
    if (orderId) params.orderId = orderId;
    if (updatedFrom) params.updated_from = updatedFrom;
    if (limit) params.limit = limit;
    if (cursor) params.cursor = cursor;

    const response = await this.client.get<OrdersResponse>('/orders', {
      params,
    });
    return response.data;
  }

  /**
   * Получение списка участников события.
   * @param eventId - (Необязательный) Идентификатор события для фильтрации.
   * @param limit - (Необязательный) Количество записей на страницу.
   * @param cursor - (Необязательный) Курсор для получения следующей страницы результатов.
   * @returns Список участников события.
   */
  async getOrderTickets(
    eventId?: string,
    limit: number = 30,
    cursor?: string
  ): Promise<OrderTicketsResponse> {
    const params: Record<string, string | number> = {};
    if (eventId) params.event_id = eventId;
    if (limit) params.limit = limit;
    if (cursor) params.cursor = cursor;

    const response = await this.client.get<OrderTicketsResponse>(
      '/orderTickets',
      { params }
    );
    return response.data;
  }

  /**
   * Передача информации о посещении мероприятия участником.
   * @param orderTicketId - Идентификатор купленного билета участника.
   * @param visitedAt - Дата и время посещения в формате timestamp (UTC+3).
   * @returns Обновленный объект участника.
   */
  async updateOrderTicketVisitedAt(
    orderTicketId: number,
    visitedAt: number
  ): Promise<OrderTicket> {
    const params = { visited_at: visitedAt };
    const response = await this.client.patch<OrderTicket>(
      `/orderTickets/${orderTicketId}`,
      null,
      { params }
    );
    return response.data;
  }

  /**
   * Получение данных контрагента при оплате заказа по счёту.
   * @param orderId - Идентификатор заказа.
   * @returns Данные контрагента.
   */
  async getPaymentCashless(orderId: number): Promise<PaymentCashlessResponse> {
    const response = await this.client.get<PaymentCashlessResponse>(
      `/orders/${orderId}/paymentCashless`
    );
    return response.data;
  }

  /**
   * Получение количества непроданных билетов для конкретного типа билетов события.
   * @param eventId - Идентификатор события.
   * @param ticketId - Идентификатор типа билетов.
   * @param totalTickets - Общее количество доступных билетов для данного типа.
   * @returns Количество непроданных билетов для указанного типа.
   */
  async getUnsoldTicketsCount(
    eventId?: string,
    totalTickets?: number
  ): Promise<number | null> {
    let soldCount = 0;
    if (!eventId || !totalTickets) {
      return null;
    }
    let cursor: string | null = null;
    const limit = 100; // Максимальное количество записей на страницу

    do {
      const response = await this.getOrderTickets(eventId, limit, cursor!);
      const { data, meta } = response;
      // Подсчитываем количество проданных билетов для указанного типа
      soldCount += data.filter(({ is_canceled }) => !is_canceled).length;

      cursor = meta.next_cursor;
    } while (cursor);

    // Вычисляем количество непроданных билетов
    const unsoldCount = totalTickets - soldCount;
    return unsoldCount;
  }
}

/**
 * Экземпляр ApiClient, инициализированный с токенами из переменных окружения.
 * Убедитесь, что переменные окружения ACCESS_TOKEN и REFRESH_TOKEN установлены.
 */
const accessToken = process.env.ACCESS_TOKEN || '';
const refreshToken = process.env.REFRESH_TOKEN || '';

if (!accessToken || !refreshToken) {
  throw new Error(
    'ACCESS_TOKEN и REFRESH_TOKEN должны быть установлены в переменных окружения.'
  );
}

export const apiClientInstance = new ApiClient(accessToken, refreshToken);
