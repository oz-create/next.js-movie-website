import { CategoriesTypeArray, CollectionTypeArray, ListTypeArray, MovieSearchTypeArray, PeopleTypeArray, SeriesType } from "@/types/type";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const fetchMoviesAndCollections = createAsyncThunk(
  "movies/fetchMoviesAndCollections",
  async (_, { dispatch }) => {
    // 1. Popüler filmleri çek
    const res = await fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=274c12e6e2e4f9ca265a01d107280eba&language=en-US&page=1"
    );
    const data = await res.json();
    const movies = data.results;

    // 2. Movie detaylarından collection id'lerini topla
    const collectionIds = new Set<number>();

    await Promise.all(
      movies.map(async (m: { id: number }) => {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${m.id}?api_key=274c12e6e2e4f9ca265a01d107280eba`
        );
        const detail = await res.json();
        if (detail.belongs_to_collection) {
          collectionIds.add(detail.belongs_to_collection.id);
        }
      })
    );

    // 3. Collection id'leri ile detayları çek
    const collections = await Promise.all(
      Array.from(collectionIds).map(async (id) => {
        const res = await fetch(
          `https://api.themoviedb.org/3/collection/${id}?api_key=274c12e6e2e4f9ca265a01d107280eba&language=en-US`
        );
        return res.json();
      })
    );

    return { movies, collections };
  }
);

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

export const fetchSeriesAndSeasons = createAsyncThunk(
  "movies/fetchSeriesAndSeasons",
  async () => {
    // 1. Popüler dizileri çek
    const res = await fetch(
      "https://api.themoviedb.org/3/tv/popular?api_key=274c12e6e2e4f9ca265a01d107280eba&language=en-US&page=1"
    );
    const data = await res.json();
    const series = data.results;

    // 2. Dizilerin detaylarını çekip seasons bilgilerini al
    const seriesWithSeasons = await Promise.all(
      series.map(async (s: { id: number }) => {
        const res = await fetch(
          `https://api.themoviedb.org/3/tv/${s.id}?api_key=274c12e6e2e4f9ca265a01d107280eba&language=en-US`
        );
        const detail = await res.json();
        return {
          ...s,
          seasons: detail.seasons, // dizinin tüm sezonları burada
          number_of_seasons: detail.number_of_seasons,
          number_of_episodes: detail.number_of_episodes,
        };
      })
    );

    return { series: seriesWithSeasons };
  }
);

export const fetchCharactors = createAsyncThunk(
    "movies/fetchCharactors",
    async () => {
        const res = await fetch(
        "https://api.themoviedb.org/3/person/popular?api_key=274c12e6e2e4f9ca265a01d107280eba&language=en-US&page=1"
        );
        const data = await res.json();
        return data.results;
    }
)

export const fetchTopRatedSeries = createAsyncThunk(
    "movies/fetchTopRatedSeries",
    async () => {
        const res = await fetch(
        "https://api.themoviedb.org/3/tv/top_rated?api_key=274c12e6e2e4f9ca265a01d107280eba&language=en-US&page=1"
        );
        const data = await res.json();
        return data.results;
    }
)
export const fetchMovieSearch = createAsyncThunk(
    "movies/fetchMovieSearch",
    async () => {
        const res = await fetch(
        "https://api.themoviedb.org/3/search/movie?api_key=274c12e6e2e4f9ca265a01d107280eba&language=en-US&page=1&query=avatar"
        );
        const data = await res.json();
        return data.results;
    }
)

type initialStateType = {
  list: ListTypeArray; 
  collection: CollectionTypeArray;
  collectionDetails: object | null;
  moviesCategories: CategoriesTypeArray; 
  seriesCategories: CategoriesTypeArray; 
  nowPlayingMovies: ListTypeArray;
  upcomingMovies : ListTypeArray;
  people : PeopleTypeArray;
  series: SeriesType[];
  movieSearch: MovieSearchTypeArray;
  topRatedSeries: ListTypeArray;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};


const initialState: initialStateType = {
    list: [],
    collection: [],
    collectionDetails: [],
    moviesCategories: [],
    seriesCategories: [],
    nowPlayingMovies: [],
    upcomingMovies: [],
    series: [],
    people: [],
    topRatedSeries: [],
    movieSearch: [],
    status: "idle",
    error: null,
}


const moviesSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
    builder
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
      .addCase(fetchSeriesAndSeasons.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSeriesAndSeasons.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.series = action.payload.series;
      })
      .addCase(fetchSeriesAndSeasons.rejected, (state, action) => {
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
        .addCase(fetchMoviesAndCollections.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMoviesAndCollections.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload.movies;        // sadece filmler
        state.collection = action.payload.collections; // sadece collection verileri
      })
      .addCase(fetchMoviesAndCollections.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Bir hata oluştu";
      })
      .addCase(fetchCharactors.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCharactors.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.people = action.payload;
      })
      .addCase(fetchCharactors.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Bir hata oluştu";
      })
      .addCase(fetchTopRatedSeries.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTopRatedSeries.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.topRatedSeries = action.payload;
      })
      .addCase(fetchTopRatedSeries.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Bir hata oluştu";
      })
      .addCase(fetchMovieSearch.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovieSearch.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movieSearch = action.payload;
      })
      .addCase(fetchMovieSearch.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Bir hata oluştu";
      })
  },
})

export default moviesSlice.reducer;