import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Rating } from '@mui/material';

// Styled Components
const StyledCard = styled(Card)(({ theme }) => ({
  width: 270,
  height: 400,
  margin: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  boxShadow: theme.shadows[5],
  transition: 'transform 0.3s, box-shadow 0.3s',
  backgroundColor: theme.palette.background.paper, // Light background color
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: theme.shadows[10],
  },
}));

const StyledCardMedia = styled(CardMedia)({
  height: 180,
});

const StyledCardContent = styled(CardContent)({
  flex: '1 0 auto',
  display: 'flex',
  flexDirection: 'column',
  padding: '16px',
});

const StyledRating = styled(Rating)({
  color: '#ffb400', 
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
    <Container>
      <Typography variant="h4" gutterBottom align="center">
       Welcome : 
      </Typography>
      <Grid container spacing={3}>
        {books.map((book) => (
          <Grid item xs={12} sm={6} md={4} key={book._id}>
            <Link to={`/books/${book._id}`} style={{ textDecoration: 'none' }}>
              <StyledCard>
                <StyledCardMedia
                 
                  alt={book.title}
                />
                <StyledCardContent>
                  <Typography variant="h6" component="div" gutterBottom>
                    {book.title}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    by {book.author}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" paragraph>
                    <strong>Genre:</strong> {book.genre}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Description:</strong> {book.description}
                  </Typography>
                  <Box mt={2}>
                    <Typography variant="body2" precision={0.5}>
                      <strong>Rating:</strong>
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
  );
}

export default Dashboard_cust;
