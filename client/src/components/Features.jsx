import { Container, Grid, Typography, Card, CardContent } from '@mui/material';
import { Videocam, Description, Payment, Build } from '@mui/icons-material';

const features = [
  {
    icon: <Description />,
    title: 'E-Sign Papers',
    description: 'Sign your rental agreement electronically.',
  },
  {
    icon: <Payment />,
    title: 'Pay Rent Online',
    description: 'Manage all your rental payments in one place.',
  },
  {
    icon: <Build />,
    title: 'Maintenance',
    description: 'Submit and track maintenance requests easily.',
  },
];

export default function Features() {
  return (
    <Container maxWidth="lg" sx={{ my: 8 }}>
      <Grid container spacing={4}>
        {features.map((feature) => (
          <Grid item xs={12} sm={6} md={3} key={feature.title}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                {feature.icon}
                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                  {feature.title}
                </Typography>
                <Typography color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}