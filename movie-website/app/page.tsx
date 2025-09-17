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
