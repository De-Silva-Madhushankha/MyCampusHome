import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Edit } from 'lucide-react';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';

const PropertyListing = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [accommodations, setAccommodations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      fetchAccommodations();
    }
  }, [currentUser]);

  const fetchAccommodations = () => {
    axios
      .get(`/accommodation/user/${currentUser._id}`)
      .then((response) => {
        setAccommodations(response.data);
      })
      .catch((error) => {
        console.error('Failed to fetch user accommodations', error);
      });
  };

  const togglePropertyStatus = async (propertyId, currentStatus) => {
    try {
      const newStatus = currentStatus === 'Available' ? 'Occupied' : 'Available';
      await axios.patch(`/accommodation/${propertyId}`, { status: newStatus });

      setAccommodations(prevAccommodations =>
        prevAccommodations.map(property =>
          property._id === propertyId
            ? { ...property, status: newStatus }
            : property
        )
      );
    } catch (error) {
      console.error('Failed to update property status', error);
    }
  };

  const handleEditProperty = (propertyId) => {
    navigate(`/edit-accommodation/${propertyId}`);
  };

  return (
    <div className="grid flex-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-white border border-gray-100 shadow-lg rounded-2xl p-6">
      <h2 className="col-span-3 text-xl font-bold text-gray-800">Your Accommodations</h2>
      {accommodations.length === 0 && (
        <div className="col-span-3 text-center text-gray-600">
          <p>No accommodations found</p>
        </div>
      )}
      {accommodations.map((property) => (
        <div key={property._id} className="bg-white rounded-lg shadow-md overflow-hidden relative flex flex-col">
          <img src={property.photos[0]} alt='Property Img' className="w-full h-48 object-cover" />
          <div className="p-4 flex-grow">
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
              onClick={() => togglePropertyStatus(property._id, property.status)}
              className="text-gray-500 hover:text-gray-700 p-2"
              title="Toggle Status"
            >
              {property.status === 'Available' ? (
                <ToggleOnIcon color='success' fontSize='large' />
              ) : (
                <ToggleOffIcon color='error' fontSize='large' />
              )}
            </button>

            <button
              onClick={() => handleEditProperty(property._id)}
              className="text-gray-500 hover:text-gray-700 ml-auto"
              title="Edit Property"
            >
              <Edit size={20} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PropertyListing;