import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import * as actions from "./store/actions/index";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import LogOut from "./containers/Auth/LogOut/LogOut";
import { connect } from "react-redux";

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignUp();
  }
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            {this.props.isAuthenicated ? (
              <Route path="/orders" component={Orders} />
            ) : null}
            <Route path="/auth" component={Auth} />
            <Route path="/logout" component={LogOut} />
            <Route path="/" exact component={BurgerBuilder} />
            <Redirect to="/" />
          </Switch>
        </Layout>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return { isAuthenicated: state.auth.token !== null };
};
const mapDispatchToProps = (dispatch) => {
  return { onTryAutoSignUp: () => dispatch(actions.authCheckState()) };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
