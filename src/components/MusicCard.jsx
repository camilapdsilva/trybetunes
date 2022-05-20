import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';

export default class MusicCard extends React.Component {
state ={
  loading: false,
  favoritas: [],
  carregandoFavoritos: false,
}

async componentDidMount() {
  this.setState({ carregandoFavoritos: true });
  const melhores = await getFavoriteSongs();
  this.setState({ carregandoFavoritos: false,
    favoritas: melhores,
  });
}

   changeFavorita = async ({ target }) => {
     const { trackId } = this.props;
     const { checked } = target;
     const { favoritas } = this.state;
     const musicaFavorita = await getMusics(trackId);
     if (checked) {
       await addSong(musicaFavorita);
       this.setState({ favoritas: [...favoritas, musicaFavorita] });
     }
     if (!checked) {
       await removeSong(trackId);
       const favoritasAtuais = favoritas.filter((musica) => musica.trackId !== trackId);
       this.setState({ favoritas: favoritasAtuais });
     }
   }

   render() {
     const { trackName, previewUrl, artworkUrl100, trackId } = this.props;
     const { loading, carregandoFavoritos, favoritas } = this.state;
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
                 checked={ favoritas.some((item) => item.trackId === trackId) }
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
