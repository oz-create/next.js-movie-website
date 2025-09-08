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

type initialStateType = {
  list: object[];  
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};


const initialState: initialStateType = {
    list: [],
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
      });
  },
})

export default moviesSlice.reducer;