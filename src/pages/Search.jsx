import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';

class Search extends Component {
  render() {
    const {
      searchInput,
      onInputChange,
      onClickSearchButton,
      onLoad,
      searchedAlbums,
      onSearchInput,
    } = this.props;

    const searchedAlbumsNotEmpty = searchedAlbums.length > 0;

    const TWO = 2;
    const isButtonDisabled = searchInput.length < TWO;
    return (

      <div
        data-testid="page-search"
      >
        <Header />
        {onLoad ? <Loading /> : (
          <>
            <input
              name="searchInput"
              data-testid="search-artist-input"
              type="text"
              value={ searchInput }
              onChange={ onInputChange }
            />
            <button
              disabled={ isButtonDisabled }
              data-testid="search-artist-button"
              onClick={ onClickSearchButton }
              type="submit"
            >
              Pesquisar
            </button>
          </>
        )}

        {
          onSearchInput
            ? <p>{`Resultado de álbuns de: ${onSearchInput}`}</p> : ''
        }

        { !searchedAlbumsNotEmpty && onSearchInput && <p>Nenhum álbum foi encontrado</p> }

        { searchedAlbumsNotEmpty && searchedAlbums.map((album) => (
          <li key={ album.collectionId }>
            <Link
              to={ `/album/${album.collectionId}` }
              data-testid={ `link-to-album-${album.collectionId}` }
            >
              <img
                src={ album.artworkUrl100 }
                alt={ album.collectionName }
              />
              <span>{album.collectionName}</span>
            </Link>
          </li>
        ))}
      </div>
    );
  }
}

Search.propTypes = {
  searchInput: PropTypes.string.isRequired,
  onLoad: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onClickSearchButton: PropTypes.func.isRequired,
  searchedAlbums: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSearchInput: PropTypes.string.isRequired,
};

export default Search;
