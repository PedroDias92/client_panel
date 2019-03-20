import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import Spinner from "../layout/Spinner";

class Clients extends Component {
  state = {
    totalOwed: null
  };

  static getDerivedStateFromProps(props, state) {
    const { clients } = props;
    if (clients) {
      //add balances
      const total = clients.reduce((total, client) => {
        return total + parseFloat(client.balance);
      }, 0);
      return { totalOwed: total };
    }
    return null;
  }

  render() {
    const { clients } = this.props;
    const { totalOwed } = this.state;
    /* const clients = [
      {
        id: "123",
        firstName: "pedro",
        lastName: "dias",
        email: "pedrrdasdsa",
        balance: "123"
      }
    ];
 */
    if (clients) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <h2>
                <i className="fas fa-users" /> Clients
              </h2>
            </div>
            <div className="col-md-6">
              <h5 className="text-right text-secondary mt-1">
                Total Owed:{" "}
                <span className="text-primary">
                  ${parseFloat(totalOwed).toFixed(2)}
                </span>
              </h5>
            </div>
            <table className="table table-striped">
              <thead className="">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Balance</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {clients.map(client => (
                  <tr key={client.id}>
                    <td>
                      {client.firstName} {client.lastName}
                    </td>
                    <td>{client.email}</td>
                    <td>${parseFloat(client.balance).toFixed(2)}</td>
                    <td>
                      <Link
                        to={`/client/${client.id}`}
                        className="btn btn-secondary btn-sm"
                      >
                        <i className="fas fa-arrow-circle-right" /> Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

/* export default Clients; */

Clients.propTypes = {
  firestore: PropTypes.object.isRequired,
  clients: PropTypes.array
};

export default compose(
  //does the link between firebase and props
  firestoreConnect([{ collection: "clients" }]), //getting the collection 'clients'
  connect((state, props) => ({
    //puts 'clients' in props, the state comes from firestore, ordered is where clients is
    clients: state.firestore.ordered.clients
  }))
)(Clients);
