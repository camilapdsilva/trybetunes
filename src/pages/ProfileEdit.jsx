import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import './ProfileEdit.css';

export default class ProfileEdit extends React.Component {
  state = {
    carregandoApi: false,
    carregandoUpdate: false,
    usuario: {},
    isDisabled: true,

  }

  async componentDidMount() {
    this.setState({ carregandoApi: true });
    const user = await getUser();
    this.setState({ carregandoApi: false, usuario: user }, () => this
      .setState({ isDisabled: this.validaEntradas() }));
  }

  validaEntradas = () => {
    const { usuario } = this.state;
    const { name, email, image, description } = usuario;
    const min = 0;

    if (name.length > min
        && image.length > min
        && description.length > min
        && email.includes('@')
    ) {
      return false;
    }
    return true;
  }

  handleChange = ({ target }) => {
    const { value, name } = target;
    // const { usuario } = this.state;
    this.setState(({ usuario }) => ({ usuario: { ...usuario, [name]: value } }));
    this.setState({ isDisabled: this.validaEntradas() });
  }

  handleSubmit = async () => {
    const { usuario } = this.state;
    const { history } = this.props;
    this.setState({ carregandoUpdate: true });
    await updateUser(usuario);
    history.push('/profile');
  }

  render() {
    const { carregandoApi, usuario, isDisabled, carregandoUpdate } = this.state;
    const { name,
      email,
      image,
      description } = usuario;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        <div className="container-edita-perfil">
          {carregandoUpdate && <p>Carregando...</p>}
          {carregandoApi ? <h1 className="titles-edita">Carregando...</h1> : (
            <div className="container-inputs">
              <h1 className="titles-edita">Editar Perfil</h1>
              <form>
                <label htmlFor="name">
                  Nome:
                  <input
                    className="input-infos"
                    data-testid="edit-input-name"
                    type="text"
                    name="name"
                    defaultValue={ name }
                    onChange={ this.handleChange }
                    required

                  />
                </label>
                <br />
                <label htmlFor="email">
                  {' '}
                  Email:
                  <input
                    className="input-infos"
                    data-testid="edit-input-email"
                    type="email"
                    name="email"
                    defaultValue={ email }
                    onChange={ this.handleChange }
                    required
                  />
                </label>
                <br />
                <label htmlFor="description">
                  {' '}
                  Descrição:
                  <input
                    className="input-infos"
                    data-testid="edit-input-description"
                    type="text"
                    name="description"
                    defaultValue={ description }
                    onChange={ this.handleChange }
                    required
                  />
                </label>
                <br />
                <label htmlFor="image">
                  {' '}
                  Imagem:
                  <input
                    className="input-infos"
                    data-testid="edit-input-image"
                    type="text"
                    name="image"
                    defaultValue={ image }
                    onChange={ this.handleChange }
                    required
                  />
                </label>
                <br />
                <button
                  data-testid="edit-button-save"
                  type="submit"
                  disabled={ isDisabled }
                  onClick={ this.handleSubmit }
                >
                  Salvar

                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    );
  }
}
ProfileEdit.propTypes = {
  history: PropTypes.string.isRequired,
};
