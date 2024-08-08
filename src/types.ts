export interface Product {
  id: string;
  title: string;
  images: string[];
  price: number;
  rating: number;
  description: string;
  category: string;
  thumbnail: string;
}

export type Products = Product[];
