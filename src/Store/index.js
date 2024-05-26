import { configureStore } from "@reduxjs/toolkit";
import StudentReducer from './slices/StudentSlice';

export const store = configureStore({
    reducer:{
        students:StudentReducer,
    }
})