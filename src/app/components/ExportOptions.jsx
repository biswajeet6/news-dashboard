import { useSelector } from "react-redux";
import { jsPDF } from "jspdf";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function ExportOptions() {
  const payouts = useSelector((state) => state.payout.payouts);
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false); 
  const [error, setError] = useState(null); 

  const exportCSV = () => {
    const csvRows = [];
    const headers = ["Title", "Amount"];
    csvRows.push(headers.join(","));

    Object.keys(payouts).forEach((title) => {
      const row = [title, payouts[title]].join(",");
      csvRows.push(row);
    });

    const totalPayout = Object.values(payouts).reduce(
      (sum, value) => sum + (parseFloat(value) || 0),
      0
    );

    csvRows.push(["Total Payout", `$${totalPayout.toFixed(2)}`].join(","));

    const csvData = csvRows.join("\n");
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "payouts.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "normal");
    doc.text("Payout Report", 20, 20);

    let yPosition = 30;
    Object.keys(payouts).forEach((title) => {
      doc.text(`${title}: $${payouts[title]}`, 20, yPosition);
      yPosition += 10;
    });

    const totalPayout = Object.values(payouts).reduce(
      (sum, value) => sum + (parseFloat(value) || 0),
      0
    );
    doc.text(`Total Payout: $${totalPayout.toFixed(2)}`, 20, yPosition);

    doc.save("payouts.pdf");
  };

  const exportGoogleSheets = async () => {
    if (!session || !session.user.accessToken) {
      alert("You need to sign in with Google to export to Sheets.");
      return;
    }

    setIsLoading(true); 
    setError(null); 

    const accessToken = session.user.accessToken;
    const sheetData = [
      ["Title", "Amount"],
      ...Object.entries(payouts).map(([title, amount]) => [title, amount]),
    ];

    const totalPayout = Object.values(payouts).reduce(
      (sum, value) => sum + (parseFloat(value) || 0),
      0
    );
    sheetData.push(["Total Payout", `$${totalPayout.toFixed(2)}`]);

    try {
      const response = await fetch(
        "https://sheets.googleapis.com/v4/spreadsheets",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            properties: {
              title: "Payout Report",
            },
            sheets: [
              {
                properties: {
                  title: "Payouts",
                },
                data: [
                  {
                    rowData: sheetData.map((row) => ({
                      values: row.map((cell) => ({
                        userEnteredValue: { stringValue: cell.toString() },
                      })),
                    })),
                  },
                ],
              },
            ],
          }),
        }
      );

      const data = await response.json();

      if (data.spreadsheetId) {
        const sheetUrl = `https://docs.google.com/spreadsheets/d/${data.spreadsheetId}/edit`;
        window.open(sheetUrl, "_blank");
      }
    } catch (error) {
      console.error("Error exporting to Google Sheets:", error);
      setError("Failed to export to Google Sheets. Please try again.");
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 mt-6 p-4 sm:p-6 md:p-8 lg:p-10 w-full max-w-lg mx-auto">
      {error && (
        <div className="bg-red-600 text-white p-4 rounded-md w-full text-center">
          <strong>Error: </strong>
          {error}
        </div>
      )}

      <button
        onClick={exportCSV}
        className="w-full sm:w-64 md:w-72 lg:w-80 px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-all"
      >
        Export as CSV
      </button>

      <button
        onClick={exportPDF}
        className="w-full sm:w-64 md:w-72 lg:w-80 px-6 py-3 text-white bg-green-500 rounded-lg hover:bg-green-600 transition-all"
      >
        Export as PDF
      </button>

      <button
        onClick={exportGoogleSheets}
        disabled={isLoading}
        className={`w-full sm:w-64 md:w-72 lg:w-80 px-6 py-3 rounded-lg transition-all ${
          isLoading
            ? "bg-gray-400 cursor-not-allowed text-gray-700"
            : "bg-yellow-500 hover:bg-yellow-600 text-white"
        }`}
      >
        {isLoading ? "Exporting..." : "Export to Google Sheets"}
      </button>
    </div>
  );
}
