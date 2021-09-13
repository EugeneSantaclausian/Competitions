import React from 'react';
import { HashRouter as Router, Switch } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import Auth from './Auth';

function App() {
  return (
    <div>
      <AuthProvider>
        <Router>
          <div>
            <Switch>
              <Auth />
            </Switch>
          </div>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
