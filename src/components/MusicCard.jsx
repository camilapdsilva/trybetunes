import React from 'react';
import PropTypes from 'prop-types';

export default class MusicCard extends React.Component {
  render() {
    const { trackName, previewUrl, artworkUrl100 } = this.props;
    return (
      <div>
        <img src={ artworkUrl100 } alt="artwork" />
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
      </div>
    );
  }
}
MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  artworkUrl100: PropTypes.string.isRequired,
};
