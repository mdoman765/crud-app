export interface Product {
  id:          number;
  name:        string;
  description: string | null;
  price:       number;
  category:    string | null;
  stock:       number;
  isActive:    boolean;
  imageUrl:    string | null;
  createdAt:   string;
  updatedAt:   string | null;
}

export interface CreateProduct {
  name:        string;
  description: string | null;
  price:       number;
  category:    string | null;
  stock:       number;
  isActive:    boolean;
  imageUrl:    string | null;
}

export type UpdateProduct = CreateProduct;