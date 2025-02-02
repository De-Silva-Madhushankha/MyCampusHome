import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Heart } from "lucide-react";
import axios from "axios";

const PriceCard = ({ accommodation, setApplyModalOpen }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [isFavorite, setIsFavorite] = useState(false);

  const price = accommodation?.price || 'N/A';

  // Check if the property is in the user's favorites
  useEffect(() => {
    if (!currentUser) return;

    axios.get(`/user/favAccommodation/${currentUser._id}`)
      .then(response => {
        const favoriteAccommodations = response.data; // Array of accommodation objects
        setIsFavorite(favoriteAccommodations.some(acc => acc._id === accommodation?._id));
      })
      .catch(error => console.error("Failed to fetch favorite accommodations", error));
  }, [currentUser, accommodation?._id]);

  const handleFavoriteClick = () => {
    if (!currentUser) {
      return;
    }

    if (isFavorite) {
      axios
        .delete(`/user/${currentUser._id}/favAccommodation/${accommodation._id}`)
        .then(() => setIsFavorite(false))
        .catch((error) => console.error("Failed to remove property from favorites", error));
    } else {
      axios
        .post(`/user/${currentUser._id}/favAccommodation/${accommodation._id}`)
        .then(() => setIsFavorite(true))
        .catch((error) => console.error("Failed to add property to favorites", error));
    }
  }

  return (
    <div className="w-52 bg-white shadow-xl rounded-lg text-center z-50">
      {/* Favorite Button */}
      <div className="flex justify-center items-center pt-4 mb-4"
        onClick={() => handleFavoriteClick()}
      >
        <Heart className={`transition-colors duration-300 cursor-pointer ${isFavorite ? 'text-red-500' : 'text-gray-500 hover:text-red-500'}`} />
        <span className={`ml-2 text-sm font-medium transition-colors duration-300 ${isFavorite ? 'text-red-500' : 'text-gray-500'}`}>Save</span>
      </div>

      <hr className="border-gray-200 my-4" />

      {/* Price Section */}
      <div className="mb-6">
        <p className="text-base font-semibold text-black">Monthly Price</p>
        <p className="text-2xl font-bold text-gray-800">LKR {price}</p>
      </div>

      {/* Apply Button */}
      {currentUser ? (
        <div
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 cursor-pointer rounded-b-lg transition-colors duration-300"
          onClick={() => setApplyModalOpen(true)}
        >
          Apply
        </div>
      ) : (
        <div className="bg-gray-300 text-white font-bold py-4 cursor-not-allowed rounded-b-lg">
          Signin to Apply
        </div>
      )}
    </div>
  );
};

export default PriceCard;