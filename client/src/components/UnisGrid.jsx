// filepath: /c:/Users/madhu/Documents/RentNearUni/client/src/components/UnisGrid.jsx
import React, { useState, useEffect } from "react";
import { FiMapPin } from "react-icons/fi";
import axios from "axios";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: 7.8731,
  lng: 80.7718,
};

const UniversityDisplay = () => {
  const [filter, setFilter] = useState("All");
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [selectedUniversity, setSelectedUniversity] = useState(null);

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
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Explore Universities</h1>
        <button
          onClick={() => setShowMap(!showMap)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center"
        >
          <FiMapPin className="mr-2" />
          {showMap ? "Hide Map" : "View on Map"}
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
            key={uni._id}
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

      {/* Map */}
      {showMap && (
        <div className="mt-6">
          <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
            <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={8}>
              {filteredUniversities.map((uni) => (
                <Marker
                  key={uni._id}
                  position={{ lat: uni.coordinates[0], lng: uni.coordinates[1] }}
                  onClick={() => setSelectedUniversity(uni)}
                />
              ))}
              {selectedUniversity && (
                <InfoWindow
                  position={{
                    lat: selectedUniversity.coordinates[0],
                    lng: selectedUniversity.coordinates[1],
                  }}
                  onCloseClick={() => setSelectedUniversity(null)}
                >
                  <div className="text-center">
                    <img
                      src={selectedUniversity.logo}
                      alt={`${selectedUniversity.name} logo`}
                      className="w-10 h-10 object-contain mb-2"
                    />
                    <h2 className="text-lg font-semibold">{selectedUniversity.name}</h2>
                    <p className="text-gray-500">{selectedUniversity.location}</p>
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          </LoadScript>
        </div>
      )}
    </div>
  );
};

export default UniversityDisplay;