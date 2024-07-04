import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, config, ErrorResponse } from "../../types";
import { path } from "../../variable";
import axios from "axios";

const initialState: AuthState = {
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

export const AuthSlice = createSlice({
  name: "AuthSlice",
  initialState,
  reducers: {
    addtoCart: (state, action) => {
      state.cart?.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      asyncAuthSlice.fulfilled,
      (state, action: PayloadAction<AuthState>) => {
        state.email = action.payload.email;
        state.name = action.payload.name;
        state.profile = action.payload.profile;
      }
    );
    builder.addCase(
      asyncSessionSlice.fulfilled,
      (state, action: PayloadAction<AuthState>) => {
        state.email = action.payload.email;
        state.name = action.payload.name;
        state.profile = action.payload.profile;
      }
    );
    builder.addCase(asyncLogout.fulfilled, (state) => {
      state.email = "";
      state.name = "";
      state.profile = "";
    });
  },
});
export const { addtoCart } = AuthSlice.actions;
export default AuthSlice.reducer;
