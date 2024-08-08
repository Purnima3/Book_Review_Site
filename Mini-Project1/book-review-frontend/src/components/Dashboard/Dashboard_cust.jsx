import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function Dashboard_cust() {
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
        Customer Dashboard
      </Typography>
      <Grid container spacing={3}>
        {books.map((book) => (
          <Grid item xs={12} sm={6} md={4} key={book._id}>
            <Link to={`/books/${book._id}`} style={{ textDecoration: 'none' }}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image="img1.avif"
                  alt={book.title}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    {book.title}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    by {book.author}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Genre:</strong> {book.genre}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Description:</strong> {book.description}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Dashboard_cust;
