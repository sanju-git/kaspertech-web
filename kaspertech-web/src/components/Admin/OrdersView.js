import React from "react";
import AdminService from "../../services/AdminService";

class OrdersView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    AdminService.getAllOrders().then((response) => {
      if (response.success) {
        this.setState({ orders: response.orders });
      }
    });
  }

  render() {
    let { orders = [] } = this.state;
    if (orders && orders.length >= 1) {
      return (
        <div className="table-responsive">
          <table className="table table-cart">
            <thead>
              <tr>
                <th>Description</th>
                <th>Start</th>
                <th>End</th>
                <th>Rider</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr>
                  <td>{order.description}</td>
                  <td>{order.start}</td>
                  <td>{order.end}</td>
                  <td>
                    {order.rider}
                    {order.coordinates && (
                      <div>
                        <span>
                          {" Rider co-ordinates :" + order.coordinates}
                        </span>
                      </div>
                    )}
                  </td>
                  <td>
                    {order.status === "pending" && (
                      <span className="btn-warning">Pending</span>
                    )}
                    {order.status === "accepted" && (
                      <div>
                        <span className="btn-primary">Order accepted</span>
                      </div>
                    )}
                    {order.status === "rejected" && (
                      <span className="btn-danger">
                        Order declined by Rider
                      </span>
                    )}
                    {order.status === "finished" && (
                      <span className="btn-success">
                        Order Delivered successfully
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else {
      return <div>No Orders</div>;
    }
  }
}

export default OrdersView;
