import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPayout } from '../../../redux/features/payoutSlice';

export default function PayoutDetails() {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.payout.articles);
  const payouts = useSelector((state) => state.payout.payouts);

  const [editingTitle, setEditingTitle] = useState(null);
  const [newPayout, setNewPayout] = useState('');

  const handleEditClick = (title, currentAmount) => {
    setEditingTitle(title);
    setNewPayout(currentAmount || '');
  };

  const handleSaveClick = (title) => {
    dispatch(setPayout({ title, amount: newPayout }));
    const updatedPayouts = { ...payouts, [title]: newPayout };
    localStorage.setItem('payouts', JSON.stringify(updatedPayouts));
    setEditingTitle(null);
  };

  const handleCancelClick = () => {
    setEditingTitle(null);
    setNewPayout('');
  };

  return (
    <div className="p-4 md:p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">Payout Details</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-700 text-left">
              <th className="border p-2 md:p-3">Article Title</th>
              <th className="border p-2 md:p-3">Author</th>
              <th className="border p-2 md:p-3">Payout ($)</th>
              <th className="border p-2 md:p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.length > 0 ? (
              articles.map((article) => (
                <tr key={article.title} className="bg-gray-800 hover:bg-gray-700 transition-colors">
                  <td className="border p-2 md:p-3 text-sm md:text-base">
                    <div className="break-words">{article.title}</div>
                  </td>
                  <td className="border p-2 md:p-3 text-sm md:text-base">{article.author || 'Unknown'}</td>
                  <td className="border p-2 md:p-3">
                    {editingTitle === article.title ? (
                      <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-2">
                        <input
                          type="number"
                          value={newPayout}
                          onChange={(e) => setNewPayout(e.target.value)}
                          className="p-2 bg-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors w-full md:w-32"
                          placeholder="Enter payout"
                        />
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleSaveClick(article.title)}
                            className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition-colors text-sm"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancelClick}
                            className="bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-600 transition-colors text-sm"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <span
                        className="cursor-pointer text-blue-500 hover:underline text-sm md:text-base"
                        onClick={() => handleEditClick(article.title, payouts[article.title])}
                      >
                        {payouts[article.title] || 'Set payout'}
                      </span>
                    )}
                  </td>
                  <td className="border p-2 md:p-3">
                    <button
                      onClick={() => handleEditClick(article.title, payouts[article.title])}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition-colors text-sm"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="border p-3 text-center text-gray-400">
                  No articles available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}