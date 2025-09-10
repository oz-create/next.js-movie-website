import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMovies = createAsyncThunk(
    "movies/fetchMovies",
    async () => {
        const res = await fetch(
        "https://api.themoviedb.org/3/movie/popular?api_key=274c12e6e2e4f9ca265a01d107280eba&language=en-US&page=1"
        );
        const data = await res.json();
        return data.results;
    }
)

export const fetchCategories = createAsyncThunk(
    "movies/fetchCategories",
    async () => {
        const res = await fetch(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=274c12e6e2e4f9ca265a01d107280eba&language=en-US&page=1"
        );
        const data = await res.json();
        return data.genres;
    }
)

export const fetchNowPlayingMovies = createAsyncThunk(
    "movies/fetchNowPlayingMovies",
    async () => {
        const res = await fetch(
        "https://api.themoviedb.org/3/movie/now_playing?api_key=274c12e6e2e4f9ca265a01d107280eba&language=en-US&page=1"
        );
        const data = await res.json();
        return data.results;
    }
)

type initialStateType = {
  list: object[]; 
  categories: object[]; 
  nowPlayingMovies: object[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};


const initialState: initialStateType = {
    list: [],
    categories: [],
    nowPlayingMovies: [],
    status: "idle",
    error: null,
}


const moviesSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Bir hata oluştu";
      })
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Bir hata oluştu";
      })
      .addCase(fetchNowPlayingMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNowPlayingMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.nowPlayingMovies = action.payload;
      })
      .addCase(fetchNowPlayingMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Bir hata oluştu";
      })
  },
})

export default moviesSlice.reducer;