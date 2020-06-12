import React, { useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Alert from './components/layout/Alert';
import Dash from './components/dashboard/Dashboard';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import Profiles from './components/profiles/Profiles';
import SingleProfile from './components/singleProfile/SingleProfile';
import AddExp from './components/profile-forms/AddExp';
import AddEdu from './components/profile-forms/AddEdu';
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
import AllPosts from './components/posts/AllPosts';
import Post from './components/post/Post';

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
            <Route path="/profiles" component={Profiles} />
            <Route path="/profile/:id" component={SingleProfile} />
            <PrivateRoute path="/dashboard" component={Dash} />
            <PrivateRoute path="/create-profile" component={CreateProfile} />
            <PrivateRoute path="/edit-profile" component={EditProfile} />
            <PrivateRoute path="/add-experience" component={AddExp} />
            <PrivateRoute path="/add-education" component={AddEdu} />
            <PrivateRoute path="/posts" component={AllPosts} />
            <PrivateRoute path="/post/:id" component={Post} />
          </Switch>
        </section>
      </Router>
    </Provider>
  )
}
export default App;
