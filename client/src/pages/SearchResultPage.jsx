import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Map from '../components/maps/Map';
import PropertyCard from '../components/cards/PropertyCard';
import Navbar from '../components/Navbar';
import { toast } from 'react-toastify';
import axios from "axios";

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

  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  // Fetch properties
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('/accommodation');
        const data = await response.data;
        setProperties(data);
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
        const response = await fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=20c065102b7d44bdbe501361452f21be`
        );
        const data = await response.json();
        const components = data?.results[0]?.components;
        setCity(components?.city || components?.town || components?.village || 'Unkown Location');
      } catch (err) {
        console.error('Error fetching city name:', err);
        toast.error('Failed to fetch city name');
      }
    };

    fetchCity();
  }, [lat, lng]);

  // Update filtered properties when main properties change
  useEffect(() => {
    setFilteredProperties(properties);
    setFilteredPropertiesCount(properties.length);
  }, [properties]);

  const handlePropertySelect = React.useCallback((property) => {
    requestAnimationFrame(() => {
      setSelectedProperty(property);
    });
  }, []);

  const handleFilteredPropertiesChange = React.useCallback((properties) => {
    requestAnimationFrame(() => {
      setFilteredProperties(properties);
    });
  }, []);

  const handleFilteredPropertiesCountChange = React.useCallback((count) => {
    requestAnimationFrame(() => {
      setFilteredPropertiesCount(count);
    });
  }, []);
  
  return (
    <>
      <Navbar />
      <div className="flex justify-between items-center max-w-7xl mx-auto px-4 py-2">
        <h2 className="text-xl font-semibold">
          {city} apartments for rent
          <span className="text-gray-500 ml-2 text-sm">{filteredPropertiesCount} listings found</span>
        </h2>
        <div className="flex items-center gap-4">
          <select className="border border-gray-200 rounded-md px-3 py-2">
            <option>Best Match</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
          <button
            onClick={() => setShowMap(!showMap)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-md hover:border-indigo-600 hover:text-indigo-600"
          >
            {showMap ? 'Hide Map' : 'Show Map'}
          </button>
        </div>
      </div>
      <div className="bg-gray-50">
        <main className="max-w-7xl mx-auto px-4 py-6 h-[calc(100vh-130px)]">
          <div className={`flex gap-6 h-full ${showMap ? '' : 'w-full'}`}>
            {/* Left Column: Property Cards */}
            <div
              className={`${showMap ? 'w-1/2' : 'w-full'
                } h-full overflow-y-auto border border-gray-200 rounded-md bg-white shadow-sm p-4`}
            >
              <div
                className={`grid gap-6 ${showMap ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2' : 'grid-cols-4'
                  }`}
              >
                {filteredProperties.map((property) => (
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
    </>
  );
};

export default PropertySearchPage;