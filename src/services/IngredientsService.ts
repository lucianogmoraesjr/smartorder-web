import { Axios } from 'axios';

import { CreateIngredientRequest, Ingredient } from '../@types/Ingredient';

import { api } from './api';

class IngredientsService {
  private api: Axios;

  constructor() {
    this.api = api;
  }

  async listIngredients() {
    const { data } = await this.api.get<Ingredient[]>('ingredients');
    return data;
  }

  async createIngredient(ingredient: CreateIngredientRequest) {
    const { data } = await this.api.post<Ingredient>('ingredients', ingredient);
    return data;
  }
}

export default new IngredientsService();
