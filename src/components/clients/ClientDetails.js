import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import Spinner from "../layout/Spinner";
import classnames from "classnames";

class ClientDetails extends Component {
  state = {
    showBalanceUpdate: false,
    balanceUpdateAmount: ""
  };

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  //UPDATE BALANCE
  balanceSubmit = e => {
    e.preventDefault();
    console.log("update balance", this.state.balanceUpdateAmount);
    const { client, firestore } = this.props;
    const { balanceUpdateAmount } = this.state;
    const clientUpdate = {
      balance: parseFloat(balanceUpdateAmount)
    };
    //update in firestore
    firestore.update(
      {
        collection: "clients",
        doc: client.id
      },
      clientUpdate
    );
  };

  deleteCliente = () => {
    const { client, firestore, history } = this.props;
    firestore
      .delete({
        collection: "clients",
        doc: client.id
      })
      .then(() => history.push("/"));
  };

  render() {
    const { client } = this.props;
    const { showBalanceUpdate, balanceUpdateAmount } = this.state;

    let balanceForm = "";
    //if balance form should display
    if (showBalanceUpdate) {
      balanceForm = (
        <form onSubmit={this.balanceSubmit}>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              name="balanceUpdateAmount"
              placeholder="Add New Balance"
              value={balanceUpdateAmount}
              onChange={this.handleChange}
            />
            <div className="input-group-append">
              <input
                type="submit"
                className="btn btn-outline-dark"
                value="Update"
              />
            </div>
          </div>
        </form>
      );
    }

    if (client) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/" className="btn btn-link">
                <i className="fas fa-arrow-circle-left" />
                Back to Dashboard
              </Link>
            </div>
            <div className="col-md-6">
              <button
                onClick={this.deleteCliente}
                className="btn btn-danger float-right mt-2"
              >
                Delete
              </button>
              <div className="btn-group float-right mt-2">
                <Link to={`/client/edit/${client.id}`} className="btn btn-dark">
                  Edit
                </Link>
              </div>
            </div>
          </div>
          <hr />
          <div className="card">
            <h3 className="card-header">
              {client.firstName} {client.lastName}
            </h3>
            <div className="card-body">
              <div className="row">
                <div className="col-md-8 col-sn-6">
                  <h4>
                    Client ID:{" "}
                    <span className="text-secondary">{client.id}</span>
                  </h4>
                </div>
                <div className="col-md-4 col-sn-6">
                  <h3>
                    Balance:{" "}
                    <span
                      className={classnames({
                        "text-danger": parseFloat(client.balance) > 0,
                        "text-success": parseFloat(client.balance) === 0
                      })}
                    >
                      ${parseFloat(client.balance).toFixed(2)}
                    </span>
                    <small>
                      <a
                        href="#!"
                        onClick={() =>
                          this.setState({
                            showBalanceUpdate: !this.state.showBalanceUpdate
                          })
                        }
                      >
                        {" "}
                        <i className="fas fa-pencil-alt" />
                      </a>
                    </small>
                  </h3>
                  {balanceForm}
                </div>
              </div>
              <hr />
              <ul className="list-group">
                <li className="list-group-item">
                  Contact Email: {client.email}
                </li>
                <li className="list-group-item">
                  Contact Phone: {client.phone}
                </li>
              </ul>
            </div>
          </div>
        </div>
      );
    } else {
      return <Spinner />;
    }
    /* return (
      <div>
        <h1>ola</h1>oola
      </div>
    ); */
  }
}

ClientDetails.propTypes = {
  firestore: PropTypes.object.isRequired,
  client: PropTypes.object
};

export default compose(
  firestoreConnect(props => [
    { collection: "clients", storeAs: "client", doc: props.match.params.id }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    client: ordered.client && ordered.client[0]
  }))
)(ClientDetails);
