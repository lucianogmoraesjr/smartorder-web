import { Axios } from 'axios';

import { Product } from '../@types/Product';

import { api } from './api';

class ProductsService {
  private api: Axios;

  constructor() {
    this.api = api;
  }

  async listProducts(signal?: AbortSignal) {
    const { data } = await this.api.get<Product[]>('products', {
      signal,
    });

    return data;
  }

  async getProductById(id: string, signal?: AbortSignal) {
    const { data } = await this.api.get(`products/${id}`, {
      signal,
    });

    return data;
  }

  async createProduct(formData: FormData) {
    const { data } = await this.api.post<Product>('products', formData);

    return data;
  }

  async updateProduct(id: string, formData: FormData) {
    const { data } = await this.api.put(`products/${id}`, formData);

    return data;
  }

  deleteProduct(id: string) {
    return this.api.delete(`products/${id}`);
  }
}

export default new ProductsService();
