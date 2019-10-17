import React, { useState, useEffect } from "react";
import axios from "axios";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import "./FormComponent.css";

const FormComponent = ({ values, touched, errors, status }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    status && setUsers(users => [...users, status]);
  }, [status]);

  // Returns the form component and the error messages when the input field is touched and left empty, or just left empty
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

      {users.map(user => (
        <ul key={user.id}>
          <li>Name: {user.name}</li>
          <li>Email: {user.email}</li>
          <li>Password: {user.password}</li>
        </ul>
      ))}
    </div>
  );
};

// Because of the Formik, we need to pass in our function that is being returned into a new function and then pass that function back to app.js
const FormikFormComponent = withFormik({
  // Passing in all of the props, to values that can be iterated over.
  mapPropsToValues({ name, email, password, terms }) {
    return {
      name: name || "",
      email: email || "",
      password: password || "",
      terms: terms || false
    };
  },
  // Tests if the errors exist
  validationSchema: Yup.object().shape({
    name: Yup.string().required("Please enter user's name"),
    password: Yup.string().required("Please enter user's password"),
    email: Yup.string().required("Please enter user's email"),
    terms: Yup.boolean().oneOf([true])
  }),
  handleSubmit(values, { setStatus }) {
    axios
      // Sends a post required to the API
      .post("https://reqres.in/api/users", values)
      .then(response => {
        // Passes the data that we obtained back to the form
        console.log(response.data);
        setStatus(response.data);
      })
      .catch(err => console.log(err.response));
  }
})(FormComponent);

export default FormikFormComponent;
