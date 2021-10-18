import React from "react";

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  openAdminView = () => {
    this.props.history.push("/admin");
  };

  openRiderView = () => {
    this.props.history.push("/rider");
  };

  render() {
    return (
      <div
        style={{ height: "100vh" }}
        className="d-flex align-items-center justify-content-center"
      >
        <div>
          <div>
            <h4>Select your role</h4>
          </div>
          <div>
            <button
              style={{ width: 80 }}
              onClick={this.openAdminView}
              className="btn btn-success"
            >
              Admin
            </button>
          </div>
          <div className="mt-2">
            <button
              style={{ width: 80 }}
              onClick={this.openRiderView}
              className="btn btn-danger"
            >
              Rider
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
