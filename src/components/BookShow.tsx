import { Book } from "@/interfaces/book";
import { useNavigate } from "react-router-dom";
import "styles/bookshow.css";
import ConfirmationDialog from "./ConfirmationDialog";
import { useState } from "react";

const BookShow = ({
  book,
  handleDeletBook,
}: {
  book: Book;
  handleDeletBook: (bookId: number) => void;
}) => {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/books/${book.id}/edit`);
  };

  const handleDeleteClick = () => {
    setIsConfirmationOpen(true);
  };

  const handleConfirmDelete = () => {
    handleDeletBook(book.id);
    setIsConfirmationOpen(false);
  };

  const handleCancelDelete = () => {
    setIsConfirmationOpen(false);
  };

  return (
    <div className="book-card">
      <h3>{book.title}</h3>
      <p>Author: {book.author}</p>
      <p>Publication Year: {book.publicationYear}</p>
      <p>Genre: {book.genre}</p>
      <div className="buttons">
        <button className="edit-btn" onClick={handleEditClick}>
          Edit
        </button>
        <button className="delete-btn" onClick={handleDeleteClick}>
          Delete
        </button>
      </div>
      <ConfirmationDialog
        isOpen={isConfirmationOpen}
        title="Confirmation"
        message={`Are you sure you want to delete ${book.title}?`}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};

export default BookShow;