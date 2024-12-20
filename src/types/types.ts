export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  brand: string;
  category: string;
  stock: number;
  imageUrl: string;
  isLiked: boolean;
  rating?: number;
}