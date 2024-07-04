import { configureStore } from "@reduxjs/toolkit";
import Auth from "./features/Auth";
import ProductSlice from "./features/Products";

export const store = configureStore({
  reducer: {
    authUser: Auth,
    products: ProductSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
