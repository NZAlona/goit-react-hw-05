import { useState, useEffect } from 'react';
import { fetchMovieCredits } from '../../movies-api';
import { useParams } from 'react-router-dom';
import css from './MovieCast.module.css';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

export default function MovieCast() {
  const { movieId } = useParams();
  const [movieCredits, setMovieCredits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchMovieData() {
      try {
        setLoading(true);
        setError(false);
        const data = await fetchMovieCredits(movieId);
        console.log(data.cast);
        setMovieCredits(data.cast);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchMovieData();
  }, [movieId]);

  return (
    <>
      {error && <ErrorMessage />}
      {movieCredits.length > 0 && (
        <ul>
          {movieCredits.map(({ id, name, character, profile_path }) => {
            return (
              <li key={id}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${profile_path}`}
                  alt={name}
                  width="120"
                  height="160"
                  className={css.photo}
                />
                <p className={css.actorName}>{name}</p>
                <p className={css.text}>Character: {character}</p>
              </li>
            );
          })}
        </ul>
      )}
      {loading && <Loader />}
    </>
  );
}
