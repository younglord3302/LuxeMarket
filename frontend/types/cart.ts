export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  vendor: {
    id: string;
    businessName: string;
  };
  inventory: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}
