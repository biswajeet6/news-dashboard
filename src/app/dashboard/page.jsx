"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import FilterBar from "../components/FilterBar";
import NewsList from "../components/NewsList";
import PayoutCalculator from "../components/PayoutCalculator";
import ExportOptions from "../components/ExportOptions";
import PayoutDetails from "../components/PayoutDetail";
import Sidebar from "../components/Sidebar";
import NewsAnalytics from "../components/NewsAnalytics";
import Navbar from "../components/Navbar";
import LoadingState from "../components/LoadingState";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState("home");
  const [savedPayouts, setSavedPayouts] = useState({});

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await fetch("/api/news");
        const data = await response.json();
        setNews(data);
        setFilteredNews(data);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, []);

  const handleFilterChange = useCallback(
    ({ searchQuery, authorFilter, typeFilter, startDate, endDate, publishedDate }) => {
      let filtered = news;

      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(
          (article) =>
            article.title?.toLowerCase().includes(query) ||
            article.description?.toLowerCase().includes(query)
        );
      }

      if (authorFilter) {
        filtered = filtered.filter((article) => article.author === authorFilter);
      }

      if (typeFilter) {
        filtered = filtered.filter((article) => article.source === typeFilter);
      }

      const filterDate = (date, article, comparison) => {
        if (!date) return true;
        const articleDate = new Date(article.publishedAt);
        const filterDate = new Date(date);
        return comparison(articleDate, filterDate);
      };

      filtered = filtered.filter(
        (article) =>
          filterDate(startDate, article, (a, b) => a >= b) &&
          filterDate(endDate, article, (a, b) => a <= b) &&
          (!publishedDate ||
            new Date(article.publishedAt).toISOString().split("T")[0] === publishedDate)
      );

      setFilteredNews(filtered);
    },
    [news]
  );

  if (status === "loading" || loading) {
    return <LoadingState />;
  }
  if (!session) return null;

  return (
    <div className="flex flex-col lg:flex-row min-h-screen dark:bg-gray-900 dark:text-white">
      <div className="fixed w-full lg:w-64 lg:min-h-screen bg-gray-800 dark:bg-gray-700">
        <Sidebar activeView={activeView} setActiveView={setActiveView} />
      </div>

      <div className="flex-1 lg:ml-64 min-h-screen">
        <Navbar />
 

        <div className="p-2 sm:p-4">
          {activeView === "home" && (
            <div className="flex flex-col lg:flex-row gap-4 mt-4">
              <div className="w-full lg:w-72">
                <FilterBar newsData={news} onFilterChange={handleFilterChange} />
              </div>
              <div className="flex-1">
                <NewsList filteredNews={filteredNews} />
              </div>
            </div>
          )}

          {activeView === "payout" && (
            <div className="mt-4">
              <PayoutCalculator 
                setSavedPayouts={setSavedPayouts} 
                articles={filteredNews} 
              />
            </div>
          )}

          {activeView === "payout-details" && (
            <div className="mt-4">
              <PayoutDetails news={news} />
            </div>
          )}

          {activeView === "export" && (
            <div className="mt-4">
              <ExportOptions />
            </div>
          )}

          {activeView === "analytics" && (
            <div className="mt-4">
              <NewsAnalytics />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
