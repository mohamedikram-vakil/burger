import React, { Component } from "react";
import { Formik } from "formik";
import {connect} from "react-redux"
import * as Yup from "yup";
import classes from "./Auth.css";
import Button from "../../components/UI/Button/Button";
import * as actions from "../../store/actions/index"
class Auth extends Component {
  render() {
    return (
      <Formik
        initialValues={{ email: "", password: "" }}
        // onSubmit={async values => {
        //   await new Promise(resolve => setTimeout(resolve, 500));
        //   alert(JSON.stringify(values, null, 2));
        // }}
        onSubmit={values=>{
            console.log(values)    
            this.props.onAuth(values.email,values.password)
        }
        }
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
                ORDER
              </Button>
            </form>
          );
        }}
      </Formik>
    );
  }
}

const mapDispatchtoProps=dispatch=>{
    return{
        onAuth:(email,password)=>dispatch(actions.auth(email,password))
    }
}

export default connect(null,mapDispatchtoProps)(Auth);
