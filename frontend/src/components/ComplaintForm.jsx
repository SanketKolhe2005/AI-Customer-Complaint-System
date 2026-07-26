import { useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

export default function ComplaintForm({ setResult }) {
  const [complaint, setComplaint] = useState("");
  const [loading, setLoading] = useState(false);

  const sampleComplaint = `Customer ABC Pharma reported broken tablets in Batch B123.
Product: Paracetamol 500mg.
Several tablets were chipped and broken inside the blister pack.`;

  const handleSubmit = async () => {
    if (!complaint.trim()) {
  toast.error("Please enter a complaint.");
  return;
}
  toast.success("Complaint analysed successfully.");
    setLoading(true);

    try {
      const res = await api.post("/process", {
        complaint_text: complaint,
      });

      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to process complaint.");
    }
    toast.error("Failed to process complaint.");
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">

      <h2 className="text-2xl font-bold mb-4">
        Customer Complaint
      </h2>

      <textarea
        rows={10}
        className="w-full border rounded-lg p-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        placeholder="Paste customer complaint here..."
        value={complaint}
        onChange={(e) => setComplaint(e.target.value)}
      />

      <div className="flex gap-3 mt-5 flex-wrap">

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
        >
          {loading ? "Analyzing..." : "Analyze Complaint"}
        </button>

        <button
          onClick={() => setComplaint(sampleComplaint)}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
        >
          Load Sample
        </button>

        <button
          onClick={() => setComplaint("")}
          className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg"
        >
          Clear
        </button>

      </div>

      {loading && (
        <div className="mt-6 flex items-center gap-3">

          <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

          <span className="text-blue-600 font-semibold">
            AI is analysing the complaint...
          </span>

        </div>
      )}
    </div>
  );
}