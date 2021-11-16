import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import {
  getFavoriteSongs,
  removeSong,
} from '../services/favoriteSongsAPI';

class Favorites extends Component {
  constructor() {
    super();

    this.state = {
      onLoad: true,
      favoriteList: [],
    };

    this.checkedChanges = this.checkedChanges.bind(this);
    this.getFavoriteSongsOnload = this.getFavoriteSongsOnload.bind(this);
  }

  componentDidMount() {
    this.getFavoriteSongsOnload();
  }

  async getFavoriteSongsOnload() {
    const favoriteSongs = await getFavoriteSongs();
    this.setState({
      onLoad: false,
      favoriteList: [...favoriteSongs],
    });
  }

  async checkedChanges(
    {
      target:
        { id,
          checked,
        },
    },
  ) {
    const {
      favoriteList,
    } = this.state;
    const idNumber = parseInt(id, 10);
    // console.log(id);
    const trackInfo = favoriteList.find((music) => music.trackId === idNumber);
    // console.log(trackInfo);
    this.setState({
      onLoad: true,
    });

    if (checked) {
      await addSong(trackInfo);
      this.getFavoriteSongsOnload();
    } else {
      await removeSong(trackInfo);
      this.getFavoriteSongsOnload();
    }
  }

  render() {
    const {
      onLoad,
      favoriteList,
    } = this.state;

    return (
      <div
        data-testid="page-favorites"
      >
        <Header />
        Favorites
        {onLoad && <Loading />}
        {!onLoad && favoriteList
          .filter((music) => music.trackName)
          .map((music) => (
            <MusicCard
              key={ music.trackId }
              trackName={ music.trackName }
              previewUrl={ music.previewUrl }
              checkedChanges={ this.checkedChanges }
              trackId={ music.trackId }
              checkedFavorite={ favoriteList.find(
                (element) => element.trackId === music.trackId,
              ) }
            />
          ))}
      </div>
    );
  }
}

export default Favorites;
