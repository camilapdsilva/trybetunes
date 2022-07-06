import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import './Album.css';

export default class Album extends React.Component {
  state = {
    musicIndex: {
      artistName: '',
      collectionName: '',
      artworkUrl100: '',
    },
    loading: false,
    musicGeral: [],
    loading2: false,
    favoritas: [],
    carregandoFavoritos: false,
  };

  async componentDidMount() {
    await this.musicId();
    this.atualizaFavoritos();
  }

  atualizaFavoritos = async () => {
    this.setState({ carregandoFavoritos: true });
    const favoritas = await getFavoriteSongs();
    this.setState({ carregandoFavoritos: false, favoritas });
  }

  changeFavorita = async ({ target }) => {
    this.setState({ loading2: true });
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const { checked, name } = target;
    const { favoritas } = this.state;
    const musicaClicada = await getMusics(id);
    const musicSelection = musicaClicada.find((item) => item.trackId === Number(name));
    // console.log(id);
    if (checked) {
      await addSong(musicSelection);
      this.setState((prevState) => ({
        favoritas: [...prevState.favoritas, musicSelection], loading2: false }));
      // this.atualizaFavoritos();
    }
    if (!checked) {
      await removeSong(musicSelection);
      const Atual = favoritas.filter((music) => music.trackId !== musicSelection.trackId);
      this.setState({ favoritas: Atual,
        loading2: false });
      // this.atualizaFavoritos();
    }
  }

  musicId = async () => {
    const {
      match: {
        params: { id },
      },
    } = this.props;

    this.setState({ loading: true }, async () => {
      const musics = await getMusics(id);
      const musicaPosicao0 = musics[0];
      const musicas = musics.filter((musica) => musica.kind === 'song');
      this.setState({ musicGeral: musicas, musicIndex: musicaPosicao0 });
    });
  };

  render() {
    const { musicGeral,
      loading,
      musicIndex,
      carregandoFavoritos,
      favoritas,
      loading2 } = this.state;
    const { artistName, collectionName, artworkUrl100 } = musicIndex;
    return (
      <div
        className="album-container"
        data-testid="page-album"
      >
        <Header />
        { loading
        && (

          <div className="container-album-title-musics">
            <div className="container-album-title">
              <img className="img-album" src={ artworkUrl100 } alt="album" />

              <div>
                <h1
                  className="album-title1"
                  data-testid="artist-name"
                >
                  {artistName}

                </h1>

                <h2
                  className="album-title2"
                  data-testid="album-name"
                >
                  {collectionName}

                </h2>
              </div>
            </div>
            {loading2 && <h1 className="album-title1">Carregando...</h1>}
            {carregandoFavoritos ? <h1 className="album-title1">Carregando...</h1> : (

              <div className="container-audios">
                {musicGeral.map((music) => (
                  <MusicCard
                    key={ music.trackName }
                    trackName={ music.trackName }
                    previewUrl={ music.previewUrl }
                    trackId={ music.trackId }
                    favoritas={ favoritas }
                    changeFavorita={ this.changeFavorita }
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
