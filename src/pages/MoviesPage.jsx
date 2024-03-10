import toast, { Toaster } from 'react-hot-toast';
import { fetchMovieByQuery } from '../movies-api';
import MovieList from '../components/MovieList/MovieList';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Loader from '../components/Loader/Loader';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';
import css from '../pages/MoviePage.module.css';

export default function MoviesPage() {
  const [movieList, setMovieList] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [params, setParams] = useSearchParams();

  const queryFilter = params.get('query') ?? '';

  const changeQueryFilter = newQuery => {
    params.set('query', newQuery);
    setParams(params);
  };

  useEffect(() => {
    async function fetchMovies() {
      try {
        setLoading(true);
        setError(false);
        const data = await fetchMovieByQuery(queryFilter);

        setMovieList(data.results);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, [queryFilter]);

  const handleSubmit = newQuery => {
    if (newQuery.trim() === '') {
      toast.error('You tried to submit an empty request!');
      return;
    }

    changeQueryFilter(newQuery.trim());
  };

  return (
    <>
      <div>
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSubmit(inputValue);
          }}
          className={css.form}
        >
          <input
            type="text"
            name="query"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            className={css.inputField}
          />
          <button type="submit" className={css.btn}>
            Search
          </button>
        </form>
      </div>
      {loading && <Loader />}
      <Toaster />

      {error && <ErrorMessage />}
      <MovieList items={movieList} />
    </>
  );
}
