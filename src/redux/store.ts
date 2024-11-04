import { configureStore } from "@reduxjs/toolkit";
// Импортируйте ваш редюсер или редюсеры
import wordsReducer from "./words/wordsSlice";

const store = configureStore({
  reducer: {
    words: wordsReducer,
  },
});

// Типы для Dispatch и состояния хранилища
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
