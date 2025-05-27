import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCourseById = createAsyncThunk(
    "course/fetchById",
    async (id, { rejectWithValue }) => {
        try {
            const res = await axios.get(`http://localhost:8080/api/courses/${id}`);

            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error loading course");
        }
    }
);

const courseSlice = createSlice({
    name: "course",
    initialState: {
        course: null,
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCourseById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCourseById.fulfilled, (state, action) => {
                state.loading = false;
                state.course = action.payload;
            })
            .addCase(fetchCourseById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const selectCourse = (state) => state.course.course;
export const selectCourseLoading = (state) => state.course.loading;
export const selectCourseError = (state) => state.course.error;
export default courseSlice.reducer;
