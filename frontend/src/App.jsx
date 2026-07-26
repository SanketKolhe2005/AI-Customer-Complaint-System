import { useState } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import StatsCards from "./components/StatsCards";
import ComplaintForm from "./components/ComplaintForm";
import AIResults from "./components/AIResults";
import ComplaintTable from "./components/ComplaintTable";
import RiskChart from "./components/RiskChart";
import TrendChart from "./components/TrendChart";

import { Toaster } from "react-hot-toast";

function App() {

  const [result, setResult] = useState(null);

  const [refresh, setRefresh] = useState(false);

  const [complaints, setComplaints] = useState([]);

  const handleResult = (data) => {

    setResult(data);

    setRefresh((prev) => !prev);

  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-blue-100">

      <Toaster position="top-right" />

      <Navbar />

      <div className="max-w-7xl mx-auto p-6">

        <StatsCards refresh={refresh} />

        <div className="grid lg:grid-cols-2 gap-6 mt-6">

          <ComplaintForm setResult={handleResult} />

          <AIResults result={result} />

        </div>

        <div className="grid lg:grid-cols-2 gap-6 mt-6">

          <RiskChart complaints={complaints} />

          <TrendChart complaints={complaints} />

        </div>

        <ComplaintTable
          refresh={refresh}
          onDataLoaded={setComplaints}
        />

      </div>

      <Footer />

    </div>

  );

}

export default App;