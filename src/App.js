import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import * as actions from "./store/actions/index";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import LogOut from "./containers/Auth/LogOut/LogOut";
import { connect } from "react-redux";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";

const asyncOrders = asyncComponent(() => {
  return import("./containers/Orders/Orders");
});
const asyncCheckout = asyncComponent(() => {
  return import("./containers/Checkout/Checkout");
});
const asyncAuth = asyncComponent(() => {
  return import("./containers/Auth/Auth");
});
class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignUp();
  }
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={asyncCheckout} />
            {this.props.isAuthenicated ? (
              <Route path="/orders" component={asyncOrders} />
            ) : null}
            <Route path="/auth" component={asyncAuth} />
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
