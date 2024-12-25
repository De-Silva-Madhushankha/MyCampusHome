import { Box, Container, Card, Typography, Button } from '@mui/material';

export default function RentalProcess() {
  return (
    <Container maxWidth="lg" sx={{ my: 8 }}>
      <Typography variant="h3" align="center" gutterBottom>
        Negotiate Your Rent and
        <Box component="span" color="primary.main"> Apply Online</Box>
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, my: 4 }}>
        <Card sx={{ p: 3, width: 300 }}>
          <Box
            component="img"
            src="/images/gauge.png"
            alt="Demand Meter"
            sx={{ width: '100%', mb: 2 }}
          />
          <Typography variant="h6">High Demand</Typography>
        </Card>

        <Card sx={{ p: 3, width: 300 }}>
          <Typography variant="subtitle1" gutterBottom>Monthly Rent</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Typography variant="h5">$2,000</Typography>
            <Typography variant="caption" sx={{ ml: 1 }}>
              Highest Offer: $2,050
            </Typography>
          </Box>
          <Button variant="contained" fullWidth>
            Submit Offer
          </Button>
        </Card>
      </Box>
    </Container>
  );
}