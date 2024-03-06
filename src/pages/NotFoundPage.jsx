import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <>
      <div>
        <h3>Sorry but that page does not exist!</h3>
        <Link to="/"> Return to the Home Page</Link>
      </div>
    </>
  );
}
