"use client"

import FirstSection from "@/components/FirstSection";
import { fetchMovies } from "@/store/moviesSlice";
import { AppDispatch , RootState} from "@/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { list, status } = useSelector((state: RootState) => state.movies);

  useEffect(() => {
    if (status === "idle") {
     dispatch(fetchMovies());
    }
  }, [status, dispatch]);

  if (status === "loading") return <p>Yükleniyor...</p>;
  if (status === "failed") return <p>Hata!</p>;

  return (
    <div>
      <FirstSection />
    </div>
  );
}
