import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import Modal from "../../components/UI/Modal/Modal";
import Aux from "../../hoc/Auxx/Auxx";

class Checkout extends Component {
  state = {
    show: true,
    redirect: null
  };

  componentDidMount() {
    this.props.onInitPurchase();
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  modalCloseHandler = () => {
    this.setState({
      show: !this.state.show,
      redirect: <Redirect to="/" />
    });
  };

  render() {
    let summary = <Redirect to="/" />;
    if (this.props.ings) {
      let redirect = null;
      const purchasedRedirect = this.props.purchased ? (
        <Aux>
          <Modal
            show={this.state.show}
            modalClosed={this.modalCloseHandler}
            text="center"
          >
            Your Order placed SuccessFully
          </Modal>
          {this.state.redirect}
        </Aux>
      ) : null;
      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={this.props.ings}
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler}
          />
          <Route
            path={this.props.match.path + "/contact-data"}
            component={ContactData}
          />
        </div>
      );
    }
    return summary;
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInitPurchase: () => dispatch(actions.purchaseInit())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
