import { NavLink } from 'react-router-dom';
import css from './Navigation.module.css';
import clsx from 'clsx';
import { IoHomeOutline } from 'react-icons/io5';
import { BiCameraMovie } from 'react-icons/bi';

const getActiveLink = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function Navigation() {
  return (
    <>
      <nav className={css.nav}>
        <NavLink to="/" className={getActiveLink}>
          <span className={css.icon}>
            <IoHomeOutline size="25" />
          </span>
          Home
        </NavLink>
        <NavLink to="/movies" className={getActiveLink}>
          <span className={css.icon}>
            <BiCameraMovie size="25" />
          </span>
          Movies
        </NavLink>
      </nav>
    </>
  );
}
