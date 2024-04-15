import { Ingredient } from './Ingredient';

export interface Product {
  id: string;
  name: string;
  description: string;
  priceInCents: number;
  imagePath: string;
  category: {
    id: string;
    name: string;
    emoji: string;
  };
  ingredients?: Array<{
    ingredient: Ingredient;
  }>;
}

export interface CreateProductRequest {
  name: string;
  description: string;
  priceInCents: number;
  imagePath: string;
  categoryId: string;
  ingredients?: Array<{
    ingredientId: string;
  }>;
}
