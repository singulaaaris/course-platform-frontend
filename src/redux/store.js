import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import coursesReducer from "./slices/coursesSlice"; 
import courseReducer from "./slices/courseSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    courses: coursesReducer,
    course: courseReducer 
  },
});

export default store;
