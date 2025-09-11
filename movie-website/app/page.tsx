"use client"

import CollectionSection from "@/components/CollectionSection";
import FirstSection from "@/components/FirstSection";
import MoviesSection from "@/components/MoviesSection";
import PaymentSection from "@/components/PaymentSection";
import SeriesSection from "@/components/SeriesSection";
import TrendsSection from "@/components/TrendsSection";
import UpcomingMoviesSection from "@/components/UpcomingMoviesSection";
import { fetchMoviesCategories, fetchNowPlayingMovies, fetchSeries, fetchUpcomingMovies, fetchSeriesCategories, fetchMoviesAndCollections } from "@/store/slices/moviesSlice";
import { AppDispatch , RootState} from "@/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { status } = useSelector((state: RootState) => state.movies);

  useEffect(() => {
    if (status === "idle") {
    //  dispatch(fetchMovies());
     dispatch(fetchMoviesCategories());
     dispatch(fetchSeriesCategories());
     dispatch(fetchNowPlayingMovies());
     dispatch(fetchUpcomingMovies());
     dispatch(fetchSeries());
     dispatch(fetchMoviesAndCollections());
    //  dispatch(fetchMovies()).then((res: any) => {
    //   res.payload.forEach((movie: any) => {
    //     dispatch(fetchCollection(movie.id)).then((detail: any) => {
    //       const belongs = detail.payload.belongs_to_collection;
    //       if (belongs) {
    //         dispatch(fetchCollectionDetails(belongs.id));
    //       }
    //     });
    //   });
    // });

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
      <PaymentSection />
      <CollectionSection />
    </div>
  )
}
