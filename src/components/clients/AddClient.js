import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose } from "redux";
import PropTypes from "prop-types";
import { firestoreConnect } from "react-redux-firebase";

class AddClient extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    balance: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const { firestore, history } = this.props;
    const newClient = this.state;

    //if no balance make 0
    if (newClient.balance === "") {
      newClient.balance = "0";
    }

    firestore //need collection and object
      .add({ collection: "clients" }, newClient)
      .then(() => history.push("/")); //send back to home page
  };

  render() {
    const { firstName, lastName, email, phone, balance } = this.state;
    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <Link to="/" className="btn btn-link">
              <i className="fas fa-arrow-circle-left" /> Back to Dashboard
            </Link>
          </div>
        </div>

        <div className="card">
          <div className="card-header">Add Client</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  required
                  minLength="2"
                  placeholder="Enter first name ..."
                  value={this.state.firstName}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  minLength="2"
                  required
                  placeholder="Enter last name ..."
                  value={this.state.lastName}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  minLength="2"
                  placeholder="Enter email ..."
                  value={email}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  minLength="9"
                  required
                  placeholder="Enter phone number ..."
                  value={phone}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="balance">Balance</label>
                <input
                  type="text"
                  className="form-control"
                  name="balance"
                  placeholder="Enter balance ..."
                  value={balance}
                  onChange={this.handleChange}
                />
              </div>
              <input
                type="submit"
                value="Submit"
                className="btn btn-primary btn-block"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

AddClient.propTypes = {
  firestore: PropTypes.object.isRequired
};

export default firestoreConnect()(AddClient); //connect to firestore
