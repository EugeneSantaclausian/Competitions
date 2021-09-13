import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import Spinner from '../components/spinner';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const displayerror = () => {
      return currentUser ? null : setLoading(false);
    };

    return setTimeout(() => {
      return displayerror();
    }, 3500);
  }, [currentUser]);

  return (
    <div>
      <Route
        {...rest}
        render={(props) => {
          return currentUser ? (
            <Component {...props} />
          ) : (
            <div>{loading ? <Spinner /> : <Redirect to="/" />}</div>
          );
        }}
      />
    </div>
  );
};

export default PrivateRoute;
