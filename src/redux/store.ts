import { configureStore } from "@reduxjs/toolkit";
// Импортируйте ваш редюсер или редюсеры
import authReducer from "./auth/authSlice";
import wordsReducer from "./words/wordsSlice";
import foldersReducer from "./folders/foldersSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    words: wordsReducer,
    folders: foldersReducer,
  },
});

// Типы для Dispatch и состояния хранилища
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
