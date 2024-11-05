import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getCurrentUserFolders } from "./operations"; // функция для получения данных

interface FoldersData {
  id: string;
  folderName: string;
  folderDescription: string;
}

interface FoldersState {
  folders: FoldersData[];
  loading: boolean;
  error: string | null;
}

const initialState: FoldersState = {
  folders: [],
  loading: false,
  error: null,
};

// Async thunk for loading current user data:
export const fetchCurrentUserFolders = createAsyncThunk(
  "words/fetchFolders",
  async () => {
    const data = await getCurrentUserFolders();
    console.log("fetchCurrentUserFolders", data);
    return data as FoldersData[];
  }
);

const foldersSlice = createSlice({
  name: "folders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUserFolders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCurrentUserFolders.fulfilled,
        (state, action: PayloadAction<FoldersData[]>) => {
          state.loading = false;
          state.folders = action.payload;
        }
      )
      .addCase(fetchCurrentUserFolders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load words";
      });
  },
});

export default foldersSlice.reducer;
