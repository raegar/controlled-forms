import React, { useEffect, useReducer } from "react";

import "./App.css";
import { Form, Field, AppFormActions } from './Form';

const initialState = {
  firstName: "",
  lastName: "",
  age: "",
  gender: "",
  email: ""
};

const App = () => {
  return (
    <div className="App">
      <Form
        initialValues={{
          firstName: "FirstName",
          lastName: "LastName",
          age: 0,
          gender: "Select",
          email: "Email"
        }}
        validate={values => {
          if (!values.firstName) {
            return { firstName: "First name is required." };
          }
        }}
        onSubmit={values => alert(JSON.stringify(values))}
      >
        <Field name="firstName" />
        <Field name="lastName" />
        <Field name="age" type="number" />
        <Field name="gender" component="select">
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </Field>
        <Field name="email" />
        <AppFormActions />
      </Form>
    </div>
  );
};

export default App;
