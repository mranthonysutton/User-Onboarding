import React from "react";
import axios from "axios";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import "./FormComponent.css";

const FormComponent = ({ values, touched, errors }) => {
  return (
    <div className="container">
      <h1>Add A User</h1>
      <Form className="form-control">
        <Field type="text" name="name" placeholder="Full Name" />
        {touched.name && errors.name && <p className="error">{errors.name}</p>}

        <Field type="email" name="email" placeholder="user@email.com" />
        {touched.email && errors.email && (
          <p className="error">{errors.email}</p>
        )}

        <Field type="password" name="password" placeholder="Enter Password" />
        {touched.password && errors.password && (
          <p className="error">{errors.password}</p>
        )}

        <label>
          <Field type="checkbox" name="terms" />I agree to the terms and
          conditions
        </label>

        {touched.terms && errors.terms && (
          <p className="error">You must agree to the terms and conditions</p>
        )}
        <button type="submit">Add User</button>
      </Form>
    </div>
  );
};

const FormikFormComponent = withFormik({
  mapPropsToValues({ name, email, password, terms }) {
    return {
      name: name || "",
      email: email || "",
      password: password || "",
      terms: terms || false
    };
  },
  validationSchema: Yup.object().shape({
    name: Yup.string().required("Please enter user's name"),
    password: Yup.string().required("Please enter user's password"),
    email: Yup.string().required("Please enter user's email"),
    terms: Yup.boolean().oneOf([true])
  }),
  handleSubmit() {
    console.log("Submitted");
  }
})(FormComponent);

export default FormikFormComponent;
