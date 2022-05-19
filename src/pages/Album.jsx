import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

export default class Album extends React.Component {
  state = {
    musicIndex: {
      artistName: '',
      collectionName: '',
    },
    loading: false,
    musicGeral: [],
  };

  async componentDidMount() {
    await this.musicId();
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
      console.log(musics);
      // const musicasGerais = musicas.map(
      //   ({
      //     previewUrl,
      //     trackName,
      //     artworkUrl100,
      //     collectionName,
      //     artistName,
      //   }) => ({ previewUrl,
      //     trackName,
      //     artworkUrl100,
      //     collectionName,
      //     artistName }),
      // );
      this.setState({ musicGeral: musicas, musicIndex: musicaPosicao0 });
    });
  };

  render() {
    const { musicGeral, loading, musicIndex } = this.state;

    // console.log(musicGeral);
    const { artistName, collectionName } = musicIndex;
    // const { previewUrl, trackName, artworkUrl100 } = musicGeral;
    return (
      <div data-testid="page-album">
        <Header />
        { loading
        && (
          <div>
            <h1 data-testid="artist-name">{artistName}</h1>
            <h2 data-testid="album-name">{collectionName}</h2>

            <div>
              {musicGeral.map((music) => (
                <MusicCard
                  key={ music.trackName }
                  trackName={ music.trackName }
                  previewUrl={ music.previewUrl }
                  artworkUrl100={ music.artworkUrl100 }
                />
              ))}
            </div>

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
