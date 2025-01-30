import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import AccommodationGallery from "../components/gallery/AccommodationGallery";
import PriceCard from "../components/cards/PriceCard";
import PropertyDetails from "../components/cards/PropertyDetails";
import Footer from "../components/Footer";
import axios from "axios";

const AccommodationPage = () => {
  const { id } = useParams();
  const [accommodation, setAccommodation] = useState(null);

  useEffect(() => {
    const fetchAccommodation = async () => {
      try {
        const response = await axios.get(`/accommodation/${id}`);
        const data = response.data;
        setAccommodation(data);
      } catch (err) {
        console.error("Error fetching accommodation:", err);
      }
    };
    fetchAccommodation();
  }, [id]);

  const handleApply = () => {
    // Handle the apply button click
  };

  return (
    <div className="relative">
      <Navbar />
      {/* Banner Section with Details */}
      <div className="h-[50vh] relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center blur-sm z-0"
          style={{
            backgroundImage: `url(${accommodation?.photos?.length > 0
              ? accommodation.photos[0]
              : "https://img.freepik.com/free-photo/woman-showing-with-one-hand-mini-house-real-state-concept-ai-generative_123827-24098.jpg"
              })`,
          }}
        />
        {/* Overlay Layer for Text Contrast */}
        <div className="absolute inset-0 bg-black bg-opacity-30 z-1" />

        <div className="relative z-10 p-5 flex h-full justify-center items-center  text-white text-center">
          <div className="w-full flex flex-col items-center space-y-4">
            <h2 className="text-5xl font-bold">
              {accommodation?.title || `${accommodation?.propertyType} for Rent`}
            </h2>

            <div className="flex flex-col items-center space-y-3">
              {/* Address */}
              <div className="bg-black/10 rounded-full px-6 py-2">
                <p className="text-base font-semibold">
                  {accommodation?.address || "Address not available"},{" "}
                  {accommodation?.city || "City not available"}
                </p>
              </div>

              {/* Listed Date and Viewers */}
              <div className="flex flex-row justify-center space-x-4">
                {/* Available From */}
                <div className="bg-black/10 rounded-full px-6 py-2">
                  <p className="text-sm font-semibold">
                    Available From:{" "}
                    {accommodation?.availableFrom
                      ? new Date(accommodation.availableFrom).toDateString()
                      : "Not specified"}
                  </p>
                </div>

                {/* Viewers */}
                <div className="bg-black/10 rounded-full px-6 py-2">
                  <p className="text-sm font-semibold">Viewers: 16</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Price Card positioned fixed */}
      <PriceCard price={accommodation?.price || "Not specified"} onApply={handleApply} />

      {/* Gallery Section */}
      <AccommodationGallery photos={accommodation?.photos} />

      {/* Property Details Section */}
      <PropertyDetails property={accommodation} />

      <Footer />
    </div>
  );
};

export default AccommodationPage;