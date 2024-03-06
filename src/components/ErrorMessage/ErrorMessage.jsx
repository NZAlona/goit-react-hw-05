import css from './ErrorMessage.module.css';

export default function ErrorMessage() {
  return (
    <div>
      <p className={css.error}>Oops,something went wrong. Please reload page again</p>
    </div>
  );
}
