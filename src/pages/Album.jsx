import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import {
  addSong,
  getFavoriteSongs,
} from '../services/favoriteSongsAPI';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      musics: [],
      onLoad: true,
      favoriteList: [],
    };

    this.getMusicsFromAlbum = this.getMusicsFromAlbum.bind(this);
    this.checkedChanges = this.checkedChanges.bind(this);
    this.getFavoriteSongsOnload = this.getFavoriteSongsOnload.bind(this);
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.getMusicsFromAlbum(id);
    this.getFavoriteSongsOnload();
  }

  async getMusicsFromAlbum(id) {
    const getMusicsResult = await getMusics(id);
    // console.log(getMusicsResult);
    this.setState({
      musics: [...getMusicsResult],
    });
    this.setState({
      onLoad: false,
    });
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
      musics,
    } = this.state;
    const idNumber = parseInt(id, 10);
    // console.log(id);
    const trackInfo = musics.find((music) => music.trackId === idNumber);
    // console.log(trackInfo);
    this.setState({
      onLoad: true,
    });

    if (checked) {
      await addSong(trackInfo);
      this.setState({
        onLoad: false,
      });
      this.setState(({ favoriteList }) => ({
        favoriteList: [...favoriteList, trackInfo],
      }));
    } else {
      this.setState({
        onLoad: false,
      });
    }
  }

  render() {
    const {
      musics,
      onLoad,
      favoriteList,
    } = this.state;

    const artistName = !onLoad
    && musics[0].artistName;
    const albumName = !onLoad
    && musics[0].collectionName;

    return (
      <div
        data-testid="page-album"
      >
        <Header />
        {onLoad && <Loading />}
        <h3 data-testid="artist-name">{artistName}</h3>
        <h3 data-testid="album-name">{albumName}</h3>
        {!onLoad && musics
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
        {
        /* {!onLoad && musics.map((music) => (
          <li key={ music.trackId }>
            <span>{ music.trackName }</span>
          </li>
        ))}
        Posição 0 do musics é vazio */
        }
        {/* {console.log(favoriteList)} */}
      </div>

    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
