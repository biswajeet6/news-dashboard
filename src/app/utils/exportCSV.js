
export const exportCSV = (data) => {
    const headers = Object.keys(data[0]);
    const rows = data.map((row) =>
      headers.map((header) => (row[header] ? row[header] : ''))
    );
    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.join(','))
    ].join('\n');
  
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'data.csv';
    link.click();
  };
  