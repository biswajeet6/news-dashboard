
import { jsPDF } from 'jspdf';

export const exportPDF = (data) => {
  const doc = new jsPDF();
  
  doc.text('Exported Data', 14, 16);
  
  let rowIndex = 30; // starting row for data in the PDF
  data.forEach((item) => {
    let rowData = Object.values(item).join(' | ');
    doc.text(rowData, 14, rowIndex);
    rowIndex += 10;
  });

  doc.save('data.pdf');
};
