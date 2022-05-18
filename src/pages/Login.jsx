import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';

export default class Login extends React.Component {
state = {
  loading: false,
  redirect: false,
}

saveNewUser = () => {
  const { nomeDigitado } = this.props;
  this.setState({ loading: true }, async () => {
    await createUser({ name: nomeDigitado });
    this.setState({ loading: false, redirect: true });
  });
}

render() {
  const { isLoginButtonDisabled, onInput, nomeDigitado } = this.props;
  const { loading, redirect } = this.state;

  return (
    <div data-testid="page-login">
      {redirect && <Redirect to="/search" /> }

      {loading && <div>Carregando...</div>}

      <h1>Login</h1>
      <form>
        <label htmlFor="login-name-input">
          <input
            id="login-name-input"
            type="text"
            placeholder="Username"
            data-testid="login-name-input"
            value={ nomeDigitado }
            onChange={ onInput }
          />
        </label>
        <button
          className="entrar"
          name="nomeDigitado"
          type="submit"
          data-testid="login-submit-button"
          disabled={ isLoginButtonDisabled }
          onClick={ this.saveNewUser }
        >
          Entrar

        </button>
      </form>

    </div>
  );
}
}

Login.propTypes = {
  isLoginButtonDisabled: PropTypes.bool.isRequired,
  onInput: PropTypes.func.isRequired,
  nomeDigitado: PropTypes.string.isRequired,
};
