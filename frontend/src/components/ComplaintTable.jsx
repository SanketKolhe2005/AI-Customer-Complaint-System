import { useEffect, useState } from "react";
import api from "../services/api";
import SearchBar from "./SearchBar";
import ComplaintModal from "./ComplaintModal";
import ExportButtons from "./ExportButtons";

export default function ComplaintTable({
  refresh,
  onDataLoaded,
}) {
  const [complaints, setComplaints] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    loadComplaints();
  }, [refresh]);

  async function loadComplaints() {
    try {
      const res = await api.get("/dashboard/complaints");

      setComplaints(res.data);

      if (onDataLoaded) {
        onDataLoaded(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function updateStatus(id, status) {
    try {
      await api.put(`/status/${id}`, null, {
        params: {
          status,
        },
      });

      loadComplaints();
    } catch (err) {
      console.error(err);
    }
  }

  const filtered = complaints.filter((c) => {
    const text = search.toLowerCase();

    return (
      c.customer_name?.toLowerCase().includes(text) ||
      c.product_name?.toLowerCase().includes(text) ||
      c.batch_number?.toLowerCase().includes(text)
    );
  });

  const getRiskBadge = (risk) => {
    switch (risk) {
      case "High":
        return "bg-red-500 text-white";

      case "Moderate":
        return "bg-yellow-500 text-white";

      case "Low":
        return "bg-green-500 text-white";

      default:
        return "bg-gray-500 text-white";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Open":
        return "bg-red-500 text-white";

      case "Under Review":
        return "bg-yellow-500 text-black";

      case "CAPA Implemented":
        return "bg-blue-500 text-white";

      case "Closed":
        return "bg-green-500 text-white";

      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-8">

      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold">
          Complaint History
        </h2>
      </div>

      <ExportButtons complaints={filtered} />

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      <div className="overflow-x-auto mt-4">

        {filtered.length === 0 ? (

          <div className="py-16 text-center">

            <div className="text-6xl">
              📄
            </div>

            <h3 className="text-2xl font-semibold mt-3">
              No Complaints Found
            </h3>

            <p className="text-gray-500 mt-2">
              Try another search or submit a complaint.
            </p>

          </div>

        ) : (

          <table className="min-w-full border-collapse">

            <thead className="bg-gray-100">

              <tr>

                <th className="p-3 text-left">ID</th>

                <th className="p-3 text-left">Customer</th>

                <th className="p-3 text-left">Product</th>

                <th className="p-3 text-left">Batch</th>

                <th className="p-3 text-left">Risk</th>

                <th className="p-3 text-left">Status</th>

              </tr>

            </thead>

            <tbody>

              {filtered.map((c) => (

                <tr
                  key={c.id}
                  className="border-b hover:bg-blue-50 transition cursor-pointer"
                  onClick={() => setSelected(c)}
                >

                  <td className="p-3 font-semibold">
                    {c.id}
                  </td>

                  <td className="p-3">
                    {c.customer_name}
                  </td>

                  <td className="p-3">
                    {c.product_name}
                  </td>

                  <td className="p-3">
                    {c.batch_number}
                  </td>

                  <td className="p-3">

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${getRiskBadge(
                        c.risk_level
                      )}`}
                    >
                      {c.risk_level}
                    </span>

                  </td>

                  <td
                    className="p-3"
                    onClick={(e) => e.stopPropagation()}
                  >

                    <select
                      value={c.status}
                      onChange={(e) =>
                        updateStatus(
                          c.id,
                          e.target.value
                        )
                      }
                      className={`rounded-lg px-3 py-2 font-semibold border-0 ${getStatusColor(
                        c.status
                      )}`}
                    >
                      <option>Open</option>
                      <option>Under Review</option>
                      <option>CAPA Implemented</option>
                      <option>Closed</option>
                    </select>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        )}

      </div>

      <ComplaintModal
        complaint={selected}
        onClose={() => setSelected(null)}
      />

    </div>
  );
}