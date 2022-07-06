import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import fone from './fone-de-ouvido.png';
import imgUser from './do-utilizador.png';
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
      {loading ? <h2 className="carregando">Carregando...</h2> : (
        <div className="container-header">
          <div className="container-trybetunes">
            <img
              className="fone"
              src={ fone }
              alt="fone de ouvido"
            />
            <span className="trybetunes">TrybeTunes</span>
          </div>
          <div className="container-user">
            <img className="imgUser" src={ imgUser } alt="user" />
            <p className="name" data-testid="header-user-name">{userName}</p>
          </div>
        </div>
      )}
      <nav>
        <Link
          className="navegacao"
          data-testid="link-to-search"
          to="/search"
        >
          Pesquisa

        </Link>
        <br />
        <Link
          className="navegacao"
          data-testid="link-to-favorites"
          to="/favorites"
        >
          Musicas favoritas

        </Link>
        <br />
        <Link
          className="navegacao"
          data-testid="link-to-profile"
          to="/profile"
        >
          Perfil

        </Link>
      </nav>
    </header>
  );
}
}
