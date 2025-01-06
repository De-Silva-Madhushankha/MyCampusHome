import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Map from '../components/maps/Map';
import PropertyCard from '../components/cards/PropertyCard';
import Navbar from '../components/Navbar';
import { toast } from 'react-toastify';

const FilterButton = ({ label, icon: Icon }) => (
  <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-md hover:border-indigo-600 hover:text-indigo-600">
    {Icon && <Icon size={20} />}
    {label}
    <span className="ml-1">▼</span>
  </button>
);

const PropertySearchPage = () => {
  const [showMap, setShowMap] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [properties] = useState([
    {
      id: 1,
      price: 1255,
      beds: 5,
      baths: 2,
      sqm: 183,
      address: 'Bandaranayake Mawatha, Moratuwa University Area, Sri Lanka',
      image: "https://st2.depositphotos.com/1015412/8130/i/450/depositphotos_81301130-stock-photo-new-apartment-complex-in-suburban.jpg",
      mapPosition: { lat: 6.7941, lng: 79.9000 }
    },
    {
      id: 2,
      price: 1850,
      beds: 1,
      baths: 1.5,
      sqm: 56,
      address: 'Rathmalana Road, Moratuwa, Sri Lanka',
      image: "https://st2.depositphotos.com/1015412/8130/i/450/depositphotos_81301130-stock-photo-new-apartment-complex-in-suburban.jpg",
      mapPosition: { lat: 6.7951, lng: 79.9009 }
    },
    {
      id: 3,
      price: 1410,
      beds: 1,
      baths: 1,
      sqm: 34,
      address: 'Galle Road, Moratuwa City Area, Sri Lanka',
      image: "https://st2.depositphotos.com/1015412/8130/i/450/depositphotos_81301130-stock-photo-new-apartment-complex-in-suburban.jpg",
      mapPosition: { lat: 6.7960, lng: 79.9018 }
    },
    {
      id: 4,
      price: 2100,
      beds: 3,
      baths: 2.5,
      sqm: 120,
      address: 'Angulana Station Road, Moratuwa, Sri Lanka',
      image: "https://st2.depositphotos.com/1015412/8130/i/450/depositphotos_81301130-stock-photo-new-apartment-complex-in-suburban.jpg",
      mapPosition: { lat: 6.7955, lng: 79.8995 }
    },
    {
      id: 5,
      price: 950,
      beds: 2,
      baths: 1,
      sqm: 80,
      address: 'Rawathawatte, Moratuwa, Sri Lanka',
      image: "https://st2.depositphotos.com/1015412/8130/i/450/depositphotos_81301130-stock-photo-new-apartment-complex-in-suburban.jpg",
      mapPosition: { lat: 6.7948, lng: 79.9020 }
    }
  ]);
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [filteredPropertiesCount, setFilteredPropertiesCount] = useState(0);
  const [city, setCity] = useState('');
  const [searchParams] = useSearchParams();
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

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

  // Handle map bounds change
  const handleBoundsChange = (bounds) => {
    const filtered = properties.filter((property) => {
      const { lat, lng } = property.mapPosition;
      return bounds.contains([lat, lng]);
    });
    setFilteredProperties(filtered);
    setFilteredPropertiesCount(filtered.length);
  };

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
                    key={property.id}
                    property={property}
                    isSelected={selectedProperty?.id === property.id}
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
                  onPropertySelect={setSelectedProperty}
                  onBoundsChange={handleBoundsChange}
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