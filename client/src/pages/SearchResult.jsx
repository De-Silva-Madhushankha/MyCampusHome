import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import Map from '../components/maps/Map';
import PropertyCard from '../components/cards/PropertyCard';
import Navbar from '../components/Navbar';
import { toast } from 'react-toastify';
import axios from "axios";
import Footer from '../components/Footer';

const FilterButton = ({ label, icon: Icon }) => (
  <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-md hover:border-indigo-600 hover:text-indigo-600">
    {Icon && <Icon size={20} />}
    {label}
    <span className="ml-1">▼</span>
  </button>
);

const PropertySearchPage = () => {
  const [searchParams] = useSearchParams();
  const [showMap, setShowMap] = useState(true);
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [filteredPropertiesCount, setFilteredPropertiesCount] = useState(0);
  const [city, setCity] = useState('');
  const [sortOption, setSortOption] = useState('Best Match');

  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  // Fetch properties
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('/accommodation');
        const data = response.data;
        if (Array.isArray(data)) {
          setProperties(data);
        } else {
          console.error('API response is not an array:', data);
          toast.error('Unexpected API response');
        }
      } catch (err) {
        console.error('Error fetching properties:', err);
        toast.error('Failed to fetch properties');
      }
    };
    fetchProperties();
  }, []);

  useEffect(() => {
    const fetchCity = async () => {
      try {
        const response = await axios.get(
          `https://api.opencagedata.com/geocode/v1/json`, {
          params: {
            q: `${lat}+${lng}`,
            key: import.meta.env.VITE_OPENCAGE_API_KEY, // Use the key from .env
          }
        });

        const data = response.data;
        const components = data?.results[0]?.components;
        setCity(components?.city || components?.town || components?.village || 'Unknown Location');
      } catch (err) {
        console.error('Error fetching city name:', err);
        toast.error('Failed to fetch city name');
      }
    };
    fetchCity();
  }, [lat, lng]);

  useEffect(() => {
    const sortedProperties = [...filteredProperties];

    if (sortOption === 'Price: Low to High') {
      sortedProperties.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'Price: High to Low') {
      sortedProperties.sort((a, b) => b.price - a.price);
    }

    setFilteredProperties(sortedProperties);
    setFilteredPropertiesCount(sortedProperties.length);
  }, [properties, sortOption]);

  // Update filtered properties when main properties change
  useEffect(() => {
    setFilteredProperties(properties);
    setFilteredPropertiesCount(properties.length);
  }, [properties]);

  const handlePropertySelect = useCallback((property) => {
    requestAnimationFrame(() => {
      setSelectedProperty(property);
    });
  }, []);

  const handleFilteredPropertiesChange = useCallback((properties) => {
    requestAnimationFrame(() => {
      setFilteredProperties(properties);
    });
  }, []);

  const handleFilteredPropertiesCountChange = useCallback((count) => {
    requestAnimationFrame(() => {
      setFilteredPropertiesCount(count);
    });
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-between px-4 mt-8 py-3 mx-auto max-w-7xl">
        <h2 className="text-2xl font-semibold">
          {city} apartments for rent
          <span className="ml-2 text-sm text-gray-700">{filteredPropertiesCount} listings found</span>
        </h2>
        <div className="flex items-center gap-4">
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="flex items-center px-3 py-2 border border-gray-200 rounded-md hover:border-indigo-600 "
          >
            <option>Best Match</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
          <button
            onClick={() => setShowMap(!showMap)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-md hover:cursor-pointer hover:border-indigo-600"
          >
            {showMap ? 'Hide Map' : 'Show Map'}
          </button>
        </div>
      </div>
      <div>
        <main className="max-w-7xl mx-auto mb-8 px-4 py-4 h-[calc(100vh-130px)]">
          <div className={`flex gap-6 h-full ${showMap ? '' : 'w-full'}`}>
            {/* Left Column: Property Cards */}
            <div
              className={`${showMap ? 'w-1/2' : 'w-full'
                } h-full overflow-y-auto border border-gray-100 rounded-2xl bg-white shadow-lg p-4`}
            >
              <div
                className={`grid gap-6 ${showMap ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2' : 'grid-cols-4'
                  }`}
              >
                {Array.isArray(filteredProperties) && filteredProperties.map((property) => (
                  <PropertyCard
                    key={property._id}
                    property={property}
                    isSelected={selectedProperty?._id === property._id}
                  />
                ))}

              </div>
            </div>

            {/* Right Column: Map */}
            {showMap && (
              <div
                className="w-1/2 h-full sticky top-[80px] border border-gray-200 rounded-md bg-white shadow-sm"
                style={{ minHeight: '500px' }}
              >
                <Map
                  properties={properties}
                  selectedProperty={selectedProperty}
                  onPropertySelect={handlePropertySelect}
                  setFilteredProperties={handleFilteredPropertiesChange}
                  setFilteredPropertiesCount={handleFilteredPropertiesCountChange}
                />
              </div>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default PropertySearchPage;