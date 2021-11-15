import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Search from '../pages/Search';
import Album from '../pages/Album';
import Favorites from '../pages/Favorites';
import Profile from '../pages/Profile';
import ProfileEdit from '../pages/ProfileEdit';
import NotFound from '../pages/NotFound';
import { createUser } from '../services/userAPI';
import searchAlbumsAPIs from '../services/searchAlbumsAPI';
// import getMusics from '../services/musicsAPI';

class Content extends React.Component {
  constructor() {
    super();

    this.onInputChange = this.onInputChange.bind(this);
    this.onClickButton = this.onClickButton.bind(this);
    this.onClickSearchButton = this.onClickSearchButton.bind(this);
    this.searchAlbums = this.searchAlbums.bind(this);
    // this.getMusicsFromAlbum = this.getMusicsFromAlbum.bind(this);

    this.state = {
      loginNameInput: '',
      onLoad: false,
      createUserIsOk: false,
      searchInput: '',
      onSearchInput: '',
      searchedAlbums: [],
      // musics: [],
    };
  }

  onInputChange({ target }) {
    const { name } = target;
    const { value } = target;
    this.setState({
      [name]: value,
    });
  }

  async onClickButton() {
    const { loginNameInput } = this.state;
    this.setState({
      onLoad: true,
    });
    await createUser({ name: loginNameInput });
    this.setState({ createUserIsOk: true });
    this.setState({
      onLoad: false,
    });
  }

  async onClickSearchButton() {
    const { searchInput } = this.state;
    this.setState({
      onLoad: true,
      onSearchInput: searchInput,
    });
    await this.searchAlbums();
  }

  // async getMusicsFromAlbum(id) {
  //   const getMusicsResult = await getMusics(id);
  //   this.setState({
  //     musics: [...getMusicsResult],
  //   });
  // }

  async searchAlbums() {
    const { searchInput } = this.state;
    const searchAlbumsResult = await searchAlbumsAPIs(searchInput);
    // console.log(searchAlbumsResult);
    this.setState({
      searchedAlbums: [...searchAlbumsResult],
      onLoad: false,
      searchInput: '',
    });
  }

  render() {
    const {
      loginNameInput,
      onLoad,
      createUserIsOk,
      searchInput,
      searchedAlbums,
      onSearchInput,
      // musics,
    } = this.state;

    return (
      <main className="Content">
        <Switch>
          <Route
            path="/"
            exact
            render={
              () => (<Login
                loginNameInput={ loginNameInput }
                onLoad={ onLoad }
                createUserIsOk={ createUserIsOk }
                onInputChange={ this.onInputChange }
                onClickButton={ this.onClickButton }
              />)
            }
          />
          <Route
            path="/search"
            exact
            render={
              () => (<Search
                searchInput={ searchInput }
                onLoad={ onLoad }
                onInputChange={ this.onInputChange }
                onClickSearchButton={ this.onClickSearchButton }
                searchedAlbums={ searchedAlbums }
                onSearchInput={ onSearchInput }
              />)
            }
          />
          <Route
            path="/Album/:id"
            exact
            component={ Album }
            // render={
            //   () => (<Album
            //     onLoad={ onLoad }
            //     musics={ musics }
            //     getMusicsFromAlbum={ this.getMusicsFromAlbum }
            //   />)
            // }
          />
          <Route path="/favorites" exact component={ Favorites } />
          <Route path="/profile" exact component={ Profile } />
          <Route path="/profile/edit" exact component={ ProfileEdit } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </main>
    );
  }
}

export default Content;
