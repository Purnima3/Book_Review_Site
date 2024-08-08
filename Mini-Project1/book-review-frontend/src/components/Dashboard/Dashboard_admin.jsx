import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import StarIcon from '@mui/icons-material/Star'; // Star icon for rating
import DeleteIcon from '@mui/icons-material/Delete'; // Delete icon

const StyledCard = styled(Card)(({ theme }) => ({
  width: 270, 
  height: 380, 
  margin: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  boxShadow: theme.shadows[5],
  transition: 'transform 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const StyledCardMedia = styled(CardMedia)({
  height: 180,
});

const StyledCardContent = styled(CardContent)({
  flex: '1 0 auto',
  display: 'flex',
  flexDirection: 'column',
});

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const DeleteButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  backgroundColor: theme.palette.error.main,
  color: theme.palette.error.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.error.dark,
  },
}));

const RatingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginTop: theme.spacing(1),
}));

const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <StarIcon key={i} color={i <= rating ? 'primary' : 'action'} />
    );
  }
  return <RatingContainer>{stars}</RatingContainer>;
};

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
        setBooks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleDelete = async (bookId) => {
    try {
      const response = await fetch(`http://localhost:3001/books/${bookId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete book');
      }
      // Remove the deleted book from the state
      setBooks((prevBooks) => prevBooks.filter((book) => book._id !== bookId));
    } catch (err) {
      setError(err.message);
    }
  };

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
                image={book.image || 'img1.avif'} // Use a dynamic image if available
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
                <Typography variant="body2" color="textSecondary" paragraph>
                  <strong>Description:</strong> {book.description}
                </Typography>
                <StarRating rating={Math.round(book.averageRating)} />
                <Typography variant="body2" color="textSecondary" paragraph>
                  <strong>Overall Rating:</strong> {Math.round(book.averageRating)} / 5
                </Typography>
                <DeleteButton
                  variant="contained"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleDelete(book._id)}
                >
                  Delete
                </DeleteButton>
              </StyledCardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Dashboard_admin;
