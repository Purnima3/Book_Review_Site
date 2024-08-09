import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Button, Box, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import StarIcon from '@mui/icons-material/Star';
import DeleteIcon from '@mui/icons-material/Delete'; 
import PrimarySearchAppBar from '../PrimarySearchAppBar';

const StyledCard = styled(Card)(({ theme }) => ({
  width: '100%', // Ensure card width adjusts with screen size
  maxWidth: 270, // Set a maximum width
  height: 400, // Height of the card
  margin: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  boxShadow: theme.shadows[10],
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: '#fff', // White background color
  color: '#003366', // Dark blue text color
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: theme.shadows[15],
  },
}));

const StyledCardMedia = styled(CardMedia)({
  height: 200, // Adjusted height for the image
  borderBottom: '1px solid #ddd', // Subtle border at the bottom of the image
});

const StyledCardContent = styled(CardContent)({
  flex: '1 0 auto',
  display: 'flex',
  flexDirection: 'column',
  padding: '16px',
  color: '#003366', // Dark blue text color
});

const StyledButton = styled(Button)(({ theme }) => ({
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
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteBookId, setDeleteBookId] = useState(null);

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

  const handleDeleteClick = (bookId) => {
    setDeleteBookId(bookId);
    setOpenDialog(true); // Open the dialog when delete button is clicked
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3001/books/${deleteBookId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete book');
      }
      
      setBooks((prevBooks) => prevBooks.filter((book) => book._id !== deleteBookId));
    } catch (err) {
      setError(err.message);
    } finally {
      setOpenDialog(false);
      setDeleteBookId(null);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); // Close the dialog
    setDeleteBookId(null); // Clear the book ID
  };

  if (loading) {
    return <Typography variant="h6" align="center">Loading...</Typography>;
  }

  if (error) {
    return <Typography variant="h6" color="error" align="center">{error}</Typography>;
  }

  return (
    <>
      <PrimarySearchAppBar />
      <Container sx={{ pt:14 }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}> {/* Align button to the right */}
          <Link to="/addbook" style={{ textDecoration: 'none' }}>
            <StyledButton variant="contained">
              Add Book
            </StyledButton>
          </Link>
        </Box>
        <Grid container spacing={3} justifyContent="center">
          {books.map((book) => (
            <Grid item xs={12} sm={6} md={4} key={book._id}>
              <StyledCard>
                <StyledCardMedia
                  component="img"
                  image={book.image || 'img1.avif'}
                  alt={book.title}
                />
                <StyledCardContent>
                  <Typography variant="h6" component="div" gutterBottom>
                    {book.title}
                  </Typography>
                  <Typography variant="subtitle1" color="inherit">
                    by {book.author}
                  </Typography>
                  <Typography variant="body2" color="inherit" paragraph>
                    <strong>Genre:</strong> {book.genre}
                  </Typography>
                  <Typography variant="body2" color="inherit" paragraph>
                    <strong>Description:</strong> {book.description}
                  </Typography>
                  <StarRating rating={Math.round(book.averageRating)} />
                  <Typography variant="body2" color="inherit" paragraph>
                    <strong>Overall Rating:</strong> {Math.round(book.averageRating)} / 5
                  </Typography>
                  <DeleteButton
                    variant="contained"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDeleteClick(book._id)}
                  >
                    Delete
                  </DeleteButton>
                </StyledCardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to delete this book?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            No
          </Button>
          <Button onClick={handleDelete} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Dashboard_admin;
