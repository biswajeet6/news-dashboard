"use client";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef, useCallback } from "react";
import { setArticles, setPayout, setPayoutsFromLocalStorage } from "../../../redux/features/payoutSlice";
import { debounce } from "lodash"; 

export default function PayoutCalculator({ setSavedPayouts }) {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.payout.articles);
  const payouts = useSelector((state) => state.payout.payouts);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  const [localPayouts, setLocalPayouts] = useState({});

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch("/api/news");
        const data = await response.json();
        dispatch(setArticles(data));

        const savedPayouts = JSON.parse(localStorage.getItem("payouts")) || {};
        dispatch(setPayoutsFromLocalStorage(savedPayouts));
        setLocalPayouts(savedPayouts);
      } catch (error) {
        setError("Failed to fetch articles. Please try again later.");
        console.error("Failed to fetch articles:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [dispatch]);

  const updatePayout = useCallback(
    debounce((title, amount) => {
      const numericAmount = parseFloat(amount) || 0;
      dispatch(setPayout({ title, amount: numericAmount }));

      const updatedPayouts = { ...payouts, [title]: numericAmount };
      localStorage.setItem("payouts", JSON.stringify(updatedPayouts));
    }, 300),
    [dispatch, payouts]
  );

  const handlePayoutChange = (title, value) => {
    setLocalPayouts((prev) => ({ ...prev, [title]: value }));
    updatePayout(title, value);
  };

  const totalPayout = Object.values(localPayouts).reduce(
    (sum, value) => sum + (parseFloat(value) || 0),
    0
  );

  const handleSave = () => {
    setSavedPayouts(localPayouts);
    alert("Payouts have been saved successfully!");
  };

  const handleClear = () => {
    const resetPayouts = articles.reduce((acc, article) => {
      acc[article.title] = 0;
      return acc;
    }, {});
    setLocalPayouts(resetPayouts);
    dispatch(setPayoutsFromLocalStorage(resetPayouts)); 

    localStorage.setItem("payouts", JSON.stringify(resetPayouts));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full border-t-transparent border-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-800 text-white rounded-lg shadow-lg space-y-6">
      <h2 className="text-2xl font-semibold">Payout Calculator</h2>
      <div className="space-y-4">
        {articles.length > 0 ? (
          articles.map((article) => (
            <div
              key={article.title}
              className="bg-gray-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-bold mb-2 text-gray-200">{article.title}</h3>
              <div className="flex items-center space-x-4">
                <input
                  type="number"
                  value={localPayouts[article.title] || ""}
                  onChange={(e) => handlePayoutChange(article.title, e.target.value)}
                  placeholder="Enter payout"
                  className="p-3 bg-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors w-full"
                />
                <span className="text-gray-400">%</span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No articles available</p>
        )}
      </div>

      <div className="text-xl font-semibold">
        <h3>Total Payout: ${totalPayout.toFixed(2)}</h3>
      </div>

      {/* Save and Clear buttons */}
      <div className="flex justify-between mt-4">
        <button
          onClick={handleSave}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
        >
          Save Payouts
        </button>
        <button
          onClick={handleClear}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
        >
          Clear All
        </button>
      </div>
    </div>
  );
}
