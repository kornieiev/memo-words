import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  getCurrentUserFolders,
  createFolder,
  deleteFolderFromDB,
  updateDocumentFolder,
} from "./operations"; // функция для получения данных
import { FolderProps } from "../../types/words";

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
  "folders/fetchFolders",
  async () => {
    const data = await getCurrentUserFolders();
    return data as FoldersData[];
  }
);

export const createNewFolder = createAsyncThunk(
  "folders/fetchFolder",
  async (
    {
      folderName,
      folderDescription,
    }: { folderName: string; folderDescription: string },
    { rejectWithValue }
  ) => {
    try {
      const data = await createFolder(folderName, folderDescription);
      if (data) {
        return { id: data.id, folderName, folderDescription };
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteFolder = createAsyncThunk(
  "folders/deleteFolder",
  async (folderId: string, { rejectWithValue }) => {
    try {
      const data = await deleteFolderFromDB(folderId);
      if (data) {
        return folderId;
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const editFolder = createAsyncThunk(
  "folders/editFolder",
  async (changedData: FolderProps, { rejectWithValue }) => {
    try {
      const data = await updateDocumentFolder(changedData);
      if (data) {
        return changedData;
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const foldersSlice = createSlice({
  name: "folders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchCurrentUserFolders
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
      })

      // createNewFolder
      .addCase(createNewFolder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewFolder.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          const { id, folderName, folderDescription } = action.payload;
          state.folders.push({ id, folderName, folderDescription });
        }
      })
      .addCase(createNewFolder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create new folder";
      })

      // deleteFolder
      .addCase(deleteFolder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFolder.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.folders = state.folders.filter(
            (folder) => folder.id !== action.payload
          );
        }
      })
      .addCase(deleteFolder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create new folder";
      })

      // editFolder
      .addCase(editFolder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        editFolder.fulfilled,
        (state, action: PayloadAction<FolderProps>) => {
          state.loading = false;
          console.log("action.payload", action.payload);

          const { id } = action.payload;
          const index = state.folders.findIndex((item) => item.id === id);

          if (index !== -1) {
            state.folders[index] = {
              ...state.folders[index],
              ...action.payload,
            };
          }
        }
      )
      .addCase(editFolder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create new folder";
      });
  },
});

export default foldersSlice.reducer;
