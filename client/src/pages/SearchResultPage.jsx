import React, { useState } from 'react';
import { Search, MapPin, Bed, Bath, Sliders, Heart, Info, X } from 'lucide-react';

// Map price marker component
const PriceMarker = ({ price }) => (
  <div className="relative group">
    <div className="absolute -translate-x-1/2 -translate-y-full mb-2 bg-indigo-600 text-white px-3 py-1 rounded-lg shadow-lg">
      <span className="font-semibold">€{price.toLocaleString()}</span>
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-indigo-600 rotate-45"></div>
    </div>
  </div>
);

// Map component
const Map = ({ properties, selectedProperty, onPropertySelect }) => (
  <div className="relative h-full min-h-[500px] bg-gray-100 rounded-lg overflow-hidden">
    {/* Placeholder map background */}
    <div className="absolute inset-0 bg-[url('/api/placeholder/1200/800')] bg-cover bg-center"></div>
    
    {/* Property markers */}
    {properties.map((property) => (
      <div
        key={property.id}
        className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
        style={{ 
          left: `${property.mapPosition.x}%`, 
          top: `${property.mapPosition.y}%` 
        }}
        onClick={() => onPropertySelect(property)}
      >
        <PriceMarker price={property.price} />
      </div>
    ))}
  </div>
);

const PropertyCard = ({ property, isSelected }) => (
  <div className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow ${isSelected ? 'ring-2 ring-indigo-600' : ''}`}>
    <div className="relative">
      <img src={property.image} alt={property.title} className="w-full h-48 object-cover" />
      <span className="absolute top-2 left-2 bg-indigo-600 text-white px-2 py-1 rounded text-sm">
        Virtual Tour
      </span>
    </div>
    <div className="p-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-2xl font-bold">€{property.price.toLocaleString()}</h3>
        <button className="text-gray-400 hover:text-red-500">
          <Heart size={20} />
        </button>
      </div>
      <div className="flex gap-4 text-gray-600 mb-3">
        <span className="flex items-center gap-1">
          <Bed size={16} />
          {property.beds}
        </span>
        <span className="flex items-center gap-1">
          <Bath size={16} />
          {property.baths}
        </span>
        <span className="flex items-center gap-1">
          <MapPin size={16} />
          {property.sqm} Sq M
        </span>
      </div>
      <p className="text-gray-500 text-sm mb-4">{property.address}</p>
      <div className="flex gap-2">
        <button className="flex-1 bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors">
          Instant Apply
        </button>
        <button className="p-2 border border-gray-200 rounded-md hover:bg-gray-50">
          <Info size={20} className="text-gray-400" />
        </button>
      </div>
    </div>
  </div>
);

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
      image: '/api/placeholder/400/300',
      mapPosition: { x: 30, y: 40 }
    },
    {
      id: 2,
      price: 1850,
      beds: 1,
      baths: 1.5,
      sqm: 56,
      address: 'Rathmalana Road, Moratuwa, Sri Lanka',
      image: '/api/placeholder/400/300',
      mapPosition: { x: 45, y: 55 }
    },
    {
      id: 3,
      price: 1410,
      beds: 1,
      baths: 1,
      sqm: 34,
      address: 'Galle Road, Moratuwa City Area, Sri Lanka',
      image: '/api/placeholder/400/300',
      mapPosition: { x: 60, y: 35 }
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 py-6">
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
            <FilterButton label="Price" />
            <FilterButton label="Type" />
            <FilterButton label="Beds" icon={Bed} />
            <button className="flex items-center gap-2 px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-md">
              <Sliders size={20} />
              Filters
            </button>
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
              {properties.map(property => (
                <PropertyCard 
                  key={property.id} 
                  property={property}
                  isSelected={selectedProperty?.id === property.id}
                />
              ))}
            </div>
          </div>
          
          {showMap && (
            <div className="lg:w-1/2 h-[calc(100vh-200px)] sticky top-6">
              <Map 
                properties={properties}
                selectedProperty={selectedProperty}
                onPropertySelect={setSelectedProperty}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default PropertySearchPage;