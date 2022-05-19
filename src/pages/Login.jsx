import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';

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
    <div data-testid="page-login">

      {loading ? <div>Carregando...</div> : (
        <div>
          <h1>Login</h1>
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
