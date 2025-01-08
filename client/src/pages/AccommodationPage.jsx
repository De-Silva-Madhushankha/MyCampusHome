import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Grid } from "@mui/material";
import Navbar from "../components/Navbar";
import AccommodationGallery from "../components/gallery/AccommodationGallery";
import PriceCard from "../components/cards/PriceCard";
import HouseDetails from "../components/cards/HouseDetails";
import Footer from "../components/Footer";

import axios from "axios";

const AccommodationPage = () => {
  const { id } = useParams();
  const [accommodation, setAccommodation] = useState(null);

  useEffect(() => {
    const fetchAccommodation = async () => {
      try {
        const response = await axios.get(`/accommodation/${id}`);
        const data = await response.data;
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
      <Box className="h-[50vh] relative overflow-hidden">

        <Box
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              accommodation?.photos?.length > 0
                ? `url(${accommodation.photos[0]})`
                : "url(https://img.freepik.com/free-photo/woman-showing-with-one-hand-mini-house-real-state-concept-ai-generative_123827-24098.jpg)",
            filter: "blur(5px)", // Blur the background
            zIndex: 0,
          }}
        />

        {/* Overlay Layer for Text Contrast */}
        <Box
          className="absolute inset-0 bg-black bg-opacity-30"
          style={{
            zIndex: 1,
          }}
        />

        {/* Content Layer - Text and Details */}
        <Box className="relative z-10 p-5 flex flex-col justify-center items-center h-full text-white text-center">
          <Grid container>
            {/* Left Column */}
            <Grid item xs={12} md={8}>
              <Typography
                variant="h2"
                className="font-black mb-4"
                style={{ fontWeight: "700" }}
              >
                The Bell Farm Eco Resort
              </Typography>

              <div className="flex flex-col space-y-4">
                <div className="inline-flex justify-center">
                  <span
                    className="rounded-full px-4 py-2 whitespace-nowrap"
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.1)",
                      width: "fit-content",
                    }}
                  >
                    <Typography variant="subtitle1" className="font-bold">
                      No.8A, Bellanneoya
                    </Typography>
                  </span>
                </div>

                <div className="flex space-x-4 justify-center">
                  <span
                    className="rounded-full px-4 py-2 whitespace-nowrap"
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.1)",
                      width: "fit-content",
                    }}
                  >
                    <Typography variant="subtitle2" className="font-bold">
                      Listed: 04/25/23
                    </Typography>
                  </span>

                  <span
                    className="rounded-full px-4 py-2 whitespace-nowrap"
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.1)",
                      width: "fit-content",
                    }}
                  >
                    <Typography variant="subtitle2" className="font-bold">
                      Viewers: 120
                    </Typography>
                  </span>
                </div>
              </div>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Price Card positioned fixed */}
      <PriceCard price={2500} onApply={handleApply} />

      {/* Gallery Section */}
      <AccommodationGallery />

      {/* House Details Section */}
      <HouseDetails />

      <Footer />
    </div>
  );
};

export default AccommodationPage;
