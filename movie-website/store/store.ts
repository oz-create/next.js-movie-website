import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./slices/moviesSlice";
import themeReducer from "./slices/themeSlice";


export const store = configureStore({
    reducer: {
        movies: moviesReducer,
        theme: themeReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;