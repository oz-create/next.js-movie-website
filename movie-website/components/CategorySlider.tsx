import React, { useRef, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";

export default function CategorySlider({ data }: { data: any }) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [scrollX, setScrollX] = useState(0);

  const scrollAmount = 200; // her ok basışında kayacak px miktarı

  const handleScroll = (direction: "left" | "right") => {
    if (!sliderRef.current) return;

    const newScroll =
      direction === "left" ? scrollX - scrollAmount : scrollX + scrollAmount;

    sliderRef.current.scrollTo({
      left: newScroll,
      behavior: "smooth",
    });

    setScrollX(newScroll);
    console.log(scrollX)
  };

  return (
    <div className="relative w-full flex items-center">
      {/* Sol ok */}
      <button
        onClick={() => handleScroll("left")}
        className="absolute left-0 z-10 p-2 disabled:opacity-40 cursor-pointer"
        disabled={scrollX <= 0}
      >
        <FaChevronLeft className="w-5 h-5 text-[var(--color-primary)]" /> 
      </button>

      {/* Slider alanı */}
      <div
        ref={sliderRef}
        className="flex gap-2 overflow-hidden scroll-smooth w-full mx-14"
      >
        {data.map((category: { id: number; name: string }) => (
          <div
            key={category.id}
            className="py-3 px-5 bg-transparent border border-[var(--primary-blue)] rounded-full cursor-pointer text-[var(--color-primary)] text-sm flex-shrink-0 hover:bg-[var(--primary-blue)] transition"
          >
            {category.name}
          </div>
        ))}
      </div>

      {/* Sağ ok */}
      <button
        onClick={() => handleScroll("right")}
        className="absolute right-0 z-10 p-2 cursor-pointer" 
      >
        <FaChevronRight className="w-5 h-5 text-[var(--color-primary)]" /> 
      </button>
    </div>
  );
}
