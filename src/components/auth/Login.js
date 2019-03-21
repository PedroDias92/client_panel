import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreBase, firebaseConnect } from "react-redux-firebase";
import Spinner from "../layout/Spinner";
import classnames from "classnames";
import { notifyUser } from "../../actions/notifyAction";
import Alert from "../layout/Alert";

class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  //binding
  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    const { firebase, notifyUser } = this.props;
    const { email, password } = this.state;
    //console.log(e);
    //console.log(this.state);
    firebase
      .login({
        email,
        password
      })
      .catch(err => notifyUser("Invalid Login Credentials", "error"));
  };

  render() {
    const { message, messageType } = this.props.notify;
    return (
      <div>
        <div className="row">
          {/* puts on the middle */}
          <div className="col-md-6 mx-auto">
            <div className="card mt-4">
              <div className="card-body">
                {message ? (
                  <Alert message={message} messageType={messageType} />
                ) : null}
                <h1 className="text-center pb-4 pt-3">
                  <span className="text-primary">
                    <i className="fas fa-lock" /> Login
                  </span>
                </h1>
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="text"
                      name="email"
                      required
                      value={this.state.email}
                      className="form-control"
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password" //makes "invisible" when typing
                      name="password"
                      required
                      value={this.state.password}
                      className="form-control"
                      onChange={this.onChange}
                    />
                  </div>
                  <input type="submit" className="btn btn-primary btn-block" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  firebase: PropTypes.object.isRequired
};

export default compose(
  firebaseConnect(),
  connect(
    (state, props) => ({
      notify: state.notify
    }),
    { notifyUser }
  )
)(Login);
