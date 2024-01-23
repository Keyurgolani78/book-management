import { Book } from "@/interfaces/book";
import BookShow from "./BookShow";
import "styles/booklist.css";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

function BookList({
  bookList,
  handleDeletBook,
}: {
  bookList: Book[];
  handleDeletBook: (bookId: number) => void;
}) {
  const navigate = useNavigate();
  const handleAddBook = () => {
    navigate("/books/create");
  };
  return (
    <div className="book-list">
      {bookList.map((book) => (
        <BookShow key={book.id} book={book} handleDeletBook={handleDeletBook} />
      ))}
      <button className="create-book-button" onClick={() => handleAddBook()}>
        <FontAwesomeIcon icon={faPlus} />
        <p>Add Book</p>
      </button>
    </div>
  );
}

export default BookList;