import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const Hero = () => {
  return (
    <section className="w-full py-12 px-5 mt-12 grid grid-cols-1 md:grid-cols-2 items-center gap-45 max-w-6xl mx-auto">
      <div className="space-y-4 w-full md:w-3/4">
        <span className="block mb-4 text-xs md:text-sm text-indigo-500 font-medium">
        Find Rent Relax
        </span>
        <h3 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight">
          Simplify Your Search for the Perfect Stay
        </h3>
        <p className="text-base md:text-lg text-slate-700 my-4 md:my-6">
        Discover your ideal apartment or boarding place with ease. CampusHome connects you to affordable and convenient living spaces near your university.
        </p>
        <button className="bg-indigo-500 text-white font-medium py-2 px-4 rounded transition-all hover:bg-indigo-600 active:scale-95">
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

  while (currentIndex != 0) {
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
  {
    id: 1,
    src: "./public/photo-1.avif",
  },
  {
    id: 2,
    src: "./public/photo-2.avif",
  },
  {
    id: 3,
    src: "./public/photo-3.avif",
  },
  {
    id: 4,
    src: "./public/photo-4.avif",
  },
  {
    id: 5,
    src: "./public/photo-5.avif",
  },
  {
    id: 6,
    src: "./public/photo-6.avif",
  },
  {
    id: 7,
    src: "./public/photo-7.avif",
  },
  {
    id: 8,
    src: "./public/photo-8.avif",
  },
  {
    id: 9,
    src: "./public/photo-9.avif",
  },
  {
    id: 10,
    src: "./public/photo-10.avif",
  },
  {
    id: 11,
    src: "./public/photo-11.avif",
  },
  {
    id: 12,
    src: "./public/photo-12.avif",
  },
  {
    id: 13,
    src: "./public/photo-13.avif",
  },
  {
    id: 14,
    src: "./public/photo-14.avif",
  },
  {
    id: 15,
    src: "./public/photo-15.avif",
  },
  {
    id: 16,
    src: "./public/photo-16.avif",
  },
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
    <div className="grid grid-cols-4 grid-rows-4 h-[450px] gap-1">
      {squares.map((sq) => sq)}
    </div>
  );
};

export default Hero;