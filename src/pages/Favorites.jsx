import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class Favorites extends React.Component {
  state = {
    favoritas: [],
    carregandoFavoritos: false,
    loading2: false,
  }

  async componentDidMount() {
    this.setState({ carregandoFavoritos: true });
    const favoritas = await getFavoriteSongs();
    this.setState({ favoritas, carregandoFavoritos: false });
  }

  desfavorita = async ({ target }) => {
    this.setState({ loading2: true });
    const { favoritas } = this.state;
    const { name } = target;
    const mSelection = favoritas.find((item) => item.trackId === Number(name));
    await removeSong(mSelection);
    const Atual = favoritas.filter((music) => music.trackId !== mSelection.trackId);
    this.setState({ favoritas: Atual,
      loading2: false });
  }

  render() {
    const { favoritas, carregandoFavoritos, loading2 } = this.state;
    console.log(favoritas);
    return (
      <div data-testid="page-favorites">
        <Header />
        <h1>Sou Favorites</h1>
        { loading2 && <p>Carregando...</p>}
        { carregandoFavoritos ? <p>Carregando...</p> : (
          <div>
            {favoritas.map((music) => (
              <MusicCard
                key={ music.trackName }
                trackName={ music.trackName }
                previewUrl={ music.previewUrl }
                trackId={ music.trackId }
                favoritas={ favoritas }
                changeFavorita={ this.desfavorita }
              />
            ))}
          </div>

        )}
      </div>
    );
  }
}
