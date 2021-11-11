import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <p>TrybeTunes</p>
        <div>
          <Switch>
            <Route path="/" exact component={ Login } />
            <Route path="/search" exact component={ Search } />
            <Route path="/Album/:id" exact component={ Album } />
            <Route path="/favorites" exact component={ Favorites } />
            <Route path="/profile" exact component={ Profile } />
            <Route path="/profile/edit" exact component={ ProfileEdit } />
            <Route path="*" component={ NotFound } />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
