import React from "react";
import Select from "react-select";
import AdminService from "../../services/AdminService";

class CreateOrderForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.getRiderOptions();
  }

  getRiderOptions = () => {
    AdminService.getRiderOptions().then((response) => {
      if (response.success) {
        if (response.riders.length >= 1) {
          let riderOptions = [];
          response.riders.map((rider) => {
            riderOptions.push({ label: rider.name, value: rider.name });
          });
          this.setState({ riderOptions });
        }
      }
    });
  };

  onChangeDescription = (e) => {
    this.setState({ description: e.target.value });
  };

  onChangeStart = (e) => {
    this.setState({ start: e.target.value });
  };

  onChangeEnd = (e) => {
    this.setState({ end: e.target.value });
  };

  onChangeRider = (option) => {
    this.setState({ rider: option.value });
  };

  createOrder = (e) => {
    e.preventDefault();
    let { description, start, end, rider } = this.state;

    if (description && start && end && rider) {
      AdminService.createOrder({ description, start, end, rider }).then(
        (response) => {
          if (response.success) {
            this.props.openShowOrders();
          }
        }
      );
    } else {
      this.setState({ message: "Please fill all the fileds" });
    }
  };

  render() {
    let {
      description,
      start,
      end,
      rider,
      riderOptions = [],
      message,
    } = this.state;

    return (
      <div
        style={{ height: "100vh" }}
        className="mt-2 d-flex align-items-center justify-content-center"
      >
        <div className="card p-5">
          <h4 className="text-center">New Order</h4>
          <form className="form-default" onSubmit={this.createOrder}>
            {message && (
              <div style={{ padding: 10, border: "1px solid red" }}>
                {message}
              </div>
            )}
            <div className="col-12 mb-2">
              <div className="form-group">
                <label style={{ float: "left" }}>Description</label>
                <textarea
                  className="form-control form-control-lg"
                  value={description}
                  onChange={this.onChangeDescription}
                  rows="3"
                />
              </div>
            </div>
            <div className="col-12 mb-2">
              <div className="form-group">
                <label style={{ float: "left" }}>
                  Start Location (co-ordinates)
                </label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  value={start}
                  onChange={this.onChangeStart}
                />
              </div>
            </div>
            <div className="col-12 mb-2">
              <div className="form-group">
                <label style={{ float: "left" }}>
                  End Location (co-ordinates)
                </label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  value={end}
                  onChange={this.onChangeEnd}
                />
              </div>
            </div>
            <div className="col-12 mb-2">
              <div className="form-group">
                <label style={{ float: "left" }}>Rider</label>
                <br />
                <Select
                  className="flex-fill mb-2"
                  placeholder="Select rider"
                  options={riderOptions}
                  onChange={this.onChangeRider}
                />
              </div>
            </div>
            <div>
              <button className="btn btn-md btn-primary">Create</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default CreateOrderForm;
