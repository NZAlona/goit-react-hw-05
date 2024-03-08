import { fetchMovieReviews } from '../../movies-api';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import css from './MovieReviews.module.css';

export default function MovieReviews() {
  const { movieId } = useParams();
  const [movieReviews, setMovieReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchMovieData() {
      try {
        setLoading(true);
        setError(false);
        const data = await fetchMovieReviews(movieId);
        console.log(data.results);
        setMovieReviews(data.results);
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
      {movieReviews.length > 0 && (
        <ul className={css.list}>
          {movieReviews.map(({ id, content, author }) => {
            return (
              <li key={id}>
                <h4 className={css.title}> Author: {author}</h4>
                <p> {content}</p>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
