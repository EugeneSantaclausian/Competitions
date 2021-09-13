import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import StudentPage from './pages/studentpage';
import TeacherPage from './pages/teacherpage';
import ClassPage from './pages/classpage';
import PredictPage from './pages/predictpage';
import SettingsPage from './pages/settingspage';
import PrivateRoute from './components/privateRoute';
import LogIn from './pages/login';
import Spinner from './components/spinner';
import { useAuth } from './context/authContext';

function Auth() {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [found, setFound] = useState(false);

  useEffect(() => {
    async function checker() {
      setLoading(true);
      const user = await currentUser;
      if (user == null && undefined) {
        setFound(false);
        return setLoading(false);
      } else {
        setFound(true);
        return setLoading(false);
      }
    }

    checker();
  }, [currentUser, found]);

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          {found ? (
            <Router>
              <div>
                <Route
                  path="/"
                  exact
                  component={
                    currentUser && currentUser.email ? Dashboard : LogIn
                  }
                />
                <PrivateRoute path="/dashboard" component={Dashboard} />
                <PrivateRoute path="/students" component={StudentPage} />
                <PrivateRoute path="/teachers" component={TeacherPage} />
                <PrivateRoute path="/classes" component={ClassPage} />
                <PrivateRoute path="/predictions" component={PredictPage} />
                <PrivateRoute path="/settings" component={SettingsPage} />
              </div>
            </Router>
          ) : (
            <Route path="/" component={LogIn} />
          )}
        </div>
      )}
    </div>
  );
}

export default Auth;
