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
