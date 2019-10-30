import React, { useReducer, useEffect, useContext } from "react";
import "./styles.css";

function defaultReducer(state, action) {
    switch (action.type) {
      case "reset":
        return { ...action.payload };
      case "set":
        return { ...state, [action.name]: action.value };
      case "setValues":
        return { ...action.payload };
      default:
        return state;
    }
  }
  
  const FormContext = React.createContext({});
  
  export function Form(props) {
    const {
      initialValues = {},
      validate = () => null,
      initialErrors = {},
      reducer = defaultReducer,
      onSubmit = () => null,
      children
    } = props;
    const [values, dispatch] = useReducer(reducer, initialValues);
    const [errors, errorDispatch] = useReducer(reducer, initialErrors);
    const formProps = {
      values,
      errors,
      runValidations: async values => {
        const validateErrors = await validate(values);
        console.log(
          "runValidations",
          JSON.stringify(values),
          JSON.stringify(validateErrors)
        );
        errorDispatch({ type: "setValues", payload: validateErrors });
      },
      setFieldValue: function(name, value) {
        dispatch({ type: "set", name, value });
        //TODO this has to be run after the dispatch is successful
        // formProps.runValidations({ ...values, [name]: value });
      },
      handleSubmit: e => {
        e.preventDefault();
        onSubmit(values);
      },
      handleReset: e => {
        dispatch({ type: "reset", payload: initialValues });
      }
    };
  
    useEffect(
      () => {
        formProps.runValidations(values);
      },
      [values]
    );
  
    return (
      <FormContext.Provider value={formProps}>
        <form onSubmit={formProps.handleSubmit}>{children}</form>
      </FormContext.Provider>
    );
  }
  
  export function Field(props) {
    const { name, component, ...otherProps } = props;
    const { values, setFieldValue } = useContext(FormContext);
  
    const Component = component || "input";
  
    return React.createElement(Component, {
      type: "text",
      value: values[name],
      onChange: e => setFieldValue(name, e.target.value),
      ...otherProps
    });
  }

  export const AppFormActions = () => {
    const { values, errors, handleSubmit, handleReset } = useContext(FormContext);
  
    return (
      <>
        <div className="FormActions">
          <button type="submit" className="Button Button--primary" >Save</button>
          <button type="button" className="Button" onClick={handleReset}>
            Reset
          </button>
        </div>
        <div><h1>Component State: </h1><p></p></div>
        <div>
          Values:
          <pre>{JSON.stringify(values, null, 2)}</pre>
        </div>
        <div>
          Errors:
          <pre>{JSON.stringify(errors, null, 2)}</pre>
        </div>
      </>
    );
  }

export default {Form, Field, AppFormActions};