import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import './Login.css';
import fone from './fone-de-ouvido.png';

export default class Login extends React.Component {
state = {
  loading: false,
  name: '',
  isLoginButtonDisabled: true,
}

saveNewUser = async () => {
  const { name } = this.state;
  const { history } = this.props;
  this.setState({ loading: true });
  await createUser({ name });
  history.push('search');
}

validaEntrada = () => {
  const { name } = this.state;
  const max = 3;
  if (name.length >= max) {
    return this.setState({ isLoginButtonDisabled: false });
  }
  return this.setState({ isLoginButtonDisabled: true });
}

onInput = ({ target }) => {
  const { name, value } = target;
  this.setState({ [name]: value }, () => this.validaEntrada());
}

render() {
  const { loading, name, isLoginButtonDisabled } = this.state;

  return (
    <div
      className="login"
      data-testid="page-login"
    >
      <div className="container-trybetunes">
        <img
          className="fone"
          src={ fone }
          alt="fone de ouvido"
        />
        <span className="trybetunes">TrybeTunes</span>
      </div>

      {loading ? <h1 className="login2">Carregando...</h1> : (
        <div
          className="login2"
        >
          <h1>Login: </h1>
          <form>
            <label htmlFor="login-name-input">
              <input
                id="login-name-input"
                type="text"
                name="name"
                placeholder="Username"
                data-testid="login-name-input"
                value={ name }
                onChange={ this.onInput }
              />
            </label>
            <button
              className="entrar"
              name="nomeDigitado"
              type="button"
              data-testid="login-submit-button"
              disabled={ isLoginButtonDisabled }
              onClick={ this.saveNewUser }
            >
              Entrar

            </button>
          </form>
        </div>
      )}
    </div>
  );
}
}

Login.propTypes = {
  history: PropTypes.string.isRequired,
};
