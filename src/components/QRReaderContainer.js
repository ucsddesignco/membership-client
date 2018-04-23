import React, { Component } from 'react';
import QrReader from 'react-qr-reader';
import axios from 'axios';
import successImg from './success.png';
import failImg from './fail.png';
import Loading from './Loading';

class QRReaderContainer extends Component {
  state = {
    delay: 300,
    success: null,
    loading: false,
    error: null,
  };

  handleScan = data => {
    if (data) {
      console.log(data);
      this.setState({
        loading: true,
      });

      axios
        .post('https://datu-membership.herokuapp.com/checkin', {
          email: data,
          token: JSON.parse(localStorage.getItem('token')),
        })
        .then(res => {
          this.setState({
            loading: false,
            error: null,
            success: res.data.message,
          });
        })
        .catch(err => {
          if (err.response.status === 409) {
            this.setState({
              loading: false,
              error: err.response.data.message,
              success: null,
            });
          } else if (err.response.status === 404) {
            this.setState({
              loading: false,
              error: 'Could not find sign up',
              success: null,
            });
          } else {
            this.setState({
              loading: false,
              error: 'Something went wrong',
              success: null,
            });
          }
        });
    }
  };

  handleError = err => {
    this.setState({
      error: err,
    });
  };

  handleRetry = () => {
    this.setState({
      loading: false,
      error: null,
      success: null,
    });
  };

  handleFormSubmit = e => {
    e.preventDefault();

    this.handleScan(this.email.value);
  };

  render() {
    const { loading, error, success } = this.state;

    if (loading) {
      return (
        <div className="container">
          <Loading />
        </div>
      );
    }

    if (error) {
      return (
        <div className="container">
          <img className="status-icon" src={failImg} alt="Fail" />
          <h2 className="error-text">{error}</h2>
          <button
            className="retry-button retry-button--fail"
            onClick={this.handleRetry}
          >
            Try again?
          </button>
        </div>
      );
    }

    if (success) {
      return (
        <div className="container">
          <img className="status-icon" src={successImg} alt="Success" />
          <h2 className="success-text">{success} has been checked in</h2>
          <button
            className="retry-button retry-button--success"
            onClick={this.handleRetry}
          >
            Check in another
          </button>
        </div>
      );
    }

    return (
      <div>
        <QrReader
          delay={this.state.delay}
          onError={this.handleError}
          onScan={this.handleScan}
        />
        <h3>Scan QR</h3>
        <h3>or</h3>
        <h3>Enter Email:</h3>
        <form onSubmit={this.handleFormSubmit}>
          <input
            ref={input => {
              this.email = input;
            }}
            id="email-input"
            type="email"
            placeholder="Email"
          />
          <button id="email-submit" type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default QRReaderContainer;
