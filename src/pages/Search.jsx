import React from 'react';
import Header from '../components/Header';

export default class Search extends React.Component {
  state = {
    artista: '',
    isDisabled: true,
  }

  validaInput = () => {
    const { artista } = this.state;
    const max = 2;
    if (artista.length >= max) {
      return this.setState({ isDisabled: false });
    }
    return this.setState({ isDisabled: true });
  }

  onInput = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.validaInput());
  }

  render() {
    const { isDisabled, artista } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="busca">
            <input
              id="busca"
              type="text"
              name="artista"
              data-testid="search-artist-input"
              value={ artista }
              onChange={ this.onInput }
            />
          </label>

          <button
            data-testid="search-artist-button"
            type="button"
            disabled={ isDisabled }
          >
            Pesquisar

          </button>
        </form>
      </div>
    );
  }
}
