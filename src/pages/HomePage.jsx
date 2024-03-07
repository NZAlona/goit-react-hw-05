import { useEffect, useState } from 'react';
import { fetchTrendingMovie } from '../movies-api';
import MovieList from '../components/MovieList/MovieList';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';
import Loader from '../components/Loader/Loader';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchMovies() {
      try {
        setLoading(true);
        setError(false);
        const data = await fetchTrendingMovie();
        // console.log(data.results);
        setMovies(data.results);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, []);

  return (
    <>
      <div>
        <h1>Tranding today</h1>
        {error && <ErrorMessage />}
        {movies.length > 0 && <MovieList items={movies} />}
        {loading && <Loader />}
      </div>
    </>
  );
}
