import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
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
  state ={
    isLoginButtonDisabled: true,
    nomeDigitado: '',
  }

  onInput = (event) => {
    // const { isLoginButtonDisabled } = this.state;
    const { value } = event.target;
    const max = 3;
    if (value.length >= max) {
      this.setState({ isLoginButtonDisabled: false });
    }
    this.setState({
      nomeDigitado: value,
    });
  }

  render() {
    const { isLoginButtonDisabled, nomeDigitado } = this.state;
    return (
      <BrowserRouter>
        <p>TrybeTunes</p>
        <Route exact path="/">
          <Login
            render={ (props) => <Login { ...props } /> }
            isLoginButtonDisabled={ isLoginButtonDisabled }
            onInput={ this.onInput }
            nomeDigitado={ nomeDigitado }
          />
        </Route>
        <Route path="/search" component={ Search } />
        <Route path="/album/:id" component={ Album } />
        <Route path="/favorites" component={ Favorites } />
        <Route exact path="/profile" component={ Profile } />
        <Route path="/profile/edit" component={ ProfileEdit } />
        <Route path="*" component={ NotFound } />
      </BrowserRouter>

    );
  }
}

export default App;
