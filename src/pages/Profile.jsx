import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

export default class Profile extends React.Component {
  state = {
    carregandoApi: true,
    usuario: {},
  }

  async componentDidMount() {
    const user = await getUser();
    this.setState({ usuario: user, carregandoApi: false });
  }

  render() {
    const { carregandoApi, usuario } = this.state;
    const { name,
      email,
      image,
      description } = usuario;

    return (
      <div data-testid="page-profile">
        <Header />
        <h1>Sou Profile</h1>
        {carregandoApi ? <p>Carregando...</p> : (
          <div>
            <img data-testid="profile-image" src={ image } alt="profile" />
            <p>

              {name}
            </p>
            <p>

              {email}
            </p>
            <p>

              {description}
            </p>
            <Link to="/profile/edit">Editar perfil</Link>
          </div>
        )}
      </div>
    );
  }
}
