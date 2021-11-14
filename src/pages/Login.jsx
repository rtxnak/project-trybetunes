import React, { Component } from 'react';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';

class Login extends Component {
  render() {
    const {
      loginNameInput,
      onLoad,
      createUserIsOk,
      onInputChange,
      onClickButton,
    } = this.props;

    const THREE = 3;
    const isButtonDisabled = loginNameInput.length < THREE;

    return (
      <div data-testid="page-login">
        <input
          name="loginNameInput"
          data-testid="login-name-input"
          type="text"
          value={ loginNameInput }
          onChange={ onInputChange }
        />
        <button
          disabled={ isButtonDisabled }
          data-testid="login-submit-button"
          onClick={ onClickButton }
          type="submit"
        >
          Entrar
        </button>
        {onLoad && <Loading />}
        {createUserIsOk && <Redirect to="/search" />}
      </div>
    );
  }
}

Login.propTypes = {
  loginNameInput: PropTypes.string.isRequired,
  onLoad: PropTypes.bool.isRequired,
  createUserIsOk: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onClickButton: PropTypes.func.isRequired,
};

export default Login;
