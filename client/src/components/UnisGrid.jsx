import React, { useState } from "react";
import { FiMapPin } from "react-icons/fi";

const universities = [
  {
    id: 1,
    name: "University of Colombo",
    type: "Public",
    location: "Colombo",
    logo: "/logos/uoc.png",
  },
  {
    id: 2,
    name: "University of Peradeniya",
    type: "Public",
    location: "Peradeniya",
    logo: "/logos/uop.png",
  },
  {
    id: 3,
    name: "SLIIT",
    type: "Private",
    location: "Malabe",
    logo: "/logos/sliit.png",
  },
  // Add more universities here...
];

const UniversityDisplay = () => {
  const [filter, setFilter] = useState("All");

  // Filter logic
  const filteredUniversities =
    filter === "All"
      ? universities
      : universities.filter((uni) => uni.type === filter);

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Explore Universities</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center">
          <FiMapPin className="mr-2" />
          View on Map
        </button>
      </div>

      {/* Filters */}
      <div className="flex space-x-4 mb-6">
        {["All", "Public", "Private"].map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`px-4 py-2 rounded ${
              filter === category
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* University Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredUniversities.map((uni) => (
          <div
            key={uni.id}
            className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center"
          >
            <img
              src={uni.logo}
              alt={`${uni.name} logo`}
              className="w-20 h-20 object-contain mb-4"
            />
            <h2 className="text-lg font-semibold">{uni.name}</h2>
            <p className="text-gray-500">{uni.location}</p>
            <span
              className={`mt-2 px-3 py-1 text-sm rounded ${
                uni.type === "Public"
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {uni.type}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UniversityDisplay;
