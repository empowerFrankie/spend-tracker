import { Navigate, Route } from 'react-router-dom';

interface Props {
  path: string;
  element: JSX.Element;
  children?: React.ReactNode;
}

export const PrivateRoute = ({ path, element, children }: Props) => {
  const auth = useAuth();

  if (auth?.user == null) {
    return <Navigate to="/login" />;
  }

  return (
    <Route path={path} element={element}>
      {children}
    </Route>
  );
};

// Declaring this to appease TS
// This would be a React context hook used to provide user data
// Useful for importing the user object into different components
function useAuth() {
  return { user: {} };
}
