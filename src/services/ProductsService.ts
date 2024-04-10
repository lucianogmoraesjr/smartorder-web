import { Axios } from 'axios';

import { Product } from '../@types/Product';

import { api } from './api';

class ProductsService {
  private api: Axios;

  constructor() {
    this.api = api;
  }

  async listProducts() {
    const { data } = await this.api.get<Product[]>('products');
    return data;
  }

  deleteProduct(id: string) {
    return this.api.delete(`products/${id}`);
  }
}

export default new ProductsService();
