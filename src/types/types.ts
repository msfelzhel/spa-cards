export interface Product {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    isLiked: boolean;
    price?: number;
    brand?: string;
    category?: string;
    rating?: number;
    stock?: number;
  }