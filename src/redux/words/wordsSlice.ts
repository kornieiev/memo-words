import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  createWord,
  deleteDocumentWord,
  getAllDataFromFirebase,
  getCurrentUserWords,
  getDocumentsByUserAndFolderName,
  updateDocumentWord,
  updateDocumentWordLearningStatus,
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

// Async Thunk для добавления нового слова
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

// Async Thunk для изменения слова
export const updateWord = createAsyncThunk(
  "words/updateWord",
  async (wordData: WordProps, { rejectWithValue }) => {
    try {
      const response = await updateDocumentWord(wordData);
      return response;
    } catch (error: any) {
      // Возвращаем ошибку через rejectWithValue для обработки в extraReducers
      return rejectWithValue(error.message);
    }
  }
);

// Async Thunk для удаления слова
export const deleteWord = createAsyncThunk(
  "words/deleteWord",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await deleteDocumentWord(id);
      return response;
    } catch (error: any) {
      // Возвращаем ошибку через rejectWithValue для обработки в extraReducers
      return rejectWithValue(error.message);
    }
  }
);

// Async Thunk для изменения статуса изученного слова
export const changeWordStatus = createAsyncThunk<
  void,
  {
    id: string;
    newStatus: string;
  },
  { rejectValue: string }
>("words/changeWordStatus", async ({ id, newStatus }, { rejectWithValue }) => {
  try {
    const response = await updateDocumentWordLearningStatus(id, newStatus);
    return response;
  } catch (error: any) {
    // Возвращаем ошибку через rejectWithValue для обработки в extraReducers
    return rejectWithValue(error.message);
  }
});

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
      })

      // * updateWord
      .addCase(updateWord.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateWord.fulfilled,
        (state, action: PayloadAction<WordProps>) => {
          state.loading = false;

          const { id } = action.payload;
          const index = state.words.findIndex((item) => item.id === id);

          if (index !== -1) {
            state.words[index] = { ...state.words[index], ...action.payload };
          }
        }
      )
      .addCase(updateWord.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Сохраняем ошибку для отображения
      })

      // * deleteWord
      .addCase(deleteWord.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteWord.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        const index = state.words.findIndex(
          (item) => item.id === action.payload
        );

        if (index !== -1) {
          state.words.splice(index, 1);
        }
      })
      .addCase(deleteWord.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Сохраняем ошибку для отображения
      })

      // * changeWordStatus
      .addCase(changeWordStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        changeWordStatus.fulfilled,
        (state, action: PayloadAction<string>) => {
          const { id, newStatus } = action.payload;

          state.words.map((item) => {
            if (item.id === id) {
              item.learningStatus = newStatus;
            }
          });
        }
      )
      .addCase(changeWordStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Сохраняем ошибку для отображения
      });
  },
});

export default wordsSlice.reducer;
