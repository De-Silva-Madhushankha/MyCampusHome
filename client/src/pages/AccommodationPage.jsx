import React from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Grid2 as Grid } from "@mui/material";
import Navbar from "../components/Navbar";
import AccommodationGallery from "../components/gallery/AccommodationGallery";
import PriceCard from "../components/cards/PriceCard";
import HouseDetails from "../components/cards/HouseDetails ";
import Footer from "../components/Footer";

const AccommodationPage = () => {
  const { } = useParams();

  const handleApply = () => {
    // Handle the apply button click
  }

  return (
    <div className="relative">
      <Navbar />
      {/* Banner Section with Details */}
      <Box
        className="h-[50vh] bg-cover bg-center relative flex flex-col justify-center items-center text-white text-center"
        style={{
          backgroundImage:
            "url('https://www.shutterstock.com/image-photo/close-unrecognizable-black-woman-entering-600nw-2465756177.jpg')",
        }}
      >
        <Box className="p-5">
          <Grid container>
            {/* Left Column */}
            <Grid item xs={12} md={8}>
              <Typography variant="h2" className="font-black mb-4" style={{ fontWeight: '700' }}>
                The Bell Farm Eco Resort
              </Typography>

              <div className="flex flex-col space-y-4">
                <div className="inline-flex">
                  <span
                    className="rounded-full px-4 py-2 whitespace-nowrap"
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.1)",
                      width: 'fit-content'
                    }}
                  >
                    <Typography variant="subtitle1" className="font-bold">
                      No.8A, Bellanneoya
                    </Typography>
                  </span>
                </div>

                <div className="flex space-x-4">
                  <span
                    className="rounded-full px-4 py-2 whitespace-nowrap"
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.1)",
                      width: 'fit-content'
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
                      width: 'fit-content'
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