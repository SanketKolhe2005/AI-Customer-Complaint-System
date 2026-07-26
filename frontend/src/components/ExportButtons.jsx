import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function ExportButtons({ complaints }) {

  const exportExcel = () => {

    const worksheet = XLSX.utils.json_to_sheet(
      complaints.map(c => ({
        Customer: c.customer_name,
        Product: c.product_name,
        Batch: c.batch_number,
        Risk: c.risk_level,
        Summary: c.summary,
      }))
    );

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Complaints");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const file = new Blob(
      [excelBuffer],
      {
        type: "application/octet-stream",
      }
    );

    saveAs(file, "Complaints.xlsx");
  };

  const exportPDF = () => {

    const doc = new jsPDF();

    doc.setFontSize(18);

    doc.text("Complaint Report", 14, 20);

    autoTable(doc, {

      startY: 30,

      head: [["Customer", "Product", "Batch", "Risk"]],

      body: complaints.map(c => [
        c.customer_name,
        c.product_name,
        c.batch_number,
        c.risk_level,
      ])

    });

    doc.save("Complaints.pdf");
  };

  return (

    <div className="flex gap-3 mb-4">

      <button
        onClick={exportExcel}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
      >
        Export Excel
      </button>

      <button
        onClick={exportPDF}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
      >
        Export PDF
      </button>

    </div>

  );

}