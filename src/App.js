import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Album from './pages/Album';
import Search from './pages/Search';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';

// import { Album, Favorites, Login, NotFound, Profile, ProfileEdit, Search } from './pages';

class App extends React.Component {
  render() {
    return (

      <div>
        <p>TrybeTunes</p>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route path="/search" component={ Search } />
            <Route path="/album/:id" render={ (props) => <Album { ...props } /> } />
            <Route path="/favorites" render={ (props) => <Favorites { ...props } /> } />
            <Route exact path="/profile" component={ Profile } />
            <Route path="/profile/edit" component={ ProfileEdit } />
            <Route path="*" component={ NotFound } />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
