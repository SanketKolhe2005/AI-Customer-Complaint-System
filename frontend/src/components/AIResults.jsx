export default function AIResults({ result }) {

  if (!result) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-center">
        <p className="text-gray-500">
          Submit a complaint to see the AI analysis.
        </p>
      </div>
    );
  }

  if (result.duplicate) {
    return (
      <div className="bg-yellow-100 border border-yellow-300 rounded-xl p-6">
        <h2 className="text-xl font-bold text-yellow-700">
          Duplicate Complaint Detected
        </h2>

        <p className="mt-3">
          Existing Complaint ID: {result.existing_complaint_id}
        </p>

        <p>
          Similarity Score: {result.similarity_score}
        </p>
      </div>
    );
  }

  const ai = result.result;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">

      <h2 className="text-2xl font-bold mb-5">
        AI Analysis
      </h2>

      <div className="space-y-4">

        <div>
          <strong>Customer:</strong> {ai.extracted_data.customer_name}
        </div>

        <div>
          <strong>Product:</strong> {ai.extracted_data.product_name}
        </div>

        <div>
          <strong>Batch:</strong> {ai.extracted_data.batch_number}
        </div>

        <div>
          <strong>Summary:</strong>
          <p className="mt-2">{ai.summary}</p>
        </div>

        <div>
          <strong>Risk Level:</strong>

          <span
            className={`ml-3 px-3 py-1 rounded text-white ${
              ai.risk.risk_level === "High"
                ? "bg-red-500"
                : ai.risk.risk_level === "Moderate"
                ? "bg-yellow-500"
                : "bg-green-500"
            }`}
          >
            {ai.risk.risk_level}
          </span>
        </div>

        <div>
          <strong>Root Causes</strong>

          <ul className="list-disc ml-6 mt-2">
            {ai.root_cause.root_causes.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <strong>Corrective Actions</strong>

          <ul className="list-disc ml-6 mt-2">
            {ai.capa.corrective_actions.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <strong>Preventive Actions</strong>

          <ul className="list-disc ml-6 mt-2">
            {ai.capa.preventive_actions.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}