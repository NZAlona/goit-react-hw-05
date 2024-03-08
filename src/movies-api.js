import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';

const options = {
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYzY3ZGExZTJjZTRlMmJlMmU0M2Q3M2VlM2U3ZDM1YyIsInN1YiI6IjYzZDBhYzIwYTQxMGM4MDBkYjY5ZTAyYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7RcbKzWCN-tv3ZLEviSdQCkJX9-An49QeNmFp7ZMS5U',
    accept: 'application/json',
  },
};

export const fetchTrendingMovie = async () => {
  const response = await axios.get('/trending/movie/day', options);
  return response.data;
};

export const fetchMovieById = async movieId => {
  const response = await axios.get(`/movie/${movieId}`, options);
  return response.data;
};

export const fetchMovieCredits = async movieId => {
  const response = await axios.get(`/movie/${movieId}/credits`, options);
  return response.data;
};

export const fetchMovieReviews = async movieId => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/reviews`,
    options
  );
  return response.data;
};
