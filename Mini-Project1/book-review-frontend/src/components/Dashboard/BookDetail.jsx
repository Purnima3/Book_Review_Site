import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, TextField, Button, Card, CardContent, CardMedia } from '@mui/material';
import { useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import StarRatingComponent from 'react-star-rating-component';
import { Rating } from '@mui/material';
import PrimarySearchAppBar from '../PrimarySearchAppBar.jsx';

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 600,
  margin: 'auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(2),
  boxShadow: theme.shadows[5],
  backgroundColor: theme.palette.background.paper,
}));

const StyledCardMedia = styled(CardMedia)({
  height: 240,
  width: '100%',
  objectFit: 'cover',
});

const ReviewBox = styled(Box)(({ theme }) => ({
  p: theme.spacing(3),
  border: `1px solid ${theme.palette.grey[400]}`,
  borderRadius: theme.shape.borderRadius,
  mb: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
  transition: '0.3s',
  '&:hover': {
    backgroundColor: theme.palette.grey[100],
    boxShadow: theme.shadows[3],
    transform: 'scale(1.02)',
  },
}));

const BackgroundBox = styled(Box)(({ theme }) => ({
  backgroundImage: 'url("/path/to/your/background-image.jpg")', // Replace with your image path
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '100vh',
  padding: theme.spacing(4),
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const ContentBox = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(4),
  boxShadow: theme.shadows[5],
  maxWidth: 800,
  width: '100%',
}));

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [review, setReview] = useState({ username: '', rating: 0, comment: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`http://localhost:3001/books/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch book details');
        }
        const data = await response.json();
        setBook(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleReviewChange = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value });
  };

  const handleAddReview = async () => {
    try {
      const response = await fetch(`http://localhost:3001/books/${id}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review),
      });
      if (!response.ok) {
        throw new Error('Failed to add review');
      }
      const updatedBook = await response.json();
      setBook(updatedBook);
      setReview({ username: '', rating: 0, comment: '' });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRatingChange = (nextValue) => {
    setReview({ ...review, rating: nextValue });
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
      <BackgroundBox>
        <ContentBox sx={{ pt:14 }}>
          <StyledCard>
            <CardContent>
              <Typography variant="h4" component="div" gutterBottom>
                {book.title}
              </Typography>
              <Typography variant="h6" color="textSecondary">
                by {book.author}
              </Typography>
              <Typography variant="body1" paragraph>
                {book.description}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                <strong>Overall Rating:</strong> {book.averageRating ? Math.round(book.averageRating) : 'No ratings yet'}
              </Typography>
            </CardContent>
          </StyledCard>
          <Box mt={4}>
            <Typography variant="h6">Add Review</Typography>
            <TextField
              name="username"
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={review.username}
              onChange={handleReviewChange}
            />
            <Box mt={2}>
              <Typography>Rating:</Typography>
              <StarRatingComponent
                name="rating"
                starCount={5}
                value={review.rating}
                onStarClick={handleRatingChange}
                emptyStarColor="#bdbdbd"
                starColor="#ffb400"
              />
            </Box>
            <TextField
              name="comment"
              label="Comment"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              margin="normal"
              value={review.comment}
              onChange={handleReviewChange}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddReview}
              fullWidth
              sx={{ mt: 2 }}
            >
              Submit Review
            </Button>
          </Box>
          <Box mt={4}>
            <Typography variant="h6">Reviews</Typography>
            {book.reviews.length > 0 ? (
              book.reviews.map((rev, index) => (
                <ReviewBox key={index} mt={4} p={2}>
                  <Typography variant="subtitle1" gutterBottom><strong>{rev.username}</strong></Typography>
                  <Typography variant="body2" paragraph>Rating: <Rating name="read-only" value={rev.rating} readOnly /></Typography>
                  <Typography variant="body2">{rev.comment}</Typography>
                </ReviewBox>
              ))
            ) : (
              <Typography variant="body2" color="textSecondary">No reviews yet.</Typography>
            )}
          </Box>
        </ContentBox>
      </BackgroundBox>
    </>
  );
}

export default BookDetail;
