"use client"

import CharactorsSection from "@/components/CharactorsSection";
import CollectionSection from "@/components/CollectionSection";
import FirstSection from "@/components/FirstSection";
import MoviesSection from "@/components/MoviesSection";
import PaymentSection from "@/components/PaymentSection";
import SeriesSection from "@/components/SeriesSection";
import TopRatedSeries from "@/components/TopRatedSeries";
import TrendsSection from "@/components/TrendsSection";
import UpcomingMoviesSection from "@/components/UpcomingMoviesSection";
import { fetchMoviesCategories, fetchNowPlayingMovies, fetchUpcomingMovies, fetchSeriesCategories, fetchMoviesAndCollections, fetchSeriesAndSeasons, fetchCharactors, fetchTopRatedSeries } from "@/store/slices/moviesSlice";
import { AppDispatch , RootState} from "@/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
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

  if (status === "loading") return <p>Yükleniyor...</p>;
  if (status === "failed") return <p>Hata!</p>;



  return (
    <div>
      <FirstSection />
      <TrendsSection />
      <MoviesSection />
      <UpcomingMoviesSection />
      <SeriesSection />
      <TopRatedSeries />
      <PaymentSection />
      <CollectionSection />
      <CharactorsSection />
    </div>
  )
}
