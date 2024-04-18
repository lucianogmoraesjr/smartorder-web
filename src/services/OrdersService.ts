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
}

export default new OrdersService();
