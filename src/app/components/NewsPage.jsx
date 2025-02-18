"use client";

import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";

export default function NewsList() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await fetch("/api/news");
        const data = await response.json();
        setNews(data);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <p className="text-center text-lg font-semibold text-cyan-400 animate-pulse">
          Loading...
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-extrabold tracking-wide text-cyan-400 drop-shadow-md">
          🚀 Latest News
        </h2>
        <button
          onClick={() => signOut()}
          className="px-5 py-2 bg-red-600 text-white rounded-xl shadow-md hover:bg-red-700 transition transform hover:scale-105"
        >
          Logout
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {news.map((article, index) => (
          <div
            key={index}
            className="relative p-6 bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-700 
            hover:shadow-cyan-500/50 transition duration-300 transform hover:-translate-y-3 hover:scale-[1.02]"
          >
            
            <div className="absolute inset-0 rounded-2xl border border-transparent hover:border-cyan-400 transition duration-300"></div>

            <h3 className="text-2xl font-semibold text-cyan-300">{article.title}</h3>

            <div className="flex justify-between items-center mt-2 text-gray-400">
              <p className="text-sm">By {article.author || "Unknown"}</p>
              <span className="bg-cyan-500 text-gray-900 text-xs font-medium px-3 py-1 rounded-full shadow-md">
                {article.type || "General"}
              </span>
            </div>

            <p className="text-gray-400 text-sm mt-1">
              {new Date(article.publishedAt).toLocaleDateString()}
            </p>

            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-5 text-cyan-400 font-medium hover:text-cyan-300 transition"
            >
              Read More →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
