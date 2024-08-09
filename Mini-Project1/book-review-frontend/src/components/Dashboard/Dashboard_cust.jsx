import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Rating } from '@mui/material';
import PrimarySearchAppBar from '../PrimarySearchAppBar';

// Define a shade of blue for text
const blueTextColor = '#003366';

const StyledCard = styled(Card)(({ theme }) => ({
  width: '100%', 
  maxWidth: 270, 
  height: 420, 
  margin: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  boxShadow: theme.shadows[10], 
  transition: 'transform 0.3s, box-shadow 0.3s',
  backgroundColor: '#fff', 
  color: blueTextColor, // Apply blue text color to the card
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden', 
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: theme.shadows[15], 
  },
}));

const StyledCardMedia = styled(CardMedia)({
  height: 200,
  borderBottom: '1px solid #ddd', 
  borderRadius: '4px 4px 0 0', 
  objectFit: 'cover', 
});

const StyledCardContent = styled(CardContent)({
  flex: '1 0 auto',
  display: 'flex',
  flexDirection: 'column',
  padding: '16px',
  color: blueTextColor, // Apply blue text color to the content
  textAlign: 'left', 
});

const StyledRating = styled(Rating)({
  color: '#ffb400', 
  marginTop: '8px',
});

const Dashboard_cust = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:3001/books');
        if (!response.ok) {
          throw new Error('Failed to fetch books');
        }
        const data = await response.json();
        setBooks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return <Typography variant="h6" align="center">Loading...</Typography>;
  }

  if (error) {
    return <Typography variant="h6" color="error" align="center">{error}</Typography>;
  }

  return (
    <>
      <PrimarySearchAppBar />
      <Container sx={{ pt: 14 }}>
        <Grid container spacing={3} justifyContent="center" alignItems="center">
          {books.map((book) => (
            <Grid item xs={12} sm={6} md={4} key={book._id} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Link to={`/books/${book._id}`} style={{ textDecoration: 'none' }}>
                <StyledCard>
                  <StyledCardMedia
                    component="img"
                    image={book.image || 'default-image.png'}
                    alt={book.title}
                  />
                  <StyledCardContent>
                    <Typography variant="h6" component="div" gutterBottom>
                      {book.title}
                    </Typography>
                    <Typography variant="subtitle1" paragraph>
                      by {book.author}
                    </Typography>
                    <Typography variant="body2" paragraph>
                      <strong>Genre:</strong> {book.genre}
                    </Typography>
                    <Typography variant="body2" paragraph>
                      <strong>Description:</strong> {book.description}
                    </Typography>
                    <Box mt={2}>
                      <Typography variant="body2" gutterBottom>
                        <strong>Rating:</strong> {Math.round(book.averageRating)}
                      </Typography>
                      <StyledRating
                        name="book-rating"
                        value={book.averageRating || 0}
                        precision={0.5}
                        readOnly
                        size="small"
                      />
                    </Box>
                  </StyledCardContent>
                </StyledCard>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default Dashboard_cust;
