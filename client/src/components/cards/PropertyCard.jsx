import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux";
import { MapPin, Bed, Bath, Heart, Info, X, Clock } from 'lucide-react';
import axios from 'axios';

const PropertyCard = ({ property, isSelected }) => {
    const { currentUser } = useSelector((state) => state.user);
    const [showDetails, setShowDetails] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);

    const navigate = useNavigate()

    // Check if the property is in the user's favorites
    useEffect(() => {
        if (!currentUser) return;

        axios.get(`/user/favAccommodation/${currentUser._id}`)
            .then(response => {
                const favoriteAccommodations = response.data; // Array of accommodation objects
                setIsFavorite(favoriteAccommodations.some(acc => acc._id === property._id));
            })
            .catch(error => console.error("Failed to fetch favorite accommodations", error));
    }, []);

    const handleFavoriteClick = () => {
        if (!currentUser) {
            return;
        }

        if (isFavorite) {
            axios
                .delete(`/user/${currentUser._id}/favAccommodation/${property._id}`)
                .then(() => setIsFavorite(false))
                .catch((error) => console.error("Failed to remove property from favorites", error));
        } else {
            axios
                .post(`/user/${currentUser._id}/favAccommodation/${property._id}`)
                .then(() => setIsFavorite(true))
                .catch((error) => console.error("Failed to add property to favorites", error));
        }
    }

    const handleClick = () => {
        navigate(`/accommodation/${property._id}`) //Navigate to the related apartment page
    }

    const MainView = () => (
        <>
            <div className="relative">
                <img src={property.photos[0]} alt={property._id} className="w-full h-48 object-cover" />
                <span className="absolute top-2 left-2 bg-indigo-600 text-white px-2 py-1 rounded text-sm">
                    Virtual Tour
                </span>
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-2xl font-bold">LKR {property.price?.toLocaleString()}</h3>
                    <button className="text-gray-400 hover:text-red-500"
                        onClick={handleFavoriteClick}>
                        <Heart className={`transition-colors duration-300 cursor-pointer ${isFavorite ? 'text-red-500' : 'text-gray-500 hover:text-red-500'}`} />
                    </button>
                </div>
                <div className="flex gap-4 text-gray-600 mb-3">
                    <span className="flex items-center gap-1">
                        <Bed size={16} />
                        {property.beds}
                    </span>
                    <span className="flex items-center gap-1">
                        <Bath size={16} />
                        {property.bathrooms}
                    </span>
                    <span className="flex items-center gap-1">
                        <MapPin size={16} />
                        {property.area} Sqft
                    </span>
                </div>
                <p className="text-gray-500 text-sm mb-4 flex-grow">{property.address}</p>
                <div className="flex gap-2 mt-auto">
                    <button
                        className="flex-1 bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors"
                        onClick={handleClick}
                    >
                        Instant Apply
                    </button>
                    <button
                        className="p-2 border border-gray-200 rounded-md hover:bg-gray-50"
                        onClick={() => setShowDetails(true)}
                    >
                        <Info size={20} className="text-gray-400" />
                    </button>
                </div>
            </div>
        </>
    );

    const DetailsView = () => (
        <div className="p-4 h-full flex flex-col">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-2xl font-bold">LKR {property.price?.toLocaleString()}</h3>
            </div>

            <span className="text-black text-sm font-bold mb-2 block">
                Availablity: <span className={property.status === 'Occupied' ? 'text-red-500' : 'text-green-500'}>{property.status}</span>
            </span>

            <div className="flex items-center text-gray-500 mb-1 text-xs">
                <Clock size={14} className="mr-1" />
                <span>{new Date(property.availableFrom).toLocaleDateString()}</span>
            </div>

            <div className="flex items-center text-gray-500 mb-2 text-xs">
                <MapPin size={14} className="mr-1" />
                <span>{property.address}</span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 mb-4 scrollbar-thin">
                {/* Amenities */}
                <div className="flex flex-wrap gap-2">
                    {property.amenities.map((amenity) => (
                        <span
                            key={amenity}
                            className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700"
                        >
                            {amenity}
                        </span>
                    ))}
                </div>

                {/* Description with Toggle */}
                <p className="text-gray-700 leading-relaxed">
                    {property.description || "No description available"}
                </p>
            </div>

            {/* Fixed Buttons */}
            <div className="flex gap-2 border-t pt-4">
                <button
                    className="flex-1 bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors"
                    onClick={handleClick}
                >
                    View more details
                </button>
                <button
                    className="p-2 border border-gray-200 rounded-md hover:bg-gray-50"
                    onClick={() => setShowDetails(false)}
                >
                    <X size={20} className="text-gray-400" />
                </button>
            </div>
        </div>
    );

    return (
        <div
            className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow ${isSelected ? 'ring-2 ring-indigo-600' : ''
                }`}
            style={{ height: '400px' }}
        >
            <div className="h-full flex flex-col">
                {showDetails ? <DetailsView /> : <MainView />}
            </div>
        </div>
    );
};

export default PropertyCard;
