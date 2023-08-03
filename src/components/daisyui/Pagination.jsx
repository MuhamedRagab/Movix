import { useEffect } from "react";
import { useParams } from "react-router-dom";

/* eslint-disable react/prop-types */
const Pagination = ({ setPage, page, total_pages, isLoading }) => {
  const { category } = useParams();

  useEffect(() => {
    window.scrollTo({
      behavior: "smooth",
      top: 0,
      left: 0,
    });
    window.sessionStorage.setItem("page", page);
  }, [page]);

  useEffect(() => {
    window.sessionStorage.setItem("page", 1);
  }, [category]);

  return (
    <div className="join w-5/6">
      <button
        className="join-item btn"
        onClick={() => setPage((prev) => prev - 1)}
        disabled={page === 1 || isLoading}
      >
        «
      </button>
      {page - 1 >= 1 && (
        <button
          className="join-item btn"
          onClick={() => setPage(1)}
          disabled={page === 1 || isLoading}
        >
          {1}
        </button>
      )}
      {page - 2 >= 1 && (
        <button
          className="join-item btn hidden sm:block"
          onClick={() => setPage(2)}
          disabled={page === 1 || isLoading}
        >
          {2}
        </button>
      )}
      <button
        className="join-item btn btn-active"
        onClick={() => setPage((prev) => prev + 1)}
        disabled={isLoading}
      >
        {page}
      </button>
      {page < total_pages - 1 && (
        <button
          className="join-item btn hidden sm:block"
          onClick={() => setPage(total_pages - 1)}
          disabled={isLoading}
        >
          {total_pages - 1}
        </button>
      )}
      {page < total_pages && (
        <button
          className="join-item btn"
          onClick={() => setPage(total_pages)}
          disabled={isLoading}
        >
          {total_pages}
        </button>
      )}
      <button
        className={
          "join-item btn" + (page === total_pages ? " btn-disabled" : "")
        }
        onClick={() => setPage((prev) => prev + 1)}
        disabled={page === total_pages || isLoading}
      >
        »
      </button>
    </div>
  );
};

export default Pagination;
