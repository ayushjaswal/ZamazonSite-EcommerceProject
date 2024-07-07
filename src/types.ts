import { path } from "./variable";

export interface AuthState {
  _id: string;
  email: string;
  name: string;
  profile: string;
  cart?: CartProduct[];
}

export interface ProductImage {
  id?: string;
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
  review?: Review[];
  reviewValue: number;
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

export interface Review {
  user: AuthState;
  product: string;
  comment: string;
  images?: ProductImage[];
  stars: number;
  _id?: string;
}

export interface CardProps {
  productName: string;
  images: ProductImage[];
  _id: string;
  price: number;
  review: Review[];
  reviewValue: number;
}

export interface AddToCartResponse {
  product: ProductData;
  quantity: number;
}
export interface AddToCartPayload {
  email: string;
  product: string;
}

export interface OrderProp {
  streetAddress: string;
  country: string;
  cart: CartProduct[];
  postalcode: string;
  city: string;
  user: AuthState;
}

export interface CartProduct {
  product: ProductData;
  quantity: number;
}

export interface Address {
  streetAddress: string;
  city: string;
  postalcode: string;
  country: string;
}
