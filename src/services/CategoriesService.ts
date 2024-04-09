import { Axios } from 'axios';

import { Category } from '../@types/Category';

import { api } from './api';

type CreateCategoryBody = Omit<Category, 'id'>;

class CategoriesService {
  private api: Axios;

  constructor() {
    this.api = api;
  }

  async listCategories() {
    const { data } = await this.api.get<Category[]>('categories');
    return data;
  }

  createCategory(category: CreateCategoryBody) {
    return this.api.post<Category>('categories', category);
  }

  deleteCategory(id: string) {
    return this.api.delete(`categories/${id}`);
  }
}

export default new CategoriesService();
