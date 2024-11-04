import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  register,
  login,
  logout,
  authUserStatusChecking,
} from "../../services/firebase";

// Тип данных пользователя
interface User {
  uid: string;
  email: string | null;
}

// Тип состояния авторизации
interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  user: null,
  loading: false,
  error: null,
};

// Проверка статуса авторизации
export const checkAuthStatus = createAsyncThunk(
  "auth/checkAuthStatus",
  async () => {
    const result = await authUserStatusChecking();
    return result;
  }
);

// Регистрация пользователя
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await register(email, password);
      const token = await response.user.getIdToken();
      return { uid: response.user.uid, email: response.user.email, token };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Логин пользователя
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await login(email, password);
      const token = await response.user.getIdToken();
      return { uid: response.user.uid, email: response.user.email, token };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Логаут пользователя
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  await logout();
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Проверка статуса авторизации
      .addCase(checkAuthStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        checkAuthStatus.fulfilled,
        (state, action: PayloadAction<string | boolean>) => {
          state.loading = false;
          if (action.payload) {
            state.isAuthenticated = true;
            state.user = { uid: action.payload as string, email: null };
          } else {
            state.isAuthenticated = false;
            state.user = null;
          }
        }
      )
      .addCase(checkAuthStatus.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Ошибка проверки статуса авторизации";
      })
      // Регистрация
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        registerUser.fulfilled,
        (
          state,
          action: PayloadAction<{
            uid: string;
            email: string | null;
            token: string;
          }>
        ) => {
          state.loading = false;
          state.isAuthenticated = true;
          state.user = { uid: action.payload.uid, email: action.payload.email };
          state.token = action.payload.token;
        }
      )
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Логин
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (
          state,
          action: PayloadAction<{
            uid: string;
            email: string | null;
            token: string;
          }>
        ) => {
          state.loading = false;
          state.isAuthenticated = true;
          state.user = { uid: action.payload.uid, email: action.payload.email };
          state.token = action.payload.token;
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Логаут
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Ошибка при выходе из системы";
      });
  },
});

export default authSlice.reducer;
