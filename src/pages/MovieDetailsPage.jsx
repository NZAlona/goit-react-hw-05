import { useParams, NavLink, Outlet, Link, useLocation } from 'react-router-dom';
import { fetchMovieById } from '../movies-api';
import { Suspense, useEffect, useRef, useState } from 'react';
import Loader from '../components/Loader/Loader';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';
import css from '../pages/MovieDetailsPage.module.css';
import defaultImg from '../assets/unvailable.png';
import { GrGroup } from 'react-icons/gr';
import { GoCodeReview } from 'react-icons/go';
import { IoArrowBackCircleOutline } from 'react-icons/io5';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movieById, setMovieById] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const location = useLocation();

  const backLinkRef = useRef(location.state ?? '/');

  useEffect(() => {
    async function fetchMovieData() {
      try {
        setLoading(true);
        setError(false);
        const data = await fetchMovieById(movieId);

        setMovieById(data);
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
      <Link to={backLinkRef.current}>
        <span className={css.iconBack}>
          <IoArrowBackCircleOutline size="36" className={css.back} />
        </span>
      </Link>
      {movieById && (
        <div className={css.wrapperDiv1}>
          <div className={css.wrapperDiv2}>
            <h2 className={css.title}>{movieById.original_title}</h2>
            <p>User score: {Math.round((movieById.vote_average / 10) * 100)}%</p>
          </div>

          <div className={css.wrapperPhoto}>
            <img
              src={
                movieById.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movieById.poster_path}`
                  : defaultImg
              }
              alt={`${movieById.title}`}
              width="280"
              height="350"
            />
          </div>
          <div className={css.wrapperDiv3}>
            <h3 className={css.overview}>Overview</h3>
            <p className={css.text}>{movieById.overview}</p>
            <h3>Genres</h3>
            <ul className={css.list}>
              {movieById.genres.map(({ id, name }) => {
                return <li key={id}>{name}</li>;
              })}
            </ul>
          </div>
        </div>
      )}
      {loading && <Loader />}

      <div className={css.sectionWrapper}>
        <h3 className={css.sectionTitle}>Additional Information</h3>
        <ul className={css.sectionList}>
          <li>
            <NavLink to="cast" className={css.link}>
              <span>
                <GrGroup size="24" className={css.icon} />
              </span>
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink to="reviews" className={css.link}>
              <span>
                <GoCodeReview size="24" className={css.icon} />
              </span>
              Reviews
            </NavLink>
          </li>
        </ul>
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </div>
    </>
  );
}
