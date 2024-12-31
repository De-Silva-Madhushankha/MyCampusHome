import React from 'react';
import { MapPin, Bed, Bath, Heart, Info } from 'lucide-react';

const PropertyCard = ({ property, isSelected }) => (
    <div
        className={`relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow ${
            isSelected ? 'ring-2 ring-indigo-600' : ''
        }`}
    >
        <div className="relative">
            <img
                src={property.image}
                alt={property.title}
                className="w-full h-48 object-cover"
            />
            <span className="absolute top-2 left-2 bg-indigo-600 text-white px-2 py-1 rounded text-sm">
                Virtual Tour
            </span>
        </div>
        <div className="p-4 pb-16"> {/* Add padding to the bottom to make space for the fixed button */}
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
        </div>
        <div className="absolute bottom-0 left-0 w-full p-4 bg-white">
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

export default PropertyCard;
