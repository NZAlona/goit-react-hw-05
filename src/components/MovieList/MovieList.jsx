import css from './MovieList.module.css';

export default function MovieList({ items }) {
  return (
    <>
      <ul className={css.list}>
        {items.map(item => (
          <li key={item.id}>
            <a href="#">{item.title}</a>
          </li>
        ))}
      </ul>
    </>
  );
}
