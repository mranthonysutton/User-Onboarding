import React from "react";
import { withFormik, Form } from "formik";
import "./FormComponent.css";

const FormComponent = ({ values }) => {
  return (
    <div className="container">
      <Form className="form-control">
        <input type="text" name="name" placeholder="Full Name" />
        <input type="email" name="email" placeholder="user@email.com" />
        <input type="password" name="password" placeholder="Enter Password" />
        <label>
          <input type="checkbox" name="terms"></input>I agree to the terms and
          conditions
        </label>
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
  }
})(FormComponent);

export default FormikFormComponent;
