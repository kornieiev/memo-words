import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getAllDataFromFirebase } from "./operations"; // функция для получения данных

interface WordData {
  id: string;
  definition: string;
  folder: string;
  imageLink: string;
  learningStatus: string;
  translation: string;
  word: string;
}

interface WordsState {
  words: WordData[];
  loading: boolean;
  error: string | null;
}

const initialState: WordsState = {
  words: [],
  loading: false,
  error: null,
};

// Async thunk for loading data:
export const fetchWords = createAsyncThunk("words/fetchWords", async () => {
  const data = await getAllDataFromFirebase();
  return data as WordData[];
});

const wordsSlice = createSlice({
  name: "words",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWords.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchWords.fulfilled,
        (state, action: PayloadAction<WordData[]>) => {
          state.loading = false;
          state.words = action.payload;
        }
      )
      .addCase(fetchWords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load words";
      });
  },
});

export default wordsSlice.reducer;
