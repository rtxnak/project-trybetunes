import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      musics: [],
      onLoad: true,
    };

    this.getMusicsFromAlbum = this.getMusicsFromAlbum.bind(this);
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.getMusicsFromAlbum(id);
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

  render() {
    const {
      musics,
      onLoad,
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
