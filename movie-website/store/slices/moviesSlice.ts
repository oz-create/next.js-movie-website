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

export const fetchMoviesCategories = createAsyncThunk(
    "movies/fetchMoviesCategories",
    async () => {
        const res = await fetch(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=274c12e6e2e4f9ca265a01d107280eba&language=en-US&page=1"
        );
        const data = await res.json();
        return data.genres;
    }
)

export const fetchSeriesCategories = createAsyncThunk(
    "movies/fetchSeriesCategories",
    async () => {
        const res = await fetch(
        "https://api.themoviedb.org/3/genre/tv/list?api_key=274c12e6e2e4f9ca265a01d107280eba&language=en-US&page=1"
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

export const fetchUpcomingMovies = createAsyncThunk(
    "movies/fetchUpcomingMovies",
    async () => {
        const res = await fetch(
        "https://api.themoviedb.org/3/movie/upcoming?api_key=274c12e6e2e4f9ca265a01d107280eba&language=en-US&page=1"
        );
        const data = await res.json();
        return data.results;
    }
)

export const fetchSeries = createAsyncThunk(
    "movies/fetchSeries",
    async () => {
        const res = await fetch(
        "https://api.themoviedb.org/3/tv/popular?api_key=274c12e6e2e4f9ca265a01d107280eba&language=en-US&page=1"
        );
        const data = await res.json();
        return data.results;
    }
)

type initialStateType = {
  list: object[]; 
  moviesCategories: object[]; 
  seriesCategories: object[]; 
  nowPlayingMovies: object[];
  upcomingMovies : object[];
  series: object[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};


const initialState: initialStateType = {
    list: [],
    moviesCategories: [],
    seriesCategories: [],
    nowPlayingMovies: [],
    upcomingMovies: [],
    series: [],
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
      .addCase(fetchMoviesCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMoviesCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.moviesCategories = action.payload;
      })
      .addCase(fetchMoviesCategories.rejected, (state, action) => {
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
      .addCase(fetchUpcomingMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUpcomingMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.upcomingMovies = action.payload;
      })
      .addCase(fetchUpcomingMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Bir hata oluştu";
      })
      .addCase(fetchSeries.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSeries.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.series = action.payload;
      })
      .addCase(fetchSeries.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Bir hata oluştu";
      })
      .addCase(fetchSeriesCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSeriesCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.seriesCategories = action.payload;
      })
      .addCase(fetchSeriesCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Bir hata oluştu";
      })
  },
})

export default moviesSlice.reducer;