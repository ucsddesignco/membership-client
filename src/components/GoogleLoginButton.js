import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import GoogleLogin from 'react-google-login';

class GoogleLoginButton extends Component {
  handleSuccess = res => {
    localStorage.setItem('token', JSON.stringify(res.tokenObj));
    this.props.history.push('/checkin');
  };

  handleFailure = res => {
    console.log(res);
  };

  render() {
    return (
      <div className="container">
        <GoogleLogin
          clientId="191497977985-it7pfni6b9nbbqre8amqtqet3v7hnl2h.apps.googleusercontent.com"
          buttonText="Login with Google"
          onSuccess={this.handleSuccess}
          onFailure={this.handleFailure}
          scope="https://www.googleapis.com/auth/spreadsheets"
        />
      </div>
    );
  }
}

export default withRouter(GoogleLoginButton);
