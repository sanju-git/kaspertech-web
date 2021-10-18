import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import React from "react";
import AdminView from "./components/Admin/AdminView";
import RiderView from "./components/Rider/RiderView";
import LandingPage from "./components/LandingPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/admin" component={AdminView} />
          <Route exact path="/rider" component={RiderView} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
