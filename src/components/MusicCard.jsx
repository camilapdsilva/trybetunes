import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class MusicCard extends React.Component {
state ={
  loading: false,
  // favoritas: [],
  carregandoFavoritos: false,
  // idFavoritas: [],
  // isChecked: false,
}

async componentDidMount() {
  this.setState({ carregandoFavoritos: true });
  await getFavoriteSongs();
  this.setState({ carregandoFavoritos: false,
    // favoritas: melhores,
  });
}

   changeFavorita = async () => {
     const { trackName, previewUrl, artworkUrl100, trackId } = this.props;
     this.setState({ loading: true });
     await addSong({ trackName, previewUrl, artworkUrl100, trackId });
     this.setState({ loading: false });
   }

   render() {
     const { trackName, previewUrl, artworkUrl100, trackId } = this.props;
     const { loading, carregandoFavoritos } = this.state;
     return (
       <div>
         {loading && <div>Carregando...</div>}
         {carregandoFavoritos ? <div>Carregando...</div> : (
           <div>
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
                 //  checked={ isChecked }
                 data-testid={ `checkbox-music-${trackId}` }
                 onClick={ this.changeFavorita }
               />
             </label>
           </div>
         )}
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
