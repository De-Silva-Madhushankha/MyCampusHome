import React from "react";
import { useSelector } from "react-redux";
import { Heart } from "lucide-react";

const PriceCard = ({ price, setApplyModalOpen }) => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="w-52 bg-white shadow-xl rounded-lg text-center z-50">
      {/* Save Section */}
      <div className="flex justify-center items-center pt-4 mb-4">
        <Heart className="text-gray-500 hover:text-red-500 transition-colors duration-300" />
        <span className="ml-2 text-sm font-medium text-gray-500">Save</span>
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