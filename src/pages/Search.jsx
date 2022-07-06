import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import './Search.css';

export default class Search extends React.Component {
  state = {
    artista: '',
    isDisabled: true,
    loading: false,
    biblioteca: [],
    lastSearch: false,
    showArtista: '',
  }

  cardAlbum = () => {
    const { biblioteca } = this.state;
    if (biblioteca.length === 0) {
      return <p className="nenhum-album">Nenhum álbum foi encontrado</p>;
    }
    return biblioteca.map((item) => (

      <p key={ item.collectionId }>
        <Link
          className="search-lista"
          data-testid={ `link-to-album-${item.collectionId}` }
          to={ `/album/${item.collectionId}` }
        >
          {item.collectionName}
          {' '}

        </Link>
      </p>

    ));
  }

  artistSearch = async (event) => {
    event.preventDefault();
    const { artista } = this.state;
    this.setState({ loading: true, showArtista: artista });
    const album = await searchAlbumsAPI(artista);
    this.setState({ loading: false, artista: '', lastSearch: true, biblioteca: album });
    this.cardAlbum();
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
    const { isDisabled, artista, loading, lastSearch, showArtista } = this.state;
    return (
      <div data-testid="page-search">
        { loading ? <p>Carregando...</p>
          : (
            <div className="container-search">
              <Header />

              <form className="form-horizontal">
                <label htmlFor="busca">
                  <input
                    className="input-search"
                    id="busca"
                    type="text"
                    name="artista"
                    data-testid="search-artist-input"
                    value={ artista }
                    onChange={ this.onInput }
                  />
                </label>

                <button
                  className="search-button"
                  data-testid="search-artist-button"
                  type="button"
                  disabled={ isDisabled }
                  onClick={ this.artistSearch }
                >
                  Pesquisar

                </button>
              </form>

              { lastSearch
                && (
                  <p className="search-p-result">
                    Resultado de álbuns de:
                    {' '}
                    {showArtista }
                  </p>
                )}

              <p className="search-lista">{this.cardAlbum()}</p>
            </div>
          )}
      </div>
    );
  }
}
