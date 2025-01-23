import React from 'react';
import Navbar from '../components/Navbar';
import ProfileCard from '../components/ProfileCard';
import PropertyListing from '../components/PropertyListing';
import Analytics from '../components/Analytics';
import { Container, Grid2 as Grid, Card, CardContent, Typography } from '@mui/material';

const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <Container maxWidth="lg" className="py-8">
        <Grid container spacing={2}>
          <Grid size={4}>
            <Card className="shadow-sm">
              <CardContent>
                <ProfileCard />
              </CardContent>
            </Card>
          </Grid>
          <Grid size={8}>
            <Card className="shadow-sm">
              <CardContent>
                <PropertyListing />
              </CardContent>
            </Card>
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
    </div>
  );
};

export default Profile;