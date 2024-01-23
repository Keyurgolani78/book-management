import Header from "Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "components/Home";
import { AuthProvider } from "contexts/AuthProvider";
import Login from "components/authentication/Login";
import Registration from "components/authentication/Registration";
import Dashboard from "components/Dashboard";
import RequireAuth from "components/RequireAuth";
import BookCreate from "./components/BookCreate";
import { Book } from "./interfaces/book";
import { useEffect, useState } from "react";
import mockBooks from "data/books";
import BookEdit from "./components/BookEdit";

function App() {
  const [bookList, setBookList] = useState<Book[]>([]);
  useEffect(() => {
    setBookList(mockBooks);
  }, []);

  function handleDeleteBook(bookId: number) {
    setBookList((prevList)=> prevList.filter((book)=>book.id !== bookId));
  }
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Registration />} />
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <Dashboard bookList={bookList} handleDeletBook={handleDeleteBook}/>
              </RequireAuth>
            }
          />
          <Route
            path="/books/create"
            element={
              <RequireAuth>
                <BookCreate bookList={bookList} />
              </RequireAuth>
            }
          />
          <Route
            path="/books/:bookId/edit"
            element={
              <RequireAuth>
                <BookEdit bookList={bookList} setBookList={setBookList} />
              </RequireAuth>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
