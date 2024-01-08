import React from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import "styles/login.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContextValue, useAuth } from "contexts/AuthProvider";

const initialValues = {
  email: "",
  password: "",
};

interface LoginValues {
  email: string;
  password: string;
}

const LoginForm = () => {
  const navigate = useNavigate();
  const authContext = useAuth();
  if (!authContext) {
    return <div>Loading...</div>;
  }
  const { login } = authContext as AuthContextValue;

  const validateForm = (values: LoginValues) => {
    const errors: Partial<LoginValues> = {};

    if (!values.email) {
      errors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 6) {
      errors.password = "Password must be at least 8 characters long";
    }

    return errors;
  };

  const onSubmit = async (
    values: LoginValues,
    actions: FormikHelpers<LoginValues>
  ) => {
    try {
      login(values.email, values.password);
      navigate("/dashboard");
    } catch (error) {
      actions.setSubmitting(false);
      if (error instanceof Error) {
        actions.setFieldError("password", error.message);
      }
    }
  };
  return (
    <div className="log-in-page">
      <div className="log-in-container">
        <h3>Login</h3>
        <Formik
          initialValues={initialValues}
          validate={validateForm}
          onSubmit={onSubmit}
        >
          <Form>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <Field type="email" id="email" name="email" />
              <ErrorMessage
                className="error-message"
                name="email"
                component="div"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <Field type="password" id="password" name="password" />
              <ErrorMessage
                className="error-message"
                name="password"
                component="div"
              />
            </div>
            <div className="form-group">
              <button type="submit">Submit</button>
            </div>
          </Form>
        </Formik>
        <div className="sign-up-link">
          <p>
            New user? <Link to="/signup">Sign up here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
