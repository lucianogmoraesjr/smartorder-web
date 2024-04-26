import { Axios } from 'axios';

import { Order } from '../@types/Order';

import { api } from './api';

class OrdersService {
  private api: Axios;

  constructor() {
    this.api = api;
  }

  listOrders(signal?: AbortSignal) {
    return this.api.get<Order[]>('orders', {
      signal,
    });
  }

  getOrderById(id: string, signal?: AbortSignal) {
    return this.api.get<Order>(`orders/${id}`, { signal });
  }

  archiveAll(ids: string[]) {
    return this.api.patch('history/archive-recent', {
      orderIds: ids,
    });
  }

  deleteOrder(id: string) {
    return this.api.delete(`orders/${id}`);
  }
}

export default new OrdersService();
