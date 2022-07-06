import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import './Profile.css';

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
      <div
        className="page-profile"
        data-testid="page-profile"
      >
        <Header />
        <div className="container-meu-perfil">
          {carregandoApi ? <h1 className="page-title">Carregando...</h1> : (
            <div className="container-names">
              <h1 className="page-title">Meu perfil</h1>
              <img data-testid="profile-image" src={ image } alt="Minha foto" />

              <div className="container-names2">
                <h3 className="names">Nome:</h3>
                <span className="names-infos">
                  {name}
                </span>
              </div>

              <div className="container-names2">
                <h3 className="names">E-mail:</h3>
                <span className="names-infos">
                  {email}
                </span>
              </div>

              <div className="container-names2">
                <h3 className="names">Descrição:</h3>
                <span className="names-infos">
                  {description}
                </span>
              </div>

              <Link className="link-edita" to="/profile/edit">Editar perfil</Link>
            </div>
          )}
        </div>
      </div>
    );
  }
}
