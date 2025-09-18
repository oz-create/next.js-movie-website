"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { 
  fetchMoviesCategories,
  fetchSeriesCategories,
  fetchCharactors,
  fetchNowPlayingMovies,
  fetchUpcomingMovies,
  fetchSeriesAndSeasons,
  fetchMoviesAndCollections,
  fetchTopRatedSeries
} from "@/store/slices/moviesSlice";

export default function GlobalInitializer() {
  const dispatch = useDispatch<AppDispatch>();
  const { status } = useSelector((state: RootState) => state.movies);

  useEffect(() => {
    if (status === "idle") {
        dispatch(fetchMoviesCategories());
        dispatch(fetchSeriesCategories());
        dispatch(fetchNowPlayingMovies());
        dispatch(fetchUpcomingMovies());
        dispatch(fetchSeriesAndSeasons());
        dispatch(fetchMoviesAndCollections());
        dispatch(fetchCharactors());
        dispatch(fetchTopRatedSeries());
    }
  }, [status, dispatch]);

  return null;
}
