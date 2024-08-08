import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, TextField, Button } from '@mui/material';
import { useParams } from 'react-router-dom';

function BookDetail() {
  const { id } = useParams(); // Get the book ID from the URL
  const [book, setBook] = useState(null);
  const [review, setReview] = useState({ username: '', rating: '', comment: '' });
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
      setReview({ username: '', rating: '', comment: '' });
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
        {book.title}
      </Typography>
      <Typography variant="h6" align="center">by {book.author}</Typography>
      <Typography variant="body1" align="center">{book.description}</Typography>
      <Box mt={4}>
        <Typography variant="h6">Reviews</Typography>
        {book.reviews.length > 0 ? (
          book.reviews.map((rev, index) => (
            <Box key={index} p={1} border={1} borderRadius={1} mb={2}>
              <Typography variant="subtitle1"><strong>{rev.username}</strong></Typography>
              <Typography variant="body2">Rating: {rev.rating}</Typography>
              <Typography variant="body2">{rev.comment}</Typography>
            </Box>
          ))
        ) : (
          <Typography variant="body2" color="textSecondary">No reviews yet.</Typography>
        )}
        <Box mt={2}>
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
          <TextField
            name="rating"
            label="Rating"
            type="number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={review.rating}
            onChange={handleReviewChange}
          />
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
      </Box>
    </Container>
  );
}

export default BookDetail;
