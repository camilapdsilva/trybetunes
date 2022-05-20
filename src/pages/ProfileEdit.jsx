import React from 'react';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

export default class ProfileEdit extends React.Component {
  state = {
    carregandoApi: false,
    usuario: {},
    isDisabled: true,
    name: '',
    email: '',
    image: '',
    description: '',
  }

  async componentDidMount() {
    const user = await getUser();
    this.setState({ usuario: user });
  }

  validaEntrada = () => {
    const { name,
      email,
      image,
      description } = this.state;
    const min = 0;
    if (name.length < min
      && email < min
      && image < min
      && description < min) {
      this.setState({ isDisabled: true });
    } else {
      this.setState({ isDisabled: false });
    }
  }

  render() {
    const { carregandoApi, usuario, isDisabled } = this.state;
    const { name,
      email,
      image,
      description } = usuario;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        <h1>Sou ProfileEdit</h1>
        {carregandoApi && <p>Carregando...</p>}

        <form>
          <label htmlFor="name">
            Nome:
            <input
              data-testid="edit-input-name"
              type="text"
              name="name"
              value={ name }

            />
          </label>
          <br />
          <label htmlFor="email">
            {' '}
            Email:
            <input
              data-testid="edit-input-email"
              type="email"
              name="email"
              value={ email }

            />
          </label>
          <br />
          <label htmlFor="description">
            {' '}
            Descrição:
            <input
              data-testid="edit-input-description"
              type="text"
              name="description"
              value={ description }
            />
          </label>
          <br />
          <label htmlFor="image">
            {' '}
            Imagem:
            <input
              data-testid="edit-input-image"
              type="text"
              name="image"
              value={ image }
            />
          </label>
          <br />
          <button
            data-testid="edit-button-save"
            type="submit"
            disabled={ isDisabled }
          >
            Salvar

          </button>
        </form>
      </div>
    );
  }
}
