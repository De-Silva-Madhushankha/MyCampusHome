import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Heart } from 'lucide-react';
import { Eye } from 'lucide-react';

const FavoriteAccommodations = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [accommodations, setAccommodations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      fetchFavoriteAccommodations();
    }
  }, [currentUser]);

  const fetchFavoriteAccommodations = () => {
    axios
      .get(`/user/favAccommodation/${currentUser._id}`)
      .then((response) => {
        setAccommodations(response.data);
      })
      .catch((error) => {
        console.error('Failed to fetch user favorite accommodations', error);
      });
  }

  const toggleFavoriteProperty = async (userId, propertyId) => {
    try {
      await axios.delete(`/user/${userId}/favAccommodation/${propertyId}`);
  
      // Update state to remove the property from the UI
      setAccommodations(prevAccommodations =>
        prevAccommodations.filter(property => property._id !== propertyId)
      );
    } catch (error) {
      console.error('Failed to remove property from favorites', error);
    }
  };

  const viewAccommodation = (propertyId) => {
    navigate(`/accommodation/${propertyId}`);
  }

  return (
    <div className="grid flex-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {accommodations.length === 0 && (
        <div className="col-span-3 text-center text-gray-600">
          <p>No accommodations found</p>
        </div>
      )}
      {accommodations.map((property) => (
        <div key={property._id} className="bg-white rounded-lg shadow-md overflow-hidden relative flex flex-col">
          <img src={property.photos[0]} alt='Property Img' className="w-full h-48 object-cover" />
          <div className="mt-4 px-4 flex-grow">
            <h5 className="text-lg font-bold text-gray-800">{property.title || `${property.propertyType} for Rent`}</h5>
            <p className="text-gray-600 mt-1 text-sm">{property.address + "," + property.city}</p>
            <p className="text-indigo-600 font-semibold mt-2">LKR {property.price}/month</p>
          </div>
          <div className="p-4 flex items-center">
            <span
              className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${property.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}
            >
              {property.status}
            </span>

            <button
              onClick={() => toggleFavoriteProperty(currentUser._id, property._id)}
              className="ml-auto inline-block"
              title='Remove from favorites'
            >
              <Heart size={20} fill="red" color="red" />
            </button>

            <button
              onClick={() => viewAccommodation(property._id)}
              className="ml-2 inline-block"
              title='View Accommodation'
            >
              <Eye size={20} />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default FavoriteAccommodations
