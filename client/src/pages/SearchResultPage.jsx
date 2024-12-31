import React, { useState } from 'react';
import { Search } from 'lucide-react';
import Map from '../components/map/Map';
import PropertyCard from '../components/cards/PropertyCard';

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

  // Handle map bounds change
  const handleBoundsChange = (bounds) => {
    const filtered = properties.filter((property) => {
      const { lat, lng } = property.mapPosition;
      return bounds.contains([lat, lng]);
    });
    setFilteredProperties(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Search and filter controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Berlin, Germany"
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 outline-none"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-md hover:border-indigo-600 hover:text-indigo-600">
              Price
            </button>
            {/* Add more filter buttons here */}
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            Moratuwa, Molpe apartments for rent
            <span className="text-gray-500 ml-2 text-sm">36,968 listings found</span>
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

        <div className="flex flex-col lg:flex-row gap-6">
          <div className={`${showMap ? 'lg:w-1/2' : 'w-full'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6">
              {filteredProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  isSelected={selectedProperty?.id === property.id}
                />
              ))}
            </div>
          </div>

          {showMap && (
            <div
              className="lg:w-1/2 h-[calc(100vh-200px)] sticky top-6"
              style={{ minHeight: '500px' }} // Ensure a minimum height
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
  );
};

export default PropertySearchPage;