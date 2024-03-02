import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "../../common/utils/apit";
import { Category, CategoryState } from "./types";
import { RootState } from "../../app/store";

const initialState: CategoryState = {
  list: [],
  status: "idle",
  error: null,
  selected: null,
};

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const response = await http.get("/categories");

    console.log(response.data);
    return response.data;
  }
);

export const addCategory = createAsyncThunk(
  "categories/addCategory",
  async (category: Category) => {
    const response = await http.post("/categories", category);
    return response.data;
  }
);

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (id: string) => {
    const response = await http.delete(`/categories/${id}`);
    return response.data;
  }
);

export const fetchCategoryById = createAsyncThunk<
  Category,
  string,
  {
    rejectValue: string; // red edilme veziyyeti olarsa, response icerisinde error mesajini teslim eder
    state: RootState; // state icerisindeki diger slicelere erisim saglar
  }
>("Categories/fetchCategory", async (id, { rejectWithValue }) => {
  try {
    const response = await http.get(`/categories/${id}`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data.message);
  }
});

/**
 * updateCategory
 */

export const updatedCategory = createAsyncThunk(
  "categories/updateCategory",
  async (category: Category) => {
    const response = await http.patch(`/categories/${category._id}`, category);
    return response.data;
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        state.selected = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.list = action.payload;
        state.status = "succeeded";
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.list.push(action.payload);
        state.status = "succeeded";
      })
      .addCase(updatedCategory.fulfilled, (state, action) => {
        const index = state.list.findIndex(
          (category) => category._id === action.payload._id
        );
        if (index !== -1) {
          state.list[index] = action.payload;
        }
        state.status = "succeeded";
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.list = state.list.filter(
          (category: Category) => category._id !== (action.payload as any)
        );
      });
  },
});

export default categorySlice.reducer;
