import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Grid, Snackbar, Alert, Box, Card, CardContent } from '@mui/material';
import PrimarySearchAppBar from '../PrimarySearchAppBar.jsx';
import { useNavigate } from 'react-router-dom';

function Addbook() {
  const [bookTitle, setBookTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [description, setDescription] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  
  const navigate = useNavigate(); // Initialize the navigate function

  const handleBookTitleChange = (e) => {
    setBookTitle(e.target.value);
  };

  const handleAuthorChange = (e) => {
    setAuthor(e.target.value);
  };

  const handleGenreChange = (e) => {
    setGenre(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newBook = {
      title: bookTitle,
      author: author,
      genre: genre,
      description: description,
    };

    try {
      const response = await fetch('http://localhost:3001/bookInfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBook),
      });

      if (response.ok) {
        setSnackbarMessage('Book added successfully');
        setSnackbarSeverity('success');
        setBookTitle('');
        setAuthor('');
        setGenre('');
        setDescription('');
        
        // Navigate to admin dashboard after successful addition
        navigate('/admin-dashboard');
      } else {
        setSnackbarMessage('Failed to add book');
        setSnackbarSeverity('error');
      }
    } catch (error) {
      console.error('Error:', error);
      setSnackbarMessage('An error occurred while adding the book');
      setSnackbarSeverity('error');
    } finally {
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <PrimarySearchAppBar />
      <Container maxWidth="sm" sx={{ pt: 14 }}>
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" gutterBottom align="center">
            Add a New Book
          </Typography>
          <Card sx={{ p: 2, boxShadow: 3 }}>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      label="Book Title"
                      variant="outlined"
                      fullWidth
                      value={bookTitle}
                      onChange={handleBookTitleChange}
                      required
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Author"
                      variant="outlined"
                      fullWidth
                      value={author}
                      onChange={handleAuthorChange}
                      required
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Genre"
                      variant="outlined"
                      fullWidth
                      value={genre}
                      onChange={handleGenreChange}
                      required
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Description"
                      variant="outlined"
                      multiline
                      rows={4}
                      fullWidth
                      value={description}
                      onChange={handleDescriptionChange}
                      required
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                      Add Book
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Box>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          action={
            <Button color="inherit" onClick={handleSnackbarClose}>
              Close
            </Button>
          }
        >
          <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
}

export default Addbook;
