import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate, useParams } from "react-router-dom";
import "styles/bookedit.css";
import { Book } from "@/interfaces/book";

const BookEdit = ({
  bookList,
  setBookList,
}: {
  bookList: Book[];
  setBookList: (books: Book[]) => void;
}) => {
  const navigate = useNavigate();
  const { bookId } = useParams();

  let initialValues: Book = {
    id: 0,
    title: "",
    author: "",
    publicationYear: new Date().getFullYear(),
    genre: "",
  };

  const editBook = bookId
    ? bookList.find((book) => book.id === parseInt(bookId))
    : undefined;

  if (editBook) {
    initialValues = editBook;
  }

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

  const onSubmit = (values: Book) => {
    console.log("Form submitted with values:", values);
    const indexToUpdate = bookList.findIndex(
      (book) => book.id === initialValues.id
    );

    if (indexToUpdate !== -1) {
      const updatedBookList = [...bookList];
      updatedBookList[indexToUpdate] = {
        ...updatedBookList[indexToUpdate],
        ...values,
      };

      setBookList(updatedBookList);
    }

    navigate("/dashboard");
  };

  if (!editBook) {
    return <>Erro..</>;
  }
  return (
    <div className="edit-book-page">
      <div className="edit-book-container">
        <h3>Edit Book</h3>
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
              <Field type="text" id="publicationYear" name="publicationYear" />
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
              <button type="submit">Update Book</button>
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

export default BookEdit;