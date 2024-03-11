import { useState, useEffect } from 'react';
import { fetchMovieCredits } from '../../movies-api';
import { useParams } from 'react-router-dom';
import css from './MovieCast.module.css';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import defaultImg from '../../assets/unvailable.png';

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
      {movieCredits.length > 0 ? (
        <ul className={css.list}>
          {movieCredits.map(({ id, name, character, profile_path }) => {
            return (
              <li key={id}>
                <img
                  src={profile_path ? `https://image.tmdb.org/t/p/w500${profile_path}` : defaultImg}
                  alt={name}
                  width="265"
                  height="345"
                  className={css.photo}
                />

                <p className={css.actorName}>{name}</p>
                <p className={css.text}>Character: {character}</p>
              </li>
            );
          })}
        </ul>
      ) : (
        !loading && <p>We do not have any profile details yet</p>
      )}
      {loading && <Loader />}
    </>
  );
}

//  {
//    movieCredits.length > 0 && (
//      <ul className={css.list}>
//        {movieCredits.map(({ id, name, character, profile_path }) => {
//          return (
//            <li key={id}>
//              <img
//                src={profile_path ? `https://image.tmdb.org/t/p/w500${profile_path}` : defaultImg}
//                alt={name}
//                width="265"
//                height="345"
//                className={css.photo}
//              />

//              <p className={css.actorName}>{name}</p>
//              <p className={css.text}>Character: {character}</p>
//            </li>
//          );
//        })}
//      </ul>
//    );
//  }
