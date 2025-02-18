"use client";
import { useState, useEffect } from "react";

export default function FilterBar({ newsData, onFilterChange }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [authorFilter, setAuthorFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [publishedDate, setPublishedDate] = useState("");

  const authors = [...new Set(newsData.map((article) => article.author).filter(Boolean))].sort();
  const types = [...new Set(newsData.map((article) => article.source).filter(Boolean))].sort();

  useEffect(() => {
    onFilterChange({
      searchQuery,
      authorFilter,
      typeFilter,
      startDate,
      endDate,
      publishedDate,
    });
  }, [searchQuery, authorFilter, typeFilter, startDate, endDate, publishedDate, onFilterChange]);

  return (
    <div className="w-full lg:w-72 p-3 sm:p-4 bg-gray-800 text-white space-y-4 sm:space-y-6 rounded-lg shadow-lg">
      <div className="space-y-2">
        <label htmlFor="searchQuery" className="text-sm font-medium block">Search News</label>
        <input
          type="text"
          id="searchQuery"
          placeholder="Search news..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 sm:p-3 bg-gray-700 text-white border border-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="authorFilter" className="text-sm font-medium block">Author</label>
        <select
          id="authorFilter"
          value={authorFilter}
          onChange={(e) => setAuthorFilter(e.target.value)}
          className="w-full p-2 sm:p-3 bg-gray-700 text-white border border-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        >
          <option value="">All Authors</option>
          {authors.map((author) => (
            <option key={author} value={author}>{author}</option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="typeFilter" className="text-sm font-medium block">Type</label>
        <select
          id="typeFilter"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="w-full p-2 sm:p-3 bg-gray-700 text-white border border-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        >
          <option value="">All Types</option>
          {types.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium block">Date Range</label>
        <div className="grid grid-cols-1 gap-2 sm:gap-3">
          <div className="space-y-1">
            <label htmlFor="startDate" className="text-sm block">Start Date</label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-2 sm:p-3 bg-gray-700 text-white border border-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="endDate" className="text-sm block">End Date</label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full p-2 sm:p-3 bg-gray-700 text-white border border-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="publishedDate" className="text-sm font-medium block">Published Date</label>
        <input
          type="date"
          id="publishedDate"
          value={publishedDate}
          onChange={(e) => setPublishedDate(e.target.value)}
          className="w-full p-2 sm:p-3 bg-gray-700 text-white border border-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        />
      </div>
    </div>
  );
}
