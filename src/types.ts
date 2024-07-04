import { path } from "./variable";

export interface AuthState {
  email: string;
  name: string;
  profile: string;
  cart?: string[];
}

export interface ProductImage {
  id: string;
  imageName: string;
  imageUrl: string;
}

export interface ProductData {
  productName: string;
  productDescription: string;
  category?: string | null;
  images: ProductImage[];
  price: number;
  properties?: object[];
  _id?: string;
}

export interface ErrorResponse {
  message: string;
}

export interface Product {
  products: ProductData[];
}


export const config = {
  host: `${path}`,
  headers: {
    "Access-Control-Allow-Origin": `${path}`,
  },
  withCredentials: true,
};
