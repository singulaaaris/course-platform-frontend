import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchCourses = createAsyncThunk(
  "courses/fetchCourses",
  async (_, { getState }) => {
    const state = getState().courses;
    const { page, category, search, sort } = state;

    const params = new URLSearchParams();
    params.append("page", page);
    params.append("size", 6);

    if (sort === "id") {
      params.append("sortBy", "id");
      params.append("direction", "desc");
    } else {
      params.append("sortBy", "title");
      params.append("direction", "asc");
    }

    if (category && category !== "all") {
      params.append("category", category);
    }

    if (search) {
      params.append("search", search);
    }

    const response = await axios.get(`/courses/page?${params.toString()}`);

    let courses = response.data.content;

    if (sort === "likes") {
      courses = [...courses].sort((a, b) => b.likesCount - a.likesCount);
    }

    return {
      courses,
      totalPages: response.data.totalPages
    };
  }
);

const coursesSlice = createSlice({
  name: "courses",
  initialState: {
    courses: [],
    loading: false,
    error: null,
    page: 0,
    totalPages: 1,
    category: "all",
    search: "",
    sort: "title"
  },
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload.courses;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const {
  setPage,
  setCategory,
  setSearch,
  setSort
} = coursesSlice.actions;

export const selectCourses = (state) => state.courses.courses;
export const selectTotalPages = (state) => state.courses.totalPages;

export default coursesSlice.reducer;
