import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Profile extends Component {
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
    console.log(userInfo);
    this.setState({
      userLogin: userInfo,
      onLoad: false,
    });
  }

  render() {
    const {
      userLogin,
      onLoad,
    } = this.state;

    return (
      <div
        data-testid="page-profile"
      >
        <Header />
        {onLoad && <Loading />}
        {!onLoad && (
          <div>
            <h1>Profile</h1>
            <p>
              { userLogin.name }
            </p>
            { console.log(userLogin) }
            <p>
              { userLogin.email }
            </p>
            <p>
              { userLogin.description }
            </p>
            <img
              data-testid="profile-image"
              src={ userLogin.image }
              alt={ `foto de usuário ${userLogin.name}` }
            />
            <Link to="/profile/edit">
              <p>Editar perfil</p>
            </Link>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
