import React, { useState } from "react";
import { Wifi, WashingMachine, Wind, MonitorSmartphone, Bath, ChefHat, Car, Tv, TreePine, Home, Calendar, Banknote, Phone, Mail, MapPin } from "lucide-react";
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { Card, CardContent, Typography, Grid, Box, Paper, Button, Container } from "@mui/material";

const AmenityIcon = ({ Icon, text }) => (
  <Paper
    elevation={0}
    sx={{
      p: .5,
      display: 'flex',
      alignItems: 'center',
      gap: 1,
      border: '1px solid #e5e7eb',
      borderRadius: 5,
      backgroundColor: '#f8fafc',
      justifyContent: 'center',
    }}
  >
    <Icon style={{ width: 20, height: 20, color: '#666' }} />
    <Typography color="text.secondary">{text}</Typography>
  </Paper>
);

const PropertyDetails = ({ property }) => {
  const [showMap, setShowMap] = useState(false);

  if (!property) {
    return <Typography>Loading...</Typography>;
  }

  const position = [property.lat, property.lng];

  const amenityIcons = {
    "Wi-Fi": Wifi,
    "Study Desk": MonitorSmartphone,
    "Attached Bathroom": Bath,
    "Parking": Car,
    "Air Conditioning": Wind,
    "Washing Machine": WashingMachine,
    "Kitchen Access": ChefHat,
    "TV": Tv,
    "Garden": TreePine
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* About This House Section */}
      <Card elevation={0}>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: '600', color: '#1e293b', textAlign: 'center' }}>
            About
          </Typography>
          <Typography variant="body1" sx={{ color: '#475569', lineHeight: 1.8 }}>
            {property.description ||
              `Located in the vibrant city of ${property.city}, this inviting ${property.propertyType.toLowerCase()} is ideally 
              situated near the renowned ${property.nearestUniversity}. Spanning a generous ${property.area} sq ft, this property 
              offers ${property.bedrooms} bedroom(s) and ${property.bathrooms} bathroom(s), making it a perfect choice for students 
              and professionals alike.
              `
            }
          </Typography>
        </CardContent>
      </Card>

      {/* Two Column Layout */}
      <Grid container spacing={2}>
        {/* Left Column - Details */}
        <Grid item xs={12} md={7}>
          {/* Property Overview */}
          <Card elevation={0} sx={{ mb: 1, border: '1px solid #e5e7eb' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                <Home style={{ color: '#1e293b' }} />
                <Typography variant="h6" sx={{ fontWeight: '600', color: '#1e293b' }}>Property Overview</Typography>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Typography color="text.secondary" variant="body2">Property Type</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>{property.propertyType}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography color="text.secondary" variant="body2">Area</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>{property.area} sq ft</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography color="text.secondary" variant="body2">Available From</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>{formatDate(property.availableFrom)}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography color="text.secondary" variant="body2">Bedrooms</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>{property.bedrooms}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography color="text.secondary" variant="body2">Bathrooms</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>{property.bathrooms}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography color="text.secondary" variant="body2">Minimum Stay</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>{property.minimumStay} months</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Pricing Details */}
          <Card elevation={0} sx={{ mb: 1, border: '1px solid #e5e7eb' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                <Banknote style={{ color: '#1e293b' }} />
                <Typography variant="h6" sx={{ fontWeight: '600', color: '#1e293b' }}>Pricing Details</Typography>
              </Box>
              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <Typography color="text.secondary" variant="body2">Monthly Rent</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>LKR {property.price.toLocaleString()}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography color="text.secondary" variant="body2">Security Deposit</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>LKR {property.deposit.toLocaleString()}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography color="text.secondary" variant="body2">Bills Included</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>{property.billsIncluded ? "Yes" : "No"}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Amenities */}
          <Card elevation={0} sx={{ mb: 1, border: '1px solid #e5e7eb' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: '600', color: '#1e293b' }}>Available Amenities</Typography>
              <Grid container spacing={1}>
                {property.amenities.map((amenity, index) => {
                  const Icon = amenityIcons[amenity] || Home;
                  return (
                    <Grid item xs={12} sm={3} key={index}>
                      <AmenityIcon Icon={Icon} text={amenity} />
                    </Grid>
                  );
                })}
              </Grid>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card elevation={0} sx={{ border: '1px solid #e5e7eb' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 1, fontWeight: '600', color: '#1e293b' }}>Contact Information</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Phone style={{ color: '#666' }} />
                  <Typography>{property.phone}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Mail style={{ color: '#666' }} />
                  <Typography>{property.email}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <MapPin style={{ color: '#666', marginTop: '4px' }} />
                  <Typography>
                    {property.address}, {property.city}, {property.postalCode}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Column - Map and Contact */}
        <Grid item xs={12} md={5}>
          <Box sx={{ top: { md: 24 } }}>
            {/* Map Card */}
            <Card elevation={0} sx={{ mb: 1, border: '1px solid #e5e7eb' }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: '600', color: '#1e293b' }}>Location</Typography>
                {!showMap ? (
                  <Box sx={{ position: 'relative' }}>
                    <Box
                      component="img"
                      src="/MapImgSample.png"
                      alt="Map of the property"
                      sx={{
                        width: '100%',
                        height: 500,
                        objectFit: 'cover',
                        borderRadius: 1,
                        filter: 'blur(4px)'
                      }}
                    />
                    <Button
                      variant="contained"
                      onClick={() => setShowMap(true)}
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: '#1e40af',
                        '&:hover': {
                          backgroundColor: '#1e3a8a'
                        }
                      }}
                    >
                      Show Map
                    </Button>
                  </Box>
                ) : (
                  <Box sx={{ height: 500, borderRadius: 1, overflow: 'hidden' }}>
                    <MapContainer
                      center={position}
                      zoom={15}
                      scrollWheelZoom={true}
                      style={{ height: '100%', width: '100%', zIndex: 0 }}
                    >
                      <TileLayer
                        url="https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=NyAnmJNQJ1ocTyQvNNtO"
                        tileSize={512}
                        zoomOffset={-1}
                        attribution='&copy; <a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
                      />
                      <Marker position={position} />
                    </MapContainer>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PropertyDetails;