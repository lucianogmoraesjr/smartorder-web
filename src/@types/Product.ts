export interface Product {
  id: string;
  name: string;
  priceInCents: number;
  imagePath: string;
  category: {
    name: string;
    emoji: string;
  };
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
