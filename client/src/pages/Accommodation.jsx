import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Stack } from "@mui/material";
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
    <Box component="div" className="relative">
      <Navbar />
      {/* Banner Section with Details */}
      <Box component="div" className="h-[50vh] relative overflow-hidden">
        <Box
          component="div"
          className="absolute inset-0 bg-cover bg-center"
          sx={{
            backgroundImage: accommodation?.photos?.length > 0
              ? `url(${accommodation.photos[0]})`
              : "url(https://img.freepik.com/free-photo/woman-showing-with-one-hand-mini-house-real-state-concept-ai-generative_123827-24098.jpg)",
            filter: "blur(5px)",
            zIndex: 0,
          }}
        />

        {/* Overlay Layer for Text Contrast */}
        <Box
          component="div"
          className="absolute inset-0 bg-black bg-opacity-30"
          sx={{ zIndex: 1 }}
        />

        {/* Content Layer - Text and Details */}
        <Box
          component="div"
          className="relative z-10 p-5 flex justify-center h-full text-white text-center"
        >
          <Stack
            spacing={2}
            alignItems="center"
            justifyContent="center"
            sx={{ width: '100%' }}
          >
            <Typography
              variant="h2"
              className="font-black"
              sx={{ fontWeight: 600 }}
            >
              {accommodation?.name || "The Bell Farm Eco Resort"}
            </Typography>

            <Stack spacing={1} alignItems="center">
              {/* Address */}
              <Box
                component="div"
                sx={{
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                  borderRadius: '9999px',
                  px: 4,
                  py: 2,
                  width: 'fit-content'
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  {accommodation?.address || "Address not available"}, {accommodation?.city || "City not available"}
                </Typography>
              </Box>

              {/* Listed Date and Viewers */}
              <Stack direction="row" spacing={2} justifyContent="center">
                <Box
                  component="div"
                  sx={{
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                    borderRadius: '9999px',
                    px: 4,
                    py: 2,
                    width: 'fit-content'
                  }}
                >
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    Available From: {accommodation?.availableFrom
                      ? new Date(accommodation.availableFrom).toDateString()
                      : "Not specified"}
                  </Typography>
                </Box>

                <Box
                  component="div"
                  sx={{
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                    borderRadius: '9999px',
                    px: 4,
                    py: 2,
                    width: 'fit-content'
                  }}
                >
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    Viewers: 16
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Box>

      {/* Price Card positioned fixed */}
      <PriceCard price={accommodation?.price || 2500} onApply={handleApply} />

      {/* Gallery Section */}
      <AccommodationGallery photos={accommodation?.photos} />

      {/* Property Details Section */}
      <PropertyDetails property={accommodation} />

      <Footer />
    </Box>
  );
};

export default AccommodationPage;