import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getAllDataFromFirebase, getCurrentUserWords } from "./operations"; // функция для получения данных

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

// Async thunk for loading all data:
export const fetchAllUsersWords = createAsyncThunk(
  "words/fetchWords",
  async () => {
    const data = await getAllDataFromFirebase();
    console.log("data", data);
    return data as WordData[];
  }
);

// Async thunk for loading current user data:
export const fetchCurrentUserWords = createAsyncThunk(
  "words/fetchWords",
  async () => {
    const data = await getCurrentUserWords();
    console.log("fetchCurrentUserData", data);
    return data as WordData[];
  }
);

const wordsSlice = createSlice({
  name: "words",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUserWords.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCurrentUserWords.fulfilled,
        (state, action: PayloadAction<WordData[]>) => {
          state.loading = false;
          state.words = action.payload;
        }
      )
      .addCase(fetchCurrentUserWords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load words";
      });
  },
});

export default wordsSlice.reducer;
