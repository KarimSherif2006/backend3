export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  sizes: string[];
  colors: string[];
  stock: number;
  imageUrl: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

export interface Cart {
  _id: string;
  user: string; // User ID
  items: CartItem[];
  createdAt: string;
  updatedAt: string;
}
