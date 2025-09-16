import React, { useState, useEffect, useMemo, useRef } from "react";
import axios from "axios";
import NTPL_Logo from "./pictures/NTPL_LOGO.jpg";
import ISO_logo  from './pictures/ISO.jpg'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function Dashboard() {
  const [data, setData] = useState(null);
  const [trendData, setTrendData] = useState([]);
  const fetched = useRef(false);

  // Fetch real-time MW data every second
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://172.16.250.253:5005/api/mwgendata");
        const latest = res.data[0];
        setData(latest);
      } catch (err) {
        console.error("Error fetching MW data:", err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch trend data (Daily/Monthly Targets vs Actuals) → only once on mount
  useEffect(() => {
    if (fetched.current) return; // ✅ skip if already fetched
    fetched.current = true;
    const fetchTrendData = async () => {
      try {
        const res = await axios.get("http://172.16.251.202:5006/generation-history");
        setTrendData(res.data || []);
      } catch (err) {
        console.error("Error fetching trend data:", err);
      }
    };

    fetchTrendData();
  }, []);

  // === Generate all days of current month and merge with trendData ===
  const dailyCurrentMonth = useMemo(() => {
    const now = new Date();
    const m = now.getMonth();
    const y = now.getFullYear();

    const daysInMonth = new Date(y, m + 1, 0).getDate();
    const allDates = Array.from({ length: daysInMonth }, (_, i) => {
      const d = new Date(y, m, i + 1);
      return d.toISOString().split("T")[0];
    });

    const dataMap = {};
    (trendData || []).forEach((row) => {
      const d = new Date(row.EntryDate);
      if (d.getMonth() === m && d.getFullYear() === y) {
        dataMap[d.toISOString().split("T")[0]] = row;
      }
    });

    return allDates.map((date) => {
      const row = dataMap[date];
      return {
        EntryDate: date,
        DayActualMU: row ? row.DayActualMU : null,
      };
    });
  }, [trendData]);

  // === Aggregate trendData into Monthly ===
  const monthlyAggregated = useMemo(() => {
    const grouped = {};

    trendData.forEach((row) => {
      const d = new Date(row.EntryDate);
      const key = `${d.getFullYear()}-${d.getMonth()}`; // group by year-month
      if (!grouped[key]) {
        grouped[key] = {
          month: d.toLocaleString("en-US", { month: "long" }),
          year: d.getFullYear(),
          MonthTargetMU: 0,
          MonthActualMU: 0,
          count: 0,
        };
      }
      grouped[key].MonthTargetMU += row.MonthTargetMU || 0;
      grouped[key].MonthActualMU += row.MonthActualMU || 0;
      grouped[key].count += 1;
    });

    return Object.values(grouped).map((g) => ({
      month: `${g.month} ${g.year}`,
      MonthTargetMU: g.MonthTargetMU / g.count, // average (or keep as total if needed)
      MonthActualMU: g.MonthActualMU / g.count,
    }));
  }, [trendData]);

  const axisTickStyle = { fontWeight: 600, fill: "#333" };
  const legendStyle = { fontWeight: "600", color: "#333" };

  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // 1 minute

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="container-fluid py-4 text-dark min-vh-100"
      style={{ backgroundColor: "#F0F4F8" }}
    >
      {/* Header */}
      <div className="d-flex align-items-center justify-content-center gap-4 mt-0 pt-0 ">
  {/* Left Logo */}
  <img
    src={NTPL_Logo}
    alt="NTPL Logo"
    className="img-fluid"
    style={{ maxWidth: "120px" }}
  />

  {/* Header Text */}
  <h1 className="fw-bold mb-0" style={{ color: "#333333" }}>
    NLC Tamilnadu Power Limited
  </h1>

  {/* Right Logo */}
  <img
    src={ISO_logo}
    alt="NTPL ISO Logo"
    className="img-fluid"
    style={{ maxWidth: "100px" }}
  />
</div>

<div
  className="w-100 text-center mb-2"
  style={{ backgroundColor: "#ffe5b4", padding: "10px" }}
>
  <h5 style={{ color: "#444", margin: 0 }}>
    Power Generation as on{" "}
    {currentTime.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })}{" "}
    {currentTime.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    })}
  </h5>
</div>

      {/* Real-time MW Data */}
{data ? (
  <>
    <div className="row g-4 mb-4">
      <div className="col-md-3 col-sm-6">
        <div className="card text-center shadow" style={{ backgroundColor: "#007B8C" }}>
          <div className="card-body d-flex flex-column justify-content-between">
            <p className="text-white fw-bold fs-5 mb-2">Declared Capacity (MW)</p>
            <h2 className="text-white fw-bold mb-0">{Number(data.DC).toFixed(2)}</h2>
          </div>
        </div>
      </div>

      <div className="col-md-3 col-sm-6">
        <div className="card text-center shadow" style={{ backgroundColor: "#007B8C" }}>
          <div className="card-body d-flex flex-column justify-content-between">
            <p className="text-white fw-bold fs-5 mb-2">Schedule (MW)</p>
            <h2 className="text-white fw-bold mb-0">{Number(data.SCH).toFixed(2)}</h2>
          </div>
        </div>
      </div>

      <div className="col-md-3 col-sm-6">
        <div className="card text-center shadow" style={{ backgroundColor: "#007B8C" }}>
          <div className="card-body d-flex flex-column justify-content-between">
            <p className="text-white fw-bold fs-5 mb-2">AGC (MW)</p>
            <h2 className="text-white fw-bold mb-0">{Number(data.TOTAL_AGC).toFixed(2)}</h2>
          </div>
        </div>
      </div>

      <div className="col-md-3 col-sm-6">
        <div className="card text-center shadow" style={{  backgroundColor: "#007B8C"  }}>
          <div className="card-body d-flex flex-column justify-content-between">
            <p className="text-white fw-bold fs-5 mb-2">Export (MW)</p>
            <h2 className="text-white fw-bold mb-0">{Number(data.EXPORT).toFixed(2)}</h2>
          </div>
        </div>
      </div>

      <div className="col-md-3 col-sm-6">
        <div className="card text-center shadow" style={{ backgroundColor: "#5CB85C" }}>
          <div className="card-body d-flex flex-column justify-content-between">
            <p className="text-white fw-bold fs-5 mb-2">Unit 1 Gen (MW)</p>
            <h2 className="text-white fw-bold mb-0">{Number(data.NTPL_Unit1).toFixed(2)}</h2>
          </div>
        </div>
      </div>

      <div className="col-md-3 col-sm-6">
        <div className="card text-center shadow" style={{ backgroundColor: "#5CB85C" }}>
          <div className="card-body d-flex flex-column justify-content-between">
            <p className="text-white fw-bold fs-5 mb-2">Unit 2 Gen (MW)</p>
            <h2 className="text-white fw-bold mb-0">{Number(data.NTPL_Unit2).toFixed(2)}</h2>
          </div>
        </div>
      </div>

      <div className="col-md-3 col-sm-6">
        <div className="card text-center shadow" style={{ backgroundColor: "#5CB85C" }}>
          <div className="card-body d-flex flex-column justify-content-between">
            <p className="text-white fw-bold fs-5 mb-2">Total Gen (MW)</p>
            <h2 className="text-white fw-bold mb-0">
              {(Number(data.NTPL_Unit1) + Number(data.NTPL_Unit2)).toFixed(2)}
            </h2>
          </div>
        </div>
      </div>

      <div className="col-md-3 col-sm-6">
        <div className="card text-center shadow" style={{ backgroundColor: "#5CB85C" }}>
          <div className="card-body d-flex flex-column justify-content-between">
            <p className="text-white fw-bold fs-5 mb-2">APC (MW)</p>
            <h2 className="text-white fw-bold mb-0">{Number(data.APC).toFixed(2)}</h2>
          </div>
        </div>
      </div>

      <div className="col-12">
        <div className="card text-center shadow" style={{ backgroundColor: "#00A3CC" }}>
          <div className="card-body d-flex flex-column justify-content-between">
            <p className="text-white fw-bold fs-5 mb-2">Frequency (Hz)</p>
            <h2 className="text-white fw-bold mb-0">{Number(data.FREQ).toFixed(2)}</h2>
          </div>
        </div>
      </div>
    </div>
  </>
) : (
  <p className="text-center" style={{ color: "#333333" }}>
    Loading...
  </p>
)}


      {/* Trend Charts → Side by Side */}
      <div className="row mt-4">
        {/* Daily: show only Actual */}
        <div className="col-md-6">
          <div className="card shadow p-3 mb-4" style={{ backgroundColor: "#FFFFFF" }}>
            <h5 className="text-center" style={{ color: "#333333" }}>
              Daily Generation Trend (Current Month)
            </h5>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={dailyCurrentMonth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="EntryDate"
                  tickFormatter={(date) => new Date(date).toLocaleDateString("en-GB")}
                  tick={axisTickStyle}
                />
                <YAxis tick={axisTickStyle} />
                <Tooltip
                  labelFormatter={(date) => new Date(date).toLocaleDateString("en-GB")}
                />
                <Legend wrapperStyle={legendStyle} />
                <Line
                  type="monotone"
                  dataKey="DayActualMU"
                  stroke="#2bb673"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                  name="Daily Actual"
                  connectNulls={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly: aggregated to 1 point per month */}
        <div className="col-md-6">
          <div className="card shadow p-3 mb-4" style={{ backgroundColor: "#FFFFFF" }}>
            <h5 className="text-center" style={{ color: "#333333" }}>
              Monthly Generation Trend
            </h5>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={monthlyAggregated}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" tick={axisTickStyle} />
                <YAxis tick={axisTickStyle} />
                <Tooltip />
                <Legend wrapperStyle={legendStyle} />
                <Line
                  type="monotone"
                  dataKey="MonthTargetMU"
                  stroke="#4c63d2"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                  activeDot={{ r: 7 }}
                  name="Monthly Target"
                />
                <Line
                  type="monotone"
                  dataKey="MonthActualMU"
                  stroke="#2bb673"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                  activeDot={{ r: 7 }}
                  name="Monthly Actual"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center mt-4">
        <p className="mb-0">
          <small className="text-muted fw-bold">
            Design By: NTPL Computer Division
          </small>
        </p>
      </footer>
    </div>
  );
}

export default Dashboard;
