export interface Category {
  id: string;
  name: string;
  emoji: string;
}

export type CategoryRequestBody = Omit<Category, 'id'>;
