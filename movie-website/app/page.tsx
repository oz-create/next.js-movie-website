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
