import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// export const fetchMovies = createAsyncThunk(
//     "movies/fetchMovies",
//     async () => {
//         const res = await fetch(
//         "https://api.themoviedb.org/3/movie/popular?api_key=274c12e6e2e4f9ca265a01d107280eba&language=en-US&page=1"
//         );
//         const data = await res.json();
//         return data.results;
//     }
// )

// export const fetchCollection = createAsyncThunk(
//     "movies/fetchCollection",
//     async (id: number) => {
//         const res = await fetch(
//         "https://api.themoviedb.org/3/movie/" + id + "?api_key=274c12e6e2e4f9ca265a01d107280eba"
//         );
//         const data = await res.json();
//         return data;
//     }
// )
// export const fetchCollectionDetails = createAsyncThunk(
//     "movies/fetchCollectionDetails",
//     async (collectionId: number) => {
//         const res = await fetch(
//         "https://api.themoviedb.org/3/collection/" + collectionId + "?api_key=274c12e6e2e4f9ca265a01d107280eba"
//         );
//         const data = await res.json();
//         return data;
//     }
// )
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

// export const fetchSeries = createAsyncThunk(
//     "movies/fetchSeries",
//     async () => {
//         const res = await fetch(
//         "https://api.themoviedb.org/3/tv/popular?api_key=274c12e6e2e4f9ca265a01d107280eba&language=en-US&page=1"
//         );
//         const data = await res.json();
//         return data.results;
//     }
// )

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


type initialStateType = {
  list: object[]; 
  collection: object[];
  collectionDetails: object | null;
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
    collection: [],
    collectionDetails: [],
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
      // .addCase(fetchMovies.pending, (state) => {
      //   state.status = "loading";
      // })
      // .addCase(fetchMovies.fulfilled, (state, action) => {
      //   state.status = "succeeded";
      //   state.list = action.payload;
      // })
      // .addCase(fetchMovies.rejected, (state, action) => {
      //   state.status = "failed";
      //   state.error = action.error.message ?? "Bir hata oluştu";
      // })
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

      // .addCase(fetchCollection.fulfilled, (state, action) => {
      //   if (action.payload.belongs_to_collection) {
      //     const exists = state.collection.find(
      //       (c: any) => c.id === action.payload.belongs_to_collection.id
      //     );
      //     if (!exists) {
      //       state.collection.push(action.payload.belongs_to_collection);
      //     }
      //   }
      // })

      // .addCase(fetchCollectionDetails.pending, (state) => {
      //   state.status = "loading";
      // })
      // .addCase(fetchCollectionDetails.fulfilled, (state, action) => {
      //   state.status = "succeeded";
      //   state.collectionDetails = action.payload;
      // })
      // .addCase(fetchCollectionDetails.rejected, (state, action) => {
      //   state.status = "failed";
      //   state.error = action.error.message ?? "Bir hata oluştu";
      // })

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
      });
  },
})

export default moviesSlice.reducer;