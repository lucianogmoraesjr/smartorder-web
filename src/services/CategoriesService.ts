import { Axios } from 'axios';

import { api } from './api';

class CategoriesService {
  private api: Axios;

  constructor() {
    this.api = api;
  }

  async listCategories() {
    const { data } = await this.api.get('categories');
    return data;
  }

  async deleteCategory(id: string) {
    return this.api.delete(`categories/${id}`);
  }
}

export default new CategoriesService();
