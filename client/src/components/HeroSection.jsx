import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  const handleFindPlaceClick = () => {
    window.scrollBy({
      top: 600,
      behavior: "smooth",
    });
  };

  return (
    <section className="grid items-center w-full max-w-6xl grid-cols-1 px-5 mx-auto md:grid-cols-2 gap-45">
      <div className="w-full space-y-4 md:w-3/4">
        <span className="block mb-4 text-xs font-medium text-indigo-500 md:text-sm">
          Find Rent Relax
        </span>
        <h3 className="text-4xl font-semibold leading-tight md:text-5xl lg:text-6xl">
          Simplify Your Search for the Perfect Stay
        </h3>
        <p className="my-4 text-base md:text-lg text-slate-700 md:my-6">
          Discover your ideal apartment or boarding place with ease. CampusHome connects you to affordable and convenient living spaces near your university.
        </p>
        <button
          onClick={handleFindPlaceClick}
          className="px-4 py-2 font-medium text-white transition-all bg-indigo-500 rounded hover:bg-indigo-600 active:scale-95"
        >
          Find a place
        </button>
      </div>
      <ShuffleGrid />
    </section>
  );
};

const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const squareData = [
  { id: 1, src: "/photo-1.avif" },
  { id: 2, src: "/photo-2.avif" },
  { id: 3, src: "/photo-3.avif" },
  { id: 4, src: "/photo-4.avif" },
  { id: 5, src: "/photo-5.avif" },
  { id: 6, src: "/photo-6.avif" },
  { id: 7, src: "/photo-7.avif" },
  { id: 8, src: "/photo-8.avif" },
  { id: 9, src: "/photo-9.avif" },
  { id: 10, src: "/photo-10.avif" },
  { id: 11, src: "/photo-11.avif" },
  { id: 12, src: "/photo-12.avif" },
  { id: 13, src: "/photo-13.avif" },
  { id: 14, src: "/photo-14.avif" },
  { id: 15, src: "/photo-15.avif" },
  { id: 16, src: "/photo-16.avif" },
];

const generateSquares = () => {
  return shuffle(squareData).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      className="w-full h-full"
      style={{
        backgroundImage: `url(${sq.src})`,
        backgroundSize: "cover",
      }}
    ></motion.div>
  ));
};

const ShuffleGrid = () => {
  const timeoutRef = useRef(null);
  const [squares, setSquares] = useState(generateSquares());

  useEffect(() => {
    shuffleSquares();

    return () => clearTimeout(timeoutRef.current);
  }, []);

  const shuffleSquares = () => {
    setSquares(generateSquares());

    timeoutRef.current = setTimeout(shuffleSquares, 3000);
  };

  return (
    <div className="grid grid-cols-4 grid-rows-4 h-[450px] gap-1 mt-16">
      {squares.map((sq) => sq)}
    </div>
  );
};

export default Hero;
