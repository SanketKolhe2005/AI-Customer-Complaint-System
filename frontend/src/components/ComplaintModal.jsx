export default function ComplaintModal({ complaint, onClose }) {
  if (!complaint) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white w-11/12 max-w-3xl rounded-xl shadow-xl p-6">

        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-bold">
            Complaint Details
          </h2>

          <button
            onClick={onClose}
            className="text-red-500 text-xl"
          >
            ✖
          </button>
        </div>

        <div className="space-y-3">

          <p><strong>Customer:</strong> {complaint.customer_name}</p>

          <p><strong>Product:</strong> {complaint.product_name}</p>

          <p><strong>Batch:</strong> {complaint.batch_number}</p>

          <p><strong>Risk:</strong> {complaint.risk_level}</p>

          <p><strong>Complaint:</strong></p>

          <div className="bg-gray-100 p-3 rounded">
            {complaint.complaint_text}
          </div>

          <p><strong>Summary:</strong></p>

          <div className="bg-blue-50 p-3 rounded">
            {complaint.summary}
          </div>

        </div>

      </div>

    </div>
  );
}