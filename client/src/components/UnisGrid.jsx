import React, { useState, useEffect } from "react";
import { FiMapPin } from "react-icons/fi";
import axios from "axios";

const UniversityDisplay = () => {
  const [filter, setFilter] = useState("All");
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/universities/");
        setUniversities(Array.isArray(response.data) ? response.data : []);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchUniversities();
  }, []);

  // Filter logic
  const filteredUniversities =
    filter === "All"
      ? universities
      : universities.filter((uni) => uni.type === filter);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading universities: {error.message}</div>;

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Universities</h1>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-300 rounded-md p-2"
        >
          <option value="All">All</option>
          <option value="Public">Public</option>
          <option value="Private">Private</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(filteredUniversities) && filteredUniversities.map((uni) => (
          <div key={uni._id} className="border p-4 rounded-md shadow-md">
            <h2 className="text-xl font-semibold">{uni.name}</h2>
            <p className="text-gray-600">{uni.location}</p>
            <div className="flex items-center mt-2">
              <FiMapPin className="text-gray-500 mr-2" />
              <span>{uni.address}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UniversityDisplay;