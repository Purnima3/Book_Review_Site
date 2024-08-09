import React from 'react';
import { Container, Typography, Button, Grid, Paper, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Home_Page = () => {
  const containerStyle = {
    minHeight: '100vh',
    backgroundImage: 'url(bg-img2.webp)', // Path to your background image
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
    display: 'flex', // Enable flexbox
    alignItems: 'center', // Center vertically
    justifyContent: 'center', // Center horizontally
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    zIndex: -1, 
  };

  return (
    <Container component="main" maxWidth="lg" style={containerStyle}>
      <div style={overlayStyle}></div>
      <Grid container spacing={4} alignItems="center" justifyContent="center" style={{ position: 'relative', zIndex: 1 }}>
        <Grid item xs={12} sm={8} md={6}>
          <Typography variant="h2" align="center" gutterBottom color="white">
            Welcome to Book Review Central
          </Typography>
          <Typography variant="h5" align="center" paragraph color="white">
            Discover your next favorite book and share your thoughts with our community. Explore book reviews, write your own.
          </Typography>
          <Box textAlign="center" mt={4}>
            <Button
              component={Link}
              to="/login"
              variant="contained"
              color="primary"
              size="large"
              style={{ marginRight: 16 }}
            >
              Sign in
            </Button>
            {/* <Button
              component={Link}
              to="/login"
              variant="outlined"
              
              size="large"
            >
              Sign In
            </Button> */}
          </Box>
        </Grid>
        <Grid item xs={12} sm={8} md={6}>
          <Paper elevation={3} style={{ padding: 16, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
            <Typography variant="h4" align="center" gutterBottom>
              Latest Reviews
            </Typography>
            {/* Here you can map through recent reviews and display them */}
            <Typography variant="body1" align="center" paragraph>
              "An amazing read! The plot twists were unbelievable." - Jane Doe
            </Typography>
            <Typography variant="body1" align="center" paragraph>
              "A must-read for anyone interested in historical fiction." - John Smith
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home_Page;
