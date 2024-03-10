import { Link } from 'react-router-dom';
import css from './MovieList.module.css';
import { TbMovie } from 'react-icons/tb';

export default function MovieList({ items }) {
  return (
    <>
      <ul className={css.list}>
        {items.map(item => (
          <li key={item.id}>
            <span className={css.icon}>
              <TbMovie size="24" />
            </span>

            <Link to={`/movies/${item.id}`}>{item.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
