import { useEffect } from "react";
import { PreviousIcon, NextIcon } from "../../svg/Svg";

export default function Pagination({
  blogs,
  currentPage,
  setCurrentPage,
  totalLength
}) {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalLength / 4); i++) {
    pages.push(i);
  }
  const handlePagination = (page) => {
    setCurrentPage(page)
  }
  const prevPage = () => {
    if (currentPage === 1) {
      return
    }
    setCurrentPage(prev => prev - 1);
  }

  const nextPage = () => {
    if (currentPage === pages.length) {
      return
    }
    setCurrentPage(prev => prev + 1);
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return (blogs.main.length > 0 || blogs.topics.length > 0) && (
    <nav className="dark:bg-zinc-800 relative w-full space-x-3 flex flex-row justify-end xs:flex xs:flex-wrap mt-10">
      <button
        onClick={prevPage}
        className={`${currentPage === 1 ? "cursor-not-allowed border-zinc-300 bg-gray-200 dark:bg-zinc-800 hover:border-zinc-300 hover:text-gray-500 flex items-center justify-center px-3 h-10 text-sm font-medium text-gray-500 dark:border-zinc-700 dark:hover:border-zinc-700 dark:hover:text-gray-500 border transition duration-300"
          : "border-zinc-300 bg-white hover:border-blue-500 hover:text-blue-500 flex items-center justify-center px-3 h-10 text-sm font-medium text-gray-500 dark:bg-zinc-900/50 dark:border-zinc-700 dark:hover:border-teal-500/50 dark:hover:text-teal-500 border transition duration-300"}`}>
        <PreviousIcon />
      </button>
      {pages.map((page, key) => (
        <button
          key={key}
          onClick={() => handlePagination(page)}
          className={
            page === currentPage
              ? "border px-4 border-blue-500 text-blue-500 dark:border-teal-500/50 bg-white dark:bg-zinc-900/50 h-10 dark:text-teal-500 hover:border-blue-500 hover:text-blue-500 dark:hover:border-teal-500/50"
              : "border px-4 border-gray-300 bg-white dark:bg-zinc-900/50 dark:border-zinc-700 dark:hover:text-teal-500 h-10 dark:hover:border-teal-500/50 text-gray-500 hover:text-blue-500 hover:border-blue-500"
          }
        >
          {page}
        </button>
      ))}
      <button
        onClick={nextPage}
        className={`${currentPage === pages.length ? "cursor-not-allowed border-zinc-300 bg-gray-200 dark:bg-zinc-800 hover:border-zinc-300 hover:text-gray-500 flex items-center justify-center px-3 h-10 text-sm font-medium text-gray-500 dark:border-zinc-700 dark:hover:border-zinc-700 dark:hover:text-gray-500 border transition duration-300"
          : "border-zinc-300 bg-white hover:border-blue-500 hover:text-blue-500 flex items-center justify-center px-3 h-10 text-sm font-medium text-gray-500 dark:bg-zinc-900/50 dark:border-zinc-700 dark:hover:border-teal-500/50 dark:hover:text-teal-500 border transition duration-300"}`}>
        <NextIcon />
      </button>
    </nav>
  );
}
