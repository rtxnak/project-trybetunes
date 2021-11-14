import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      userLogin: '',
      onLoad: true,
    };
  }

  componentDidMount() {
    this.setUserInfoID();
  }

  async setUserInfoID() {
    const userInfo = await getUser();
    // console.log(userInfo);
    this.setState({ userLogin: userInfo });
    this.setState({ onLoad: false });
  }

  render() {
    const {
      userLogin,
      onLoad,
    } = this.state;

    return (
      <header data-testid="header-component">
        {onLoad && <Loading />}
        <p data-testid="header-user-name">
          {`LoginID: ${userLogin.name}`}
        </p>

      </header>
    );
  }
}

export default Header;
