import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductData, config, ErrorResponse, Product } from "../../types";
import { path } from "../../variable";
import axios from "axios";


const initialState: Product = {
  products: [],
};

export const asyncProductFetch = createAsyncThunk<
  ProductData,
  string,
  { rejectValue: ErrorResponse }
>("auth/asyncProductFetch", async (token, thunkAPI) => {
  try {
    const response = await axios.post(`${path}/products/`, { token }, config);
    return response.data as ProductData;
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ message: error.message });
  }
});

export const ProductSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      asyncProductFetch.fulfilled,
      (state, action: PayloadAction<ProductData>) => {
        state.products = [...state.products, action.payload];
      }
    );
  },
});

export default ProductSlice.reducer;
