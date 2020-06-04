import React, { useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Alert from './components/layout/Alert';
import Dash from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import './App.css';
//redux
import { Provider } from 'react-redux';
import store from './redux/store';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './redux/actions/authAction';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Route exact path="/" component={Landing} />
        <section className="container">
          <Alert />
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <PrivateRoute path="/dashboard" component={Dash} />
          </Switch>
        </section>
      </Router>
    </Provider>
  )
}
export default App;
