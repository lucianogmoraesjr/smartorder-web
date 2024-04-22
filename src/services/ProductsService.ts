import { Axios } from 'axios';

import { Product } from '../@types/Product';

import { api } from './api';

interface CreateProductRequest {
  name: string;
  description: string;
  priceInCents: number;
  imagePath: string;
  categoryId: string;
  ingredients?: Array<string>;
}

interface UpdateProductRequest {
  name: string;
  description: string;
  priceInCents: number;
  imagePath: string;
  categoryId: string;
  ingredients?: Array<string>;
}

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

  async createProduct(data: CreateProductRequest) {
    const { data: product } = await this.api.post<Product>('products', data);

    return product;
  }

  async updateProduct(id: string, data: UpdateProductRequest) {
    const { data: product } = await this.api.put(`products/${id}`, data);

    return product;
  }

  deleteProduct(id: string) {
    return this.api.delete(`products/${id}`);
  }
}

export default new ProductsService();
