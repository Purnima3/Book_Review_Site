import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';


const StyledCard = styled(Card)(({ theme }) => ({
  width: 270, 
  height: 350, 
  margin: theme.spacing(1),
  display: 'flex',
  flexDirection: 'column',
  boxShadow: theme.shadows[5],
}));

const StyledCardMedia = styled(CardMedia)({
  height: 140,
});

const StyledCardContent = styled(CardContent)({
  flex: '1 0 auto',
});

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const Dashboard_admin = () => {
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
        console.log(data)
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
        Book Collection
      </Typography>
      <Link to="/addbook" style={{ textDecoration: 'none' }}>
        <StyledButton variant="contained">
          Add Book
        </StyledButton>
      </Link>
      <Grid container spacing={3}>
        {books.map((book) => (
          <Grid item xs={12} sm={6} md={4} key={book._id}>
            <StyledCard>
              <StyledCardMedia
                component="img"
                image="img1.avif" // Consider using a dynamic image source
                alt={book.title}
              />
              <StyledCardContent>
                <Typography variant="h6" component="div">
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
                <Typography variant="body2" color="textSecondary">
  <strong>Overall Rating:</strong> {Math.round(book.averageRating)}
</Typography>
              </StyledCardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Dashboard_admin;
