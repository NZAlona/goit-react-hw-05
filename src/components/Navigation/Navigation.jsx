import { NavLink } from 'react-router-dom';
import css from './Navigation.module.css';
import clsx from 'clsx';

const getActiveLink = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function Navigation() {
  return (
    <>
      <nav className={css.nav}>
        <NavLink to="/" className={getActiveLink}>
          Home
        </NavLink>
        <NavLink to="/movies" className={getActiveLink}>
          Movies
        </NavLink>
      </nav>
    </>
  );
}
