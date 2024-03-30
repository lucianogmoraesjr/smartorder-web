export interface Order {
  id: string;
  table: string;
  status: 'WAITING' | 'IN_PRODUCTION' | 'DONE';
  products: Array<{
    quantity: number;
    product: {
      id: string;
      name: string;
      imagePath: string;
      priceInCents: number;
    };
  }>;
}
