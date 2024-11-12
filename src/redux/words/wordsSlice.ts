import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  createWord,
  getAllDataFromFirebase,
  getCurrentUserWords,
  getDocumentsByUserAndFolderName,
} from "./operations"; // функция для получения данных
import { WordProps } from "../../types/words";

// // delete if works
// interface WordProps {
//   id: string;
//   definition: string;
//   folder: string;
//   imageLink: string;
//   learningStatus: string;
//   translation: string;
//   word: string;
// }

interface WordsState {
  words: WordProps[];
  loading: boolean;
  error: string | null;
}

const initialState: WordsState = {
  words: [],
  loading: false,
  error: null,
};

// Async thunk for loading all data:
// export const fetchAllUsersWords = createAsyncThunk(
//   "words/fetchAllWords",
//   async () => {
//     const data = await getAllDataFromFirebase();
//     return data as WordProps[];
//   }
// );

// Async thunk for loading current user data:
export const fetchCurrentUserWords = createAsyncThunk(
  "words/fetchCurrentUserWords",
  async (folderName: string | undefined) => {
    const data = await getDocumentsByUserAndFolderName(folderName);
    return data as WordProps[];
  }
);

// Создание asyncThunk для добавления нового слова
export const addNewWord = createAsyncThunk(
  "words/addNewWord",
  async (wordData: WordProps, { rejectWithValue }) => {
    try {
      const response = await createWord(wordData);
      return response;
    } catch (error: any) {
      // Возвращаем ошибку через rejectWithValue для обработки в extraReducers
      return rejectWithValue(error.message);
    }
  }
);

const wordsSlice = createSlice({
  name: "words",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // * fetchCurrentUserWords
      .addCase(fetchCurrentUserWords.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCurrentUserWords.fulfilled,
        (state, action: PayloadAction<WordProps[]>) => {
          state.loading = false;
          state.words = action.payload;
        }
      )
      .addCase(fetchCurrentUserWords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load words";
      })

      // * addNewWord
      .addCase(addNewWord.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addNewWord.fulfilled,
        (state, action: PayloadAction<WordProps>) => {
          state.loading = false;
          state.words.push(action.payload); // Добавляем новое слово в массив
        }
      )
      .addCase(addNewWord.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Сохраняем ошибку для отображения
      });
  },
});

export default wordsSlice.reducer;
