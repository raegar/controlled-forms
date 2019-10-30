import React, { useEffect, useReducer } from "react";

import "./App.css";
import "./styles.css";

import { Form, Field, AppFormActions } from "./Form";

const initialState = {
  firstName: "",
  lastName: "",
  age: "",
  gender: "",
  email: ""
};

const App = () => {
  return (
    <div className="App__shell">
      <div className="App">
        <Form
          className="Form"
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
          <div className="Fieldset">
            <Field name="firstName" className="Input" />
          </div>
          <div className="Fieldset">
            <Field name="lastName" className="Input" />
          </div>
          <div className="Fieldset">
            <Field name="age" type="number" className="Input" />
          </div>
          <div className="Fieldset">
            <Field name="gender" className="Dropdown" component="select">
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </Field>
          </div>
          <div className="Fieldset">
            <Field name="email" className="Input" />
          </div>
          <AppFormActions />
        </Form>
      </div>
    </div>
  );
};

export default App;
