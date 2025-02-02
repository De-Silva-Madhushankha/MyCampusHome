import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import ProfileCard from '../components/ProfileCard';
import PropertyListing from '../components/PropertyListing';
import FavoriteAccommodations from '../components/FavoriteAccommodations';
import Analytics from '../components/Analytics';
import {
  Container,
  Grid2 as Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Tabs,
  Tab,
  Paper
} from '@mui/material';
import Footer from '../components/Footer';

const Profile = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <Container maxWidth="lg" className="py-8">
        <Grid container spacing={2}>
          <Grid size={4}>
            <ProfileCard />
          </Grid>
          <Grid size={8}>
            <div className='bg-white border border-gray-100 shadow-lg rounded-2xl p-2'>
              <Box sx={{
                borderBottom: 1,
                borderColor: 'divider',
                bgcolor: 'background.paper'
              }}>
                <Tabs
                  value={tabValue}
                  onChange={handleTabChange}
                  textColor="primary"
                  variant="fullWidth"
                  sx={{
                    "& .MuiTab-root": {
                      fontSize: "1rem",
                      fontWeight: 600,
                      textTransform: "none",
                      minHeight: 56,
                      color: "#9e9e9e",
                      transition: "0.3s",
                      "&.Mui-selected": {
                        color: "#424242",
                      },
                    },
                    "& .MuiTabs-indicator": {
                      height: 2,
                      borderRadius: 2,
                      backgroundColor: "#212121", // Change the indicator color here
                    },
                  }}
                >
                  <Tab label="Your Accommodations" />
                  <Tab label="Favorites" />
                </Tabs>
              </Box>

              <Box sx={{ p: 3, minHeight: 400 }}>
                {tabValue === 0 && <PropertyListing />}
                {tabValue === 1 && <FavoriteAccommodations />}
              </Box>
            </div>
          </Grid>
        </Grid>

        {/* Analytics Section */}
        <div className="mt-12">
          <Typography variant="h5" component="h2" className="font-semibold text-gray-800 mb-4">
            Analytics
          </Typography>
          <Card className="rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <CardContent>
              <Analytics />
            </CardContent>
          </Card>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default Profile;