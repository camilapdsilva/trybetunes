import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';

export default class MusicCard extends React.Component {
state ={
  // favorita: {},
  // isChecked: false,
  loading: false,
}

componentDidMount() {
  this.changeFavorita();
}

    changeFavorita = async () => {
      const { trackName, previewUrl, artworkUrl100, trackId } = this.props;
      this.setState({ loading: true });
      await addSong({ trackName, previewUrl, artworkUrl100, trackId });
      this.setState({ loading: false });
    }

    render() {
      const { trackName, previewUrl, artworkUrl100, trackId } = this.props;
      const { loading } = this.state;
      return (
        <div>
          {loading && <div>Carregando...</div>}
          <img src={ artworkUrl100 } alt="artwork" />
          <p>{trackName}</p>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            <code>audio</code>

          </audio>
          <label htmlFor="favorita">
            Favorita
            <input
              id="favorita"
              type="checkbox"
              name="favorita"
              // checked={ isChecked }
              data-testid={ `checkbox-music-${trackId}` }
              onClick={ this.changeFavorita }
            />
          </label>
        </div>
      );
    }
}
MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  artworkUrl100: PropTypes.string.isRequired,
  trackId: PropTypes.string.isRequired,
};
