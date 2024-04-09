import { Axios } from 'axios';

import { Category } from '../@types/Category';

import { api } from './api';

type CreateCategoryBody = Omit<Category, 'id'>;
type UpdateCategoryBody = Omit<Category, 'id'>;

class CategoriesService {
  private api: Axios;

  constructor() {
    this.api = api;
  }

  async listCategories() {
    const { data } = await this.api.get<Category[]>('categories');
    return data;
  }

  async getCategoryById(id: string) {
    const { data } = await this.api.get<Category>(`categories/${id}`);
    return data;
  }

  createCategory(category: CreateCategoryBody) {
    return this.api.post<Category>('categories', category);
  }

  updateCategory(id: string, category: UpdateCategoryBody) {
    return this.api.put<Category>(`categories/${id}`, category);
  }

  deleteCategory(id: string) {
    return this.api.delete(`categories/${id}`);
  }
}

export default new CategoriesService();
