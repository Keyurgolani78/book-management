import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import "styles/bookcreate.css";
import { Book } from "@/interfaces/book";

const initialValues: Book = {
  id: 0,
  title: "",
  author: "",
  publicationYear: new Date().getFullYear(),
  genre: "",
};

const validate = (values: Book) => {
  const errors: Partial<Record<keyof Book, string>> = {};
  if (!values.title) {
    errors.title = "Title is required";
  }
  if (!values.author) {
    errors.author = "Author is required";
  }
  if (!values.publicationYear) {
    errors.publicationYear = "Publication Year is required";
  }
  if (!values.genre) {
    errors.genre = "Genre is required";
  }
  return errors;
};

const BookCreate = ({ bookList }: { bookList: Book[] }) => {
  const navigate = useNavigate();

  const onSubmit = (values: Book) => {
    bookList.push({ ...values, id: bookList.length + 1 });
    navigate("/dashboard");
  };

  return (
    <div className="create-book-page">
      <div className="create-book-container">
        <h3>Create a New Book</h3>
        <Formik
          onSubmit={onSubmit}
          initialValues={initialValues}
          validate={validate}
        >
          <Form>
            <div className="form-group">
              <label htmlFor="title">Title:</label>
              <Field type="text" id="title" name="title" />
              <ErrorMessage
                className="error-message"
                name="title"
                component="div"
              />
            </div>
            <div className="form-group">
              <label htmlFor="author">Author:</label>
              <Field type="text" id="author" name="author" />
              <ErrorMessage
                className="error-message"
                name="author"
                component="div"
              />
            </div>
            <div className="form-group">
              <label htmlFor="publicationYear">Publication Year:</label>
              <Field
                type="number"
                id="publicationYear"
                name="publicationYear"
              />
              <ErrorMessage
                className="error-message"
                name="publicationYear"
                component="div"
              />
            </div>
            <div className="form-group">
              <label htmlFor="genre">Genre:</label>
              <Field type="text" id="genre" name="genre" />
              <ErrorMessage
                className="error-message"
                name="genre"
                component="div"
              />
            </div>
            <div className="form-group">
              <button type="submit">Create Book</button>
            </div>
          </Form>
        </Formik>
        <div className="cancel-link">
          <p>
            <Link to="/dashboard">Cancel</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookCreate;