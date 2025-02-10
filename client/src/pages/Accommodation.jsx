import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import AccommodationGallery from "../components/gallery/AccommodationGallery";
import PriceCard from "../components/cards/PriceCard";
import PropertyDetails from "../components/cards/PropertyDetails";
import Footer from "../components/Footer";
import axios from "axios";
import TourDatePicker from "../components/cards/TourDatePicker";
import TourModal from "../components/TourModal";
import ApplyModal from "../components/ApplyModal";

const AccommodationPage = () => {
  const { id } = useParams();
  const [accommodation, setAccommodation] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isTourModalOpen, setTourModalOpen] = useState(false);
  const [isApplyModalOpen, setApplyModalOpen] = useState(false);
  
  const [accomodationUserId, setaccomodationUserId] = useState(null);

  useEffect(() => {
    const fetchAccommodation = async () => {
      try {
        const response = await axios.get(`/accommodation/${id}`);
        const data = response.data;
        setAccommodation(data);
        // database stored some accomodation doesn't have userId
        
        setaccomodationUserId(data.userId || "No User ID"); // Ensuring userId is set
      } catch (err) {
        console.error("Error fetching accommodation:", err);
      }
    };
    fetchAccommodation();
  }, [id]);

  useEffect(() => {
    console.log("Stored User ID:", accomodationUserId);
  }, [accomodationUserId]);

  return (
    <div className="relative">
      <Navbar />

      {/* Banner Section with Details */}
      <div className="h-[50vh] relative overflow-hidden">
        <div
          className="absolute inset-0 z-0 bg-center bg-cover blur-sm"
          style={{
            backgroundImage: `url(${accommodation?.photos?.length > 0
              ? accommodation.photos[0]
              : "https://img.freepik.com/free-photo/woman-showing-with-one-hand-mini-house-real-state-concept-ai-generative_123827-24098.jpg"
              })`,
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 z-1" />

        <div className="relative z-10 flex items-center justify-between w-full h-full p-1 mx-auto text-white max-w-7xl">
          <div className="flex flex-col items-center max-w-3xl mx-auto space-y-4 text-center">
            <h2 className="text-5xl font-bold">
              {accommodation?.title || `${accommodation?.propertyType} for Rent`}
            </h2>
            <div className="px-6 py-2 rounded-full bg-black/10">
              <p className="text-base font-semibold">
                {accommodation?.address || "Address not available"},{" "}
                {accommodation?.city || "City not available"}
              </p>
            </div>

            <div className="flex flex-row items-center justify-center space-x-4">
              <div className="px-6 py-2 rounded-full bg-black/10">
                <p className="text-sm font-semibold">
                  Available From:{" "}
                  {accommodation?.availableFrom
                    ? new Date(accommodation.availableFrom).toDateString()
                    : "Not specified"}
                </p>
              </div>
              <div className="px-6 py-2 rounded-full bg-black/10">
                <p className="text-sm font-semibold">Viewers: 16</p>
              </div>
            </div>
          </div>

          <div className="self-center">
            <PriceCard accommodation={accommodation} setApplyModalOpen={setApplyModalOpen} />
          </div>
        </div>
      </div>

      {/* Schedule Tour Section */}
      <TourDatePicker setDate={setSelectedDate} setTourModalOpen={setTourModalOpen} />

      <TourModal
  isOpen={isTourModalOpen}
  onClose={() => setTourModalOpen(false)}
  accommodation={accommodation}
  date={selectedDate}
  accomodationUserId={accomodationUserId ? accomodationUserId : "No User ID"} // Ensure a valid userId is passed
/>


      <ApplyModal
        isOpen={isApplyModalOpen}
        onClose={() => setApplyModalOpen(false)}
        accommodation={accommodation}
      />

      {/* Gallery Section */}
      <AccommodationGallery photos={accommodation?.photos} />

      {/* Property Details Section */}
      <PropertyDetails property={accommodation} />

      <Footer />
    </div>
  );
};

export default AccommodationPage;
