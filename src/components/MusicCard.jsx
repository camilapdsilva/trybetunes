import React from 'react';
import PropTypes from 'prop-types';
import './MusicCard.css';

export default class MusicCard extends React.Component {
  render() {
    const { trackName,
      previewUrl,
      trackId,
      favoritas,
      changeFavorita } = this.props;

    return (
      <div>
        <div className="card">
          <div>
            <p className="name-musica">{trackName}</p>
            <audio
              data-testid="audio-component"
              src={ previewUrl }
              controls
            >
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              <code>audio</code>
            </audio>
          </div>
          <label
            className="check-favorita"
            htmlFor="favorita"
          >
            Favorita:
            <input
              id="favorita"
              type="checkbox"
              name={ trackId }
              checked={ favoritas.some((item) => item.trackId === trackId) }
              data-testid={ `checkbox-music-${trackId}` }
              onChange={ changeFavorita }
            />
          </label>
        </div>
      </div>
    );
  }
}
MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  favoritas: PropTypes.shape([]).isRequired,
  changeFavorita: PropTypes.func.isRequired,
};
