import React from "react";
import CreateOrderForm from "./CreateOrderForm";
import OrdersView from "./OrdersView";

class AdminView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { view: "create-order" };
  }

  openCreateOrder = () => {
    this.setState({ view: "create-order" });
  };

  openShowOrders = () => {
    this.setState({ view: "show-orders" });
  };

  getView = () => {
    let { view } = this.state;
    if (view === "create-order") {
      return <CreateOrderForm openShowOrders={this.openShowOrders} />;
    } else if (view === "show-orders") {
      return <OrdersView />;
    }
  };

  render() {
    return (
      <div className="mt-2">
        <div className="d-flex align-items-center justify-content-center">
          <div className="mr-2">
            <button onClick={this.openCreateOrder} className="btn btn-primary">
              Create order
            </button>
          </div>
          <div>
            <button onClick={this.openShowOrders} className="btn btn-dark">
              Show orders
            </button>
          </div>
        </div>
        <hr />
        {this.getView()}
      </div>
    );
  }
}

export default AdminView;
