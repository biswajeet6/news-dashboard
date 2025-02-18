import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const NewsAnalytics = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch("/api/news");
        const data = await response.json();
        setArticles(data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch articles");
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="text-red-500 p-4">
      Error: {error}
    </div>
  );

  const processTimeSeriesData = () => {
    const timeData = {};
    articles.forEach(article => {
      const date = new Date(article.publishedAt).toLocaleDateString();
      timeData[date] = (timeData[date] || 0) + 1;
    });
    return Object.entries(timeData).map(([date, count]) => ({
      date,
      articles: count
    })).sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  const processTopics = () => {
    const topics = {};
    articles.forEach(article => {
      article.categories.forEach(category => {
        topics[category] = (topics[category] || 0) + 1;
      });
    });
    return Object.entries(topics)
      .map(([topic, count]) => ({ topic, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  };

  const calculateReadingTimes = () => {
    return articles.map(article => {
      const wordCount = article.bodyText.split(' ').length;
      const readingTime = Math.ceil(wordCount / 200); // Assuming 200 words per minute
      return {
        title: article.title,
        readingTime
      };
    }).sort((a, b) => b.readingTime - a.readingTime).slice(0, 5);
  };

  const getAuthorStats = () => {
    const authorStats = {};
    articles.forEach(article => {
      if (article.author !== "Unknown") {
        authorStats[article.author] = (authorStats[article.author] || 0) + 1;
      }
    });
    return Object.entries(authorStats)
      .map(([author, count]) => ({ author, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  };

  const timeSeriesData = processTimeSeriesData();
  const topTopics = processTopics();
  const readingTimes = calculateReadingTimes();
  const authorStats = getAuthorStats();

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 dark:text-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Guardian News Analytics</h1>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 dark:text-white p-6 rounded-lg shadow-md">
            <div className="text-sm font-medium text-gray-500 dark:text-gray-300 mb-2">Total Articles</div>
            <div className="text-2xl font-bold">{articles.length}</div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 dark:text-white p-6 rounded-lg shadow-md">
            <div className="text-sm font-medium text-gray-500 dark:text-gray-300 mb-2">Unique Authors</div>
            <div className="text-2xl font-bold">
              {new Set(articles.map(a => a.author)).size}
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 dark:text-white p-6 rounded-lg shadow-md">
            <div className="text-sm font-medium text-gray-500 dark:text-gray-300 mb-2">Total Topics</div>
            <div className="text-2xl font-bold">{topTopics.length}</div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 dark:text-white p-6 rounded-lg shadow-md">
            <div className="text-sm font-medium text-gray-500 dark:text-gray-300 mb-2">Avg. Reading Time</div>
            <div className="text-2xl font-bold">
              {Math.round(readingTimes.reduce((acc, curr) => acc + curr.readingTime, 0) / readingTimes.length)} min
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 dark:text-white p-6 rounded-lg shadow-md col-span-2">
            <h2 className="text-xl font-semibold mb-4">Publication Timeline</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timeSeriesData}>
                  <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.5} />
                  <XAxis dataKey="date" stroke="white" />
                  <YAxis stroke="white" />
                  <Tooltip />
                  <Line type="monotone" dataKey="articles" stroke="#2563eb" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 dark:text-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Top Topics</h2>
            <div className="space-y-4">
              {topTopics.slice(0, 5).map(({ topic, count }) => (
                <div key={topic} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{topic}</span>
                    <span className="text-gray-500 dark:text-gray-300">{count} articles</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${(count / topTopics[0].count) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 dark:text-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Top Authors</h2>
            <div className="space-y-4">
              {authorStats.map(({ author, count }) => (
                <div key={author} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{author}</span>
                    <span className="text-gray-500 dark:text-gray-300">{count} articles</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${(count / authorStats[0].count) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsAnalytics;
