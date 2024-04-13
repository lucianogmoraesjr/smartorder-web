export interface Ingredient {
  id: string;
  name: string;
  emoji: string;
}

export type CreateIngredientRequest = Omit<Ingredient, 'id'>;
