import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AddToCartPayload,
  AddToCartResponse,
  AuthState,
  config,
  ErrorResponse,
  ProductData,
} from "../../types";
import { path } from "../../variable";
import axios from "axios";

const initialState: AuthState = {
  _id: "",
  email: "",
  name: "",
  profile: "",
  cart: [],
};

export const asyncAuthSlice = createAsyncThunk<
  AuthState,
  string,
  { rejectValue: ErrorResponse }
>("auth/asyncAuthSlice", async (token, thunkAPI) => {
  try {
    const response = await axios.post(`${path}/login`, { token }, config);
    return response.data as AuthState;
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ message: error.message });
  }
});

export const asyncSessionSlice = createAsyncThunk<
  AuthState,
  void,
  { rejectValue: ErrorResponse }
>("auth/asyncSessionSlice", async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${path}/login`, {
      withCredentials: true,
    });
    return response.data as AuthState;
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ message: error.message });
  }
});

export const asyncLogout = createAsyncThunk<
  AuthState,
  void,
  { rejectValue: ErrorResponse }
>("auth/asyncLogout", async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${path}/logout`, config);
    return response.data as AuthState;
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ message: error.message });
  }
});

export const asyncAddtoCart = createAsyncThunk<
  AddToCartResponse[],
  AddToCartPayload,
  { rejectValue: ErrorResponse }
>("auth/asyncAddtoCart", async ({ email, product }, thunkAPI) => {
  try {
    const response = await axios.post(
      `${path}/addtocart`,
      { email, product },
      config
    );
    return response.data as AddToCartResponse[];
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ message: error.message });
  }
});

export const asyncRemoveFromCart = createAsyncThunk<
  AddToCartResponse[],
  AddToCartPayload,
  { rejectValue: ErrorResponse }
>("auth/asyncRemoveFromCart", async ({ email, product }, thunkAPI) => {
  try {
    const response = await axios.post(
      `${path}/removefromcart`,
      { email, product },
      config
    );
    return response.data as AddToCartResponse[];
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ message: error.message });
  }
});

export const AuthSlice = createSlice({
  name: "AuthSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      asyncAuthSlice.fulfilled,
      (state, action: PayloadAction<AuthState>) => {
        state.email = action.payload.email;
        state.name = action.payload.name;
        state._id = action.payload._id;
        state.profile = action.payload.profile;
        state.cart = action.payload.cart;
      }
    );
    builder.addCase(
      asyncSessionSlice.fulfilled,
      (state, action: PayloadAction<AuthState>) => {
        state.email = action.payload.email;
        state.name = action.payload.name;
        state.profile = action.payload.profile;
        state._id = action.payload._id;
        state.cart = action.payload.cart;
      }
    );
    builder.addCase(
      asyncAddtoCart.fulfilled,
      (state, action: PayloadAction<AddToCartResponse[]>) => {
        state.cart = action.payload;
      }
    );
    builder.addCase(
      asyncRemoveFromCart.fulfilled,
      (state, action: PayloadAction<AddToCartResponse[]>) => {
        state.cart = action.payload;
      }
    );
    builder.addCase(asyncLogout.fulfilled, (state) => {
      state.email = "";
      state.name = "";
      state.profile = "";
      state._id = "";
    });
  },
});
// export const { addtoCart, removefromCart } = AuthSlice.actions;
export default AuthSlice.reducer;
