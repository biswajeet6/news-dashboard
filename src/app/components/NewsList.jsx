"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function NewsList({ filteredNews, payoutRate }) {
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 4;
  
  const totalPages = Math.ceil(filteredNews.length / articlesPerPage);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const paginatedArticles = filteredNews.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  );

  return (
    <div className="space-y-6 overflow-hidden">
      <AnimatePresence mode="wait">
        {paginatedArticles.length === 0 ? (
          <motion.p
            key="no-news"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-gray-500 text-center py-8"
          >
            No news found.
          </motion.p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
            {paginatedArticles.map((article, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-gray-900 to-gray-700 text-white p-6 border border-gray-600 rounded-xl shadow-lg hover:shadow-2xl transition-transform duration-300 ease-in-out"
              >
                <h2 className="text-2xl font-semibold text-gray-100 mb-4">{article.title}</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm text-gray-300">
                    <p>By {article.author || "Unknown"}</p>
                    <p>
                      {new Date(article.publishedAt).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>

                  {article.categories && article.categories.length > 0 && (
                    <div className="space-x-2">
                      <span className="text-sm text-gray-400 font-medium">Tags:</span>
                      {article.categories.map((category, idx) => (
                        <span
                          key={idx}
                          className="inline-block text-xs text-white bg-blue-600 px-2 py-1 rounded-full"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  )}

                  {article.bodyText && (
                    <p className="mt-2 text-gray-300">
                      {article.bodyText.length > 200 ? article.bodyText.substring(0, 200) + "..." : article.bodyText}
                    </p>
                  )}

                  {article.url && (
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-2 text-blue-400 hover:text-blue-600 hover:underline transition-colors"
                    >
                      Read More →
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {totalPages > 1 && (
        <div className="flex justify-center space-x-2 mt-6">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 border rounded-lg transition-all duration-300 ease-in-out ${currentPage === 1 ? "text-gray-400 border-gray-600 cursor-not-allowed" : "text-blue-400 border-blue-600 hover:bg-blue-600 hover:text-white"}`}
          >
            Previous
          </motion.button>
          <span className="px-4 py-2 text-gray-300">Page {currentPage} of {totalPages}</span>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 border rounded-lg transition-all duration-300 ease-in-out ${currentPage === totalPages ? "text-gray-400 border-gray-600 cursor-not-allowed" : "text-blue-400 border-blue-600 hover:bg-blue-600 hover:text-white"}`}
          >
            Next
          </motion.button>
        </div>
      )}
    </div>
  );
}
