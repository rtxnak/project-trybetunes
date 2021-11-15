import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Search extends Component {
  render() {
    const {
      searchInput,
      onInputChange,
    } = this.props;

    const TWO = 2;
    const isButtonDisabled = searchInput.length < TWO;
    return (

      <div
        data-testid="page-search"
      >
        <Header />

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
          // onClick={}
          type="submit"
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

Search.propTypes = {
  searchInput: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
};

export default Search;
