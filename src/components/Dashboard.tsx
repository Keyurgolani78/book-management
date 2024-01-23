import { useAuth } from "contexts/AuthProvider";
import BookList from "./BookList";
import { useMemo, useState } from "react";
import Pagination from "../components/Pagination";
import { Book } from "@/interfaces/book";

function Dashboard({
  bookList,
  handleDeletBook,
}: {
  bookList: Book[];
  handleDeletBook: (bookId: number) => void;
}) {
  const authContext = useAuth();
  const user = authContext?.user;
  const itemsPerPage = 10;
  console.log(user);

  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = (pageNumber: number) => setCurrentPage(pageNumber);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedBooks = useMemo(
    () => bookList.slice(indexOfFirstItem, indexOfLastItem),
    [indexOfFirstItem, indexOfLastItem, bookList]
  );

  console.log("paginated", paginatedBooks);
  console.log("current", currentPage);

  return (
    <>
      <BookList bookList={paginatedBooks} handleDeletBook={handleDeletBook} />
      <Pagination
        totalItems={bookList.length}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={onPageChange}
      />
    </>
  );
}

export default Dashboard;