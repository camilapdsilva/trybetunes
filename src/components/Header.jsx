import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import './Header.css';

export default class Header extends React.Component {
state = {
  loading: true,
  // currentUser: {},
  userName: '',
}

async componentDidMount() {
  const user = await getUser();
  this.setState({ userName: user.name }, () => this.validaEntrada());
}

validaEntrada = () => {
  this.setState({ loading: false });
}

render() {
  const { userName, loading } = this.state;
  return (
    <header data-testid="header-component">
      {loading ? <p>Carregando...</p> : <p data-testid="header-user-name">{userName}</p>}
      <nav>
        <Link data-testid="link-to-search" to="/search">Pesquisa</Link>
        <br />
        <Link data-testid="link-to-favorites" to="/favorites">Musicas favoritas</Link>
        <br />
        <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
      </nav>
    </header>
  );
}
}
