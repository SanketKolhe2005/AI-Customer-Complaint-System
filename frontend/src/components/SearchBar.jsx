export default function SearchBar({ search, setSearch }) {
  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="🔍 Search by Customer, Product or Batch..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>
  );
}