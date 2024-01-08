import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import "styles/registration.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "contexts/AuthProvider";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

interface UserRegistrationValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const Registration = () => {
  const navigate = useNavigate();
  const authContext = useAuth();

  if (!authContext) {
    return <div>Loading...</div>;
  }

  const { register } = authContext;

  const validateForm = (values: UserRegistrationValues) => {
    const errors: Partial<UserRegistrationValues> = {};

    if (!values.firstName) {
      errors.firstName = "First Name is required";
    }

    if (!values.lastName) {
      errors.lastName = "Last Name is required";
    }

    if (!values.email) {
      errors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }

    return errors;
  };

  const onSubmit = async (
    values: UserRegistrationValues,
    actions: FormikHelpers<UserRegistrationValues>
  ) => {
    try {
      register(
        values.firstName,
        values.lastName,
        values.email,
        values.password
      );

      navigate("/dashboard");
    } catch (error) {
      actions.setSubmitting(false);
      if (error instanceof Error) {
        actions.setFieldError("password", error.message);
      }
    }
  };

  return (
    <div className="registration-page">
      <div className="registration-container">
        <h3>Register</h3>
        <Formik
          initialValues={initialValues}
          validate={validateForm}
          onSubmit={onSubmit}
        >
          <Form>
            <div className="form-group">
              <label htmlFor="firstName">First Name:</label>
              <Field type="text" id="firstName" name="firstName" />
              <ErrorMessage
                className="error-message"
                name="firstName"
                component="div"
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name:</label>
              <Field type="text" id="lastName" name="lastName" />
              <ErrorMessage
                className="error-message"
                name="lastName"
                component="div"
              />
            </div>
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
              <button type="submit">Register</button>
            </div>
          </Form>
        </Formik>
        <div className="login-link">
          <p>
            Already have an account? <Link to="/login">Log in here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;
