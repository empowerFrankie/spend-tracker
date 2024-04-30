import { Link } from 'react-router-dom';

export const Missing = () => {
  return (
    <article>
      <h1>Oops!</h1>
      <p>Page Not Found</p>
      <div>
        <Link to="/">Home</Link>
      </div>
    </article>
  );
};
