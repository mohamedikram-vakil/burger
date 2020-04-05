import React, { Component } from "react";
import { Formik } from "formik";
import { connect } from "react-redux";
import * as Yup from "yup";
import classes from "./Auth.css";
import Button from "../../components/UI/Button/Button";
import * as actions from "../../store/actions/index";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Axios from "axios";
import Spinner from "../../components/UI/Spinner/Spinner";
import Modal from "../../components/UI/Modal/Modal";
import { Redirect } from "react-router-dom";
class Auth extends Component {
  state = {
    isSignUp: false,
    show: false
  };
  componentDidMount() {
    if (!this.props.building && this.props.redirectPath !== "/") {
      console.log("hello");
      this.props.onRedirectPath();
    }
  }
  switchModeHandler = e => {
    e.preventDefault();
    this.setState(prevState => {
      return { isSignUp: !prevState.isSignUp };
    });
  };
  closeModalHandler = () => {
    this.setState({
      show: false
    });
  };
  componentDidUpdate = prevProps => {
    if (this.props.error !== prevProps.error) {
      this.setState({
        show: true
      });
    }
  };

  render() {
    let form = (
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values, { resetForm }) => {
          this.props.onAuth(values.email, values.password, this.state.isSignUp);
          resetForm();
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email()
            .required("Required"),
          password: Yup.string()
            .required("Required")
            .min(8, "Enter atleast 8 char")
        })}
      >
        {props => {
          const {
            values,
            touched,
            errors,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit
          } = props;
          return (
            <form className={classes.ContactData} onSubmit={handleSubmit}>
              <input
                id="email"
                placeholder="Enter your email"
                type="text"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.email && touched.email
                    ? [classes.Input, classes.Invalid].join(" ")
                    : classes.Input
                }
              />
              {errors.email && touched.email && (
                <div className={classes.errorMsg}>{errors.email}</div>
              )}
              <input
                id="password"
                placeholder="Enter your password"
                type="text"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.password && touched.password
                    ? [classes.Input, classes.Invalid].join(" ")
                    : classes.Input
                }
              />
              {errors.password && touched.password && (
                <div className={classes.errorMsg}>{errors.password}</div>
              )}
              <Button btnType="Success" disabled={isSubmitting}>
                {this.state.isSignUp ? "Sign Up" : "Sign In"}
              </Button>
              <Button btnType="Danger" clicked={e => this.switchModeHandler(e)}>
                Switch to {this.state.isSignUp ? "Sign In" : "Sign Up"}
              </Button>
            </form>
          );
        }}
      </Formik>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    let isAuthenicated = null;
    if (this.props.isAuthenicated) {
      isAuthenicated = <Redirect to={this.props.redirectPath} />;
    }
    return (
      <React.Fragment>
        {isAuthenicated}
        <Modal
          show={this.state.show}
          modalClosed={this.closeModalHandler}
          text="center"
        >
          {this.props.error ? this.props.error.message : null}
        </Modal>
        {form}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenicated: state.auth.token !== null,
    building: state.burgerBuilder.building,
    redirectPath: state.auth.redirectPath
  };
};

const mapDispatchtoProps = dispatch => {
  return {
    onAuth: (email, password, method) =>
      dispatch(actions.auth(email, password, method)),
    onRedirectPath: () => dispatch(actions.setAuthRedirect("/checkout"))
  };
};

export default connect(mapStateToProps, mapDispatchtoProps)(Auth);
