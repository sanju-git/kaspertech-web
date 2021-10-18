import React from "react";
import RiderService from "../../services/RiderService";

class RiderView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { askName: true };
  }

  onChangeName = (e) => {
    this.setState({ name: e.target.value });
  };

  validateRider = () => {
    let { name } = this.state;
    RiderService.validateRider(name).then((response) => {
      if (response.success) {
        if (response.valid) {
          this.getRiderOrders(name);
        } else {
          this.setState({ message: "Rider name does not exist" });
        }
      }
    });
  };

  getRiderOrders = (name) => {
    RiderService.getRiderOrders(name).then((response) => {
      if (response.success) {
        if (response.orders.length >= 1) {
          this.setState({ orders: response.orders, askName: false });
        } else {
          this.setState({ askName: false });
        }
      }
    });
  };

  onChangeCoOrdinates = (e) => {
    this.setState({ coordinates: e.target.value });
  };

  changeOrderStatus = (status, orderId) => {
    let coordinates;
    let { name } = this.state;
    if (status === "accepted") {
      if (!this.state.coordinates) {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
          function showPosition(position) {
            coordinates =
              "latitude = " +
              position.coords.latitude +
              " Longitude = " +
              position.coords.longitude;
            RiderService.changeOrderStatus(status, orderId, coordinates).then(
              (response) => {
                if (response.success) {
                  this.getRiderOrders(name);
                }
              }
            );
          }
        }
      } else {
        coordinates = this.state.coordinates;
        RiderService.changeOrderStatus(status, orderId, coordinates).then(
          (response) => {
            if (response.success) {
              this.getRiderOrders(name);
            }
          }
        );
      }
    } else {
      RiderService.changeOrderStatus(status, orderId).then((response) => {
        if (response.success) {
          this.getRiderOrders(name);
        }
      });
    }
  };

  render() {
    let { name, askName, orders = [], message } = this.state;
    return (
      <React.Fragment>
        {askName ? (
          <div
            style={{ height: "100vh" }}
            className="d-flex align-items-center justify-content-center"
          >
            <div>
              {message && (
                <div
                  className="mb-2"
                  style={{ padding: 10, border: "1px solid red" }}
                >
                  {message}
                </div>
              )}
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={this.onChangeName}
              />
              <button
                onClick={this.validateRider}
                className="ml-2 btn btn-sm btn-success"
              >
                Submit
              </button>
            </div>
          </div>
        ) : (
          <React.Fragment>
            {orders && orders.length >= 1 ? (
              <div className="table-responsive">
                <table className="table table-cart">
                  <thead>
                    <tr>
                      <th>Description</th>
                      <th>Start</th>
                      <th>End</th>
                      <th>Status</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr>
                        <td>{order.description}</td>
                        <td>{order.start}</td>
                        <td>{order.end}</td>
                        <td>
                          {order.status === "pending" ? (
                            <React.Fragment>
                              <div>
                                <button
                                  onClick={() =>
                                    this.changeOrderStatus(
                                      "accepted",
                                      order._id
                                    )
                                  }
                                  className="btn btn-sm btn-success mr-2"
                                >
                                  Accept
                                </button>
                                <button
                                  onClick={() =>
                                    this.changeOrderStatus(
                                      "rejected",
                                      order._id
                                    )
                                  }
                                  className="btn btn-sm btn-danger"
                                >
                                  Reject
                                </button>
                              </div>
                              <div>
                                <div>
                                  <span>
                                    Co-ordinates(if not entered, default
                                    co-ordinates will be taken)
                                  </span>
                                </div>
                                <div>
                                  <input
                                    type="text"
                                    onChange={this.onChangeCoOrdinates}
                                  />
                                </div>
                              </div>
                            </React.Fragment>
                          ) : (
                            <span>{order.status}</span>
                          )}
                        </td>
                        <td>
                          {order.status === "accepted" && (
                            <button
                              onClick={() =>
                                this.changeOrderStatus("finished", order._id)
                              }
                              className="btn btn-success btn-sm"
                            >
                              Finish
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div
                style={{ height: "100vh" }}
                className="d-flex align-items-center justify-content-center"
              >
                <div>No orders for you</div>
              </div>
            )}
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}
export default RiderView;
